const fs = require("fs");
const path = require("path");
const { sendMail } = require("../helpers/mailer");

class MailService {
    async sendContactMail(data) {
        const { name, email, message } = data;

        if (!name || !email || !message) {
            throw new Error("Invalid email payload");
        }

        let template = fs.readFileSync(
            path.join(__dirname, "../template/contact.html"),
            "utf8"
        );

        template = template
            .replace(/{{name}}/g, name)
            .replace(/{{email}}/g, email)
            .replace(/{{message}}/g, message);

        await sendMail({
            to: process.env.ADMIN_EMAIL, 
            subject: "New Portfolio Contact Message",
            html: template,
        });

        return true;
    }
}

module.exports = new MailService();
