/* eslint-disable import/no-unresolved */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Logger from './Logger';

const Utils = {

  getUserFromToken(request) {
    const token = request.body.token || request.query.token
    || request.headers['x-access-token']
    || request.headers.Authorization || request.headers.authorization;

    const authToken = jwt.verify(token, process.env.API_SECRET_KEY);
    return authToken;
  },

  hashpassword(pwd) {
    const salt = bcrypt.genSaltSync(15);
    const password = bcrypt.hashSync(pwd, salt);
    return password;
  },

  isvalidpassword(pwd, userpwd) {
    const isValid = bcrypt.compareSync(pwd, userpwd);
    return isValid;
  },

  generateAccessToken(data, key) {
    const payload = {
      username: data.username,
      githubUsername: data.githubUsername,
      email: data.email,
      id: data._id,
    };

    const authToken = jwt.sign(
      payload, key,
      { expiresIn: '24h' },
    );
    return authToken;
  },

  sendanswernotification(email, title, notification) {
    const auth = {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    };

    const mailOptions = {
      from: 'StackOverFlow Clone',
      to: email,
      subject: title,
      html: `Message from: <b>StackOverFlow Clone</b>
      <br></br>
      <br></br> Hi,  ${notification.question.user.username}
      <br></br>
      <br></br> Your Question with Title: ${notification.question.title}
      <br></br>
      <br></br> was answered by, ${notification.answer.username}
      <br></br>
      <br></br>
      <br></br> Answer: <b>${notification.answer.body}</b>
      <br></br>
      <br></br>
      Regards!`,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth,
    });

    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        Logger.log(err);
        return false;
      }
      return true;
    });
  },
};

export default Utils;
