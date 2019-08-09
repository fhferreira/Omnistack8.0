const Dev = require("../models/Dev");

module.exports = {
	async store(req, res) {
        //console.log(req.params.devId);
        //console.log(req.headers.user);
        const {devId} = req.params;
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!loggedDev) {
            return res.status(400).json({error: 'Logged user not exists.'});
        }

        if (!targetDev) {
            return res.status(400).json({error: 'Dev targeted not exists.'});
        }

        if (targetDev.dislikes.includes(loggedDev._id)) {
            console.log("Deu Match Negativo");
        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json({
            ok: true
        });
    }
}