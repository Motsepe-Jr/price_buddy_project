import nodemailer from 'nodemailer';

const sendEmail = async (options: { email: string; subject: string; message: string; }) => {

    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass:process.env.SMTP_PASSWORD
        }
      });

      const message = {
        from: `Price Comparison ${process.env.SMTP_FROM_EMAIL}`,
        to: options.email, 
        subject: options.subject,
        text: options.message
      }

      await transport.sendMail(message)

}

export default sendEmail