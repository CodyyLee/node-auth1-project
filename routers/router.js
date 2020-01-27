const router = require('express').Router();
const bc = require('bcryptjs');

const Users = require('../users/users-model.js');

//login
router.post('/login', (req, res) => {
    const user = req.body;

    Users.getUser(user.username)
        .first()
        .then(user => {
            if(user && bc.compareSync(req.body.password, user.password)) {
                res.status(200).json(`Welcome, ${user.username}!`);
            }
            else {
                res.status(400).json({
                errorMessage: "Failed to log into account. Invalid username or password."
            })
            }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "An error occured trying to log into this account."
            })
        })
})

//register
router.post('/register', (req, res) => {
    const body = req.body;

    const hash = bc.hashSync(body.password, 10);

    body.password = hash;

    Users.add(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: "There was an error creating this user. Please try again."
            })
        })
})

module.exports = router;