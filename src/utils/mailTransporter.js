import nodemailer from 'nodemailer';

const mailTransporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    requireTls: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

mailTransporter.verify((error, _success) => {
    if (error) return console.log('::mail server error ===> ' + error);
    return console.log('mail server is running');
});

export default mailTransporter;
