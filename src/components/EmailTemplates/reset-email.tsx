import * as React from "react";

interface ResetPasswordTemplateProps {
  firstName: string;
  resetUrl: string;
}

export const ResetPasswordTemplate: React.FC<
  Readonly<ResetPasswordTemplateProps>
> = ({ firstName, resetUrl }) => (
  <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
    <h1>Hello, {firstName}!</h1>
    <p>
      It looks like you requested a password reset. Click the link below to
      reset your password:
    </p>
    <a href={resetUrl} style={{ color: "#007bff", textDecoration: "none" }}>
      Reset your password
    </a>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Thank you!</p>
  </div>
);
