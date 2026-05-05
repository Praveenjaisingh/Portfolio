const repository = require('../repositories/protfolio.repository');
const mailService = require('../services/mail.service');

class PortfolioService {

    async sendEmail(payload) {
        const data = await repository.sendEmail(payload);

        await mailService.sendContactMail(payload);

        return data;
    }

}

module.exports = new PortfolioService();
