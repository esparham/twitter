const nodemailer = require('nodemailer');
const HttpError = require('../models/httpError');

const sendEmail = async ({ email, passwordResetToken }) => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <test@test.com>',
      to: email,
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: `<b>${passwordResetToken}</b>`,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (err) {
    throw new HttpError('Faild to send mail', 500);
  }
};

module.exports = sendEmail;
