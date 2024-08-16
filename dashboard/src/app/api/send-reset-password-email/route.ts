// app/api/send-reset-password-email/route.ts

import { ResetPasswordTemplate } from "@/components/email/reset-email";
import { Resend } from "resend";
const resend = new Resend("re_gDNP8jpp_8RK3A6SsBSat6Yh71d287YLU");

export async function POST(request: Request) {
  const { firstName, email, resetUrl } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <support@resend.dev>",
      to: [email],
      subject: "Reset your password",
      react: ResetPasswordTemplate({ firstName, resetUrl }),
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
