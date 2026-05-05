const service = require('../services/portfolio.service');

exports.sendEmail = async (req, res, next) => {
    try {
        await service.sendEmail(req.body);

        return res.status(200).json({
            status: true,
            message: "Mail sent successfully"
        });
    } catch (error) {
        next(error);
    }
};
