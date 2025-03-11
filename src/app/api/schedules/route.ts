/* eslint-disable @typescript-eslint/no-explicit-any */
import { BillEmailType } from "@/types/billEmailType";
import { NextResponse } from "next/server";
import { createAdminClient } from "./server";
import nodemailer from 'nodemailer';
import rateLimit from "express-rate-limit";
import { renderBillEmail } from "@/components/BillEmail/RenderBillEmail";

// Inisialisasi rate limiter
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 menit
    max: 5, // Maksimal 5 request per menit
    message: { error: "Too many requests, please try again later." },
});

async function applyRateLimit(req: Request) {
    return new Promise<void>((resolve, reject) => {
        // Karena rateLimit dirancang untuk Express, kita membuat objek tiruan untuk response
        const fakeReq: any = req;
        const fakeRes: any = {
            status: (code: number) => ({
            json: () => {
                if (code === 429) {
                    reject(new Error("Too many requests"));
                } else {
                    resolve();
                }
            },
            }),
        };
        limiter(fakeReq, fakeRes, () => resolve());
    });
}

export async function POST(request: Request) {
    try {
        await applyRateLimit(request);

        const now = new Date().toISOString();
        const supabase = await createAdminClient();
    
        const { data: scheduled_messages, error } = await supabase
            .from('scheduled_messages')
            .select('*')
            .lte('scheduled_time', now)
            .eq('is_sent', false);

        if (error) throw error;                                                                                 

        await Promise.all(
            scheduled_messages.map(async (schedule) => {
                const formattedAmount = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(schedule.amount);
                const formattedDate = new Intl.DateTimeFormat("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }).format(new Date(schedule.scheduled_time));

                const data: BillEmailType = {
                    name: schedule.client_name,
                    amount: formattedAmount,
                    due_date: formattedDate
                }
                const html = await renderBillEmail(data);

                sendEmailMessage({
                    id: schedule.id,
                    // to: 'xaupecilemoi-1455@yopmail.com',
                    to: schedule.email,
                    subject: schedule.project + ' Project Bill',
                    html: html
                }) 
            })
        );
    
        return NextResponse.json({ 
            message: "Messages processed successfully" 
        });
    } catch (error) {
        console.error("Error processing messages:", error);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
    }
}

async function sendEmailMessage(message: any) {
    const { to, subject, html } = message;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL_USER,
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        },
    });

    const mailOptions = {
        from: `"Admin" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    };
    await transporter.sendMail(mailOptions);

    // Update sended message
    // const { error } = await supabase
    //     .from('scheduled_messages')
    //     .update({ is_sent: true })
    //     .eq('id', id);
    
    // if (error) throw error;  
}

// async function sendWhatsAppMessage(
//     recipient: string,
//     templateName: string
// ): Promise<any> {
//     try {
//         const response = await fetch(
//             `https://graph.facebook.com/v22.0/515203438346850/messages`,
//             {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${process.env.FB_ACCESS_TOKEN}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     messaging_product: "whatsapp",
//                     to: recipient,
//                     type: "template",
//                     template: {
//                     name: templateName,
//                         language: { code: "en_US" },
//                     },
//                 }),
//             }
//         );

//         return await response.json();
//     } catch (error) {
//         console.error("Error sending message:", error);
//         return { error };
//     }
// }