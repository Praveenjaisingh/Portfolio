const repository = require('../repositories/protfolio.repository');
const mailService = require('../services/mail.service');
const { validateEmail } = require("../helpers/email-validator");

class PortfolioService {

    async sendEmail(payload) {
        const { email } = payload;
        const isValidEmail = await validateEmail(email);
        if (!isValidEmail) {
            throw new Error("Please enter a valid email address");
        }
        const data = await repository.sendEmail(payload);
        await mailService.sendContactMail(payload);
        await mailService.sendContactSuccessMail(payload);
        return data;
    }

}

module.exports = new PortfolioService();
