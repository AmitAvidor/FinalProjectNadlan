const express = require("express");
const router = express.Router();

const mySqlContext = require("../db/mySqlContext");

router.post("/add", async (req, res) => {
    console.log(req.body)
    const { username, password, email, name, phone } = req.body
    if (!username || !password || !email || !name || !phone) {
        return res.status(400).json({
            message: 'missing required parameters',
            params: 'username, password, email, name, phone'
        })
    }

    var usernameExist = await mySqlContext.query(`SELECT * FROM final.users WHERE username='${username}'`);

    if (usernameExist.length != 0) {
        return res.status(400).json({
            message: 'username already exist',
            params: username
        })
    }

    var emailExist = await mySqlContext.query(`SELECT * FROM final.users WHERE email='${email}'`);

    if (emailExist.length != 0) {
        return res.status(400).json({
            message: 'email already exist',
            params: email
        })
    }

    await mySqlContext.query(`INSERT INTO final.users (name, email, password, phone, username) VALUES
                            ('${name}', '${email}', '${password}', '${phone}', '${username}')`);

    return res.status(201).json({
        message: 'User created',
        params: ''
    })
})

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({
                message: 'missing required parameters',
                params: 'username, password'
            })
        }

        var userRes = await mySqlContext.query(`SELECT * FROM final.users WHERE username='${username}' AND password='${password}'`);

        if (userRes.length == 0) {
            return res.status(401).json({
                message: 'user not found',
                params: ''
            })
        }
        else {
            return res.status(200).json(userRes[0].id);
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
});


module.exports = router