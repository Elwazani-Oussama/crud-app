import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
}

export const sendResetPasswordEmail = async (email, resetToken) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset Password',
        text: `
        Hello,
        Click the link to reset your password: 
        <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Reset Password</a>
        ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
    }
    await transporter.sendMail(mailOptions);
}