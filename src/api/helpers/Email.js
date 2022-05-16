const pug = require('pug');
const nodemailer = require('nodemailer');
const path = require('path');
const { google } = require('googleapis');

const MAIL = process.env.MAIL_SEND;
const CLIENT_ID = process.env.MAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.MAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.firstName = user.username.split(' ')[0];
    this.from = process.env.EMAIL_FROM;
  }

  async newTransport() {
    const accessToken = await oAuth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
  }

  async send(template, subject) {
    // render the template
    let reqPath = path.join(__dirname, '..');

    const html = pug.renderFile(`${reqPath}/views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
    };
    const transporter = await this.newTransport();
    await transporter.sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Thank you for signing up!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 15 minutes)'
    );
  }

  async sendVerifyEmail() {
    await this.send(
      'verifyEmail',
      'Link to verify your account(valid for only 15 minutes)'
    );
  }

  async sendRandom() {
    await this.send(
      'random',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
