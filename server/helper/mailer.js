import nodemailer from 'nodemailer';
import 'dotenv/config';

class Senditmailer {
  constructor() {
    this.sender = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.gmail,
        pass: process.env.gpassword
      }
    });
  }

  sendMail(receiver, newLocation, subject, message) {
    const mailOptions = {
      from: process.env.gmail,
      to: receiver,
      subject,
      text: `${message} ${newLocation}`
    };
    this.sender.sendMail(mailOptions);
  }
}

export default new Senditmailer();
