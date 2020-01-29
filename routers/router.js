const router = require('express').Router();
const bc = require('bcryptjs');

const Users = require('../users/users-model.js');

//login
router.post('/login', (req, res) => {
    const user = req.body;

    req.session.name = 'MySession';
    res.send('sent');

    Users.getUser(user.username)
        .first()
        .then(user => {
            if(user && bc.compareSync(req.body.password, user.password)) {
                res.status(200).json(user);
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

router.get('/users', myFunc(), (req, res) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "There was an error getting users."
            })
        })
})

function myFunc() {
    return function (req, res, next) {
        Users.getUser(req.body.username)
            .first()
            .then(user => {
                if(req.session.cookie) {
                    next();
                }
                else {
                    res.status(400).json({
                        errorMessage: "Invalid credentials."
                    })
                }
            })
    }
}

module.exports = router;