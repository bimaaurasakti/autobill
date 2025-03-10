import * as React from "react";
import {
    Html,
    Body,
    Heading,
    Img,
} from "@react-email/components";
import BillEmailBody from "./Body";
import { BillEmailType } from "@/types/billEmailType";

export const BillEmail = ({ data } : { data: BillEmailType }) => {
    return (
        <Html lang="en" dir="ltr">
            <Heading 
                style={{
                    textAlign: "center",
                    marginBottom: "24px",
                }}
            >
                <Img
                    alt="Texio Logo"
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                    height={32}
                    src="https://arahmaay.sirv.com/Images/texio-logo.png"
                />
            </Heading>
            <Body
                style={{
                    fontFamily: "Arial, sans-serif",
                    padding: "20px",
                    backgroundColor: "#f4f4f4",
                }}
            >
                <BillEmailBody data={data} />
            </Body>
        </Html>
    );
};

export default BillEmail;
