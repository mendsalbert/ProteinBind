// import { EmailTemplate } from '../../../components/EmailTemplate';
import { EmailTemplate } from "@/components/email/email-template";
import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend("re_gDNP8jpp_8RK3A6SsBSat6Yh71d287YLU");

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["mendsalbert@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
