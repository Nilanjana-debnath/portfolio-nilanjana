// "use server";

// import ContactFormEmail from "@/components/email/ContactFormEmail";
// import { Resend } from "resend";
// import { z } from "zod";
// import { ContactFormSchema } from "./schemas";

// const resend = new Resend(process.env.RESEND_API_KEY);

// type ContactFormInputs = z.infer<typeof ContactFormSchema>;

// export async function sendEmail(data: ContactFormInputs) {
//   const result = ContactFormSchema.safeParse(data);

//   if (result.error) {
//     return { error: result.error.format() };
//   }

//   try {
//     const { name, email, message } = result.data;
//     const { data, error } = await resend.emails.send({
//       from: `tedawf.com <contact@tedawf.com>`,
//       to: "hello@tedawf.com",
//       replyTo: [email],
//       cc: [email],
//       subject: `New message from ${name}!`,
//       text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
//       // react: ContactFormEmail({ name, email, message }),
//     });

//     if (!data || error) {
//       console.error(error?.message);
//       throw new Error("Failed to send email!");
//     }

//     return { success: true };
//   } catch (error) {
//     return { error };
//   }
// }


"use server";

import 'dotenv/config';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { ContactFormSchema } from './schemas';

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  try {

    const { name, email, message } = result.data;
<<<<<<< HEAD
    const mailOptions = {
      from: `Nilanjana Debnath <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
=======
    const { data, error } = await resend.emails.send({
      from: `tedwf.com`,
      to: "nilanjana.debnath24@gmail.com",
      replyTo: [email],
      cc: [email],
>>>>>>> 643a80256192e49da15c7bd8d236008488d14521
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
    };

    const info = await transporter.sendMail(mailOptions);

    return { success: true, info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { error };
  }
}
