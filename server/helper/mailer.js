import nodemailer from 'nodemailer';

class Senditmailer {
  constructor() {
    this.sender = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'sendtheparcels@gmail.com',
        pass: 'Bridge2@rwanda'
      }
    });
  }

  sendMail(receiver, newLocation) {
    const mailOptions = {
      from: 'sendtheparcels@gmail.com',
      to: receiver,
      subject: 'Your parcel was moved',
      text: `Your parcel was moved to ${newLocation}`
    };
    this.sender.sendMail(mailOptions);
  }
}

export default new Senditmailer();
