const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // TLS
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

// Verify SMTP once (safe for Vercel logs)
transporter.verify((error) => {
    if (error) {
        console.error("❌ SMTP ERROR:", error);
    } else {
        console.log("✅ SMTP READY");
    }
});

const sendMail = async ({ to, subject, html }) => {
    const recipient = to || process.env.ADMIN_EMAIL;

    if (!recipient) {
        throw new Error("ADMIN_EMAIL is not configured in environment");
    }

    await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
        to: recipient,
        subject,
        html,
    });
};

module.exports = { sendMail };
