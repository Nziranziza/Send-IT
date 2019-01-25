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

  sendMail(receiver, newLocation) {
    const mailOptions = {
      from: process.env.gmail,
      to: receiver,
      subject: 'Your parcel was moved',
      text: `Your parcel was moved to ${newLocation}`
    };
    this.sender.sendMail(mailOptions);
  }
}

export default new Senditmailer();
