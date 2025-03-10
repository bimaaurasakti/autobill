import * as React from "react";
import {
  Container,
  Heading,
  Text,
  Img,
  Hr,
  Row,
  Column,
  Link,
} from "@react-email/components";
import { BillEmailType } from "@/types/billEmailType";

export const BillEmailBody = ({ data } : { data: BillEmailType }) => {
    return (
        <Container
            style={{
                maxWidth: "500px",
                margin: "auto",
                backgroundColor: "#fff",
                padding: "32px 32px 16px 32px",
                borderRadius: "8px",
            }}
        >
            <Img
                alt="Notification"
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                height={100}
                src="https://arahmaay.sirv.com/Images/bell.gif"
            />
            <Heading
                style={{
                    textAlign: "center",
                    fontWeight: "normal",
                    marginBottom: "24px",
                }} 
            >
                Payment Required
            </Heading>
            <Text
                style={{
                    textAlign: "center",
                    marginBottom: "24px",
                    color: "#888"   
                }} 
            >
                Hello {data.name},
            </Text>
            <Text
                style={{
                    textAlign: "center",
                    marginBottom: "24px",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                    color: "#888"   
                }} 
            >
                This is a reminder that your payment is due. Please make the payment at your earliest convenience.
            </Text>
            <Text
                style={{
                    textAlign: "center",
                    marginBottom: "24px",
                    color: "#888"   
                }} 
            >
                Thank you for trusting our company.
            </Text>
            <Hr/>
            <Text
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: "24px",
                    marginBottom: "12px",
                }} 
            >
                PAYMENT DETAILS
            </Text>
            <Row
                style={{
                    marginBottom: "12px",
                }}
            >
                <Column>
                    <Text
                        style={{
                            textAlign: "left",
                            color: "#888",
                            margin: "0",
                        }} 
                    >
                        Payment amount
                    </Text>
                </Column>
                <Column>
                    <Text
                        style={{
                            textAlign: "right",
                            fontWeight: "bold",
                            margin: "0",
                        }} 
                    >
                        {data.amount}
                    </Text>
                </Column>
            </Row>
            <Row
                style={{
                    marginBottom: "24px",
                }}
            >
                <Column>
                    <Text
                        style={{
                            textAlign: "left",
                            color: "#888",
                            margin: "0",
                        }} 
                    >
                        Payment due
                    </Text>
                </Column>
                <Column>
                    <Text
                        style={{
                            textAlign: "right",
                            fontWeight: "bold",
                            margin: "0",
                        }} 
                    >
                        {data.due_date}
                    </Text>
                </Column>
            </Row>
            <Hr/>
            <Text
                style={{
                    textAlign: "center",
                    marginTop: "24px",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                    color: "#888"   
                }} 
            >
                Contact us for more information.
            </Text>
            <table
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <tr>
                    <td>
                        <Link href="https://mail.google.com/mail/u/0/?view=cm&tf=1&fs=1&to=emailanda@gmail.com">
                            <Img
                                alt="Notification"
                                style={{
                                    margin: "0 6px",
                                }}
                                height={20}
                                src="https://arahmaay.sirv.com/Images/gmail-logo.png"
                            />
                        </Link>
                    </td>
                    <td>
                        <Link href="https://wa.me/+6282336666824">
                            <Img
                                alt="Notification"
                                style={{
                                    margin: "0 6px",
                                }}
                                height={24}
                                src="https://arahmaay.sirv.com/Images/whatsapp-logo.png"
                            />
                        </Link>
                    </td>
                </tr>
            </table>
        </Container>
    );
};

export default BillEmailBody;
