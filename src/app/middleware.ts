import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/api/schedules",
};
