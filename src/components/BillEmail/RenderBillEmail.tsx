/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@react-email/render";
import BillEmail from "./Index";

export const renderBillEmail = async (data: any) => {
  return await render(<BillEmail data={data} />, { pretty: true });
};
