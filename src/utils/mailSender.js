import mailTransporter from './mailTransporter.js';

function sendEmail(to, subject, text) {
    const mailOptions = { from: process.env.MAIL_FROM_ADDRESS, to, subject, text };

    mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.error('Error:', error.message);
        console.log('Email sent:', info.response);
        return;
    });
}

export default sendEmail;
