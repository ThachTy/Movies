import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const { USER_EMAIL, PASS_EMAIL } = process.env;
@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: USER_EMAIL,
        pass: PASS_EMAIL,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: USER_EMAIL,
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
