// app/api/send-verification-email/route.ts

import { VerifyEmailTemplate } from "@/components/email/verify-email";
import { Resend } from "resend";
// import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";
const resend = new Resend("re_gDNP8jpp_8RK3A6SsBSat6Yh71d287YLU");

export async function POST(request: Request) {
  const { firstName, email, verificationUrl } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your email",
      react: VerifyEmailTemplate({ firstName, verificationUrl }),
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
