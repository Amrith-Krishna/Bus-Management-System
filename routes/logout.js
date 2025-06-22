import logger from "../winston.js";
const handleLogout = async (req, res) => {
    logger.info(`${req?.body?.id} logging out`)
    req.session.destroy();
    res.status(200).json({success: true});
}

export default handleLogout;