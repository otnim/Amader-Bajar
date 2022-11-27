const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const _ = require('lodash'); //here _ underscore is the object we use it for convention
const { isValidObjectId } = require('mongoose');
// const bcrypt = require('bcrypt'); //hashing object https://www.npmjs.com/package/bcrypt

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    let pickedUsers = [];
    // const pickedUser = _.pick(users, ['_id', 'name', 'email', 'phone', 'userType']);
    for (let user of users) {
        user = _.pick(user, ['_id', 'name', 'email', 'phone', 'userType']);
        pickedUsers.push(user);
    }

    res.send(pickedUsers);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'phone']));

    await user.save();

    //for hashing add below 
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);

    //token generation for direct register to login
    const token = user.generateAuthToken(); //its needs the userSchema validation

    res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(_.pick(user, ['_id', 'name', 'email']));
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send('The customer with the given id was not found.');

    const customerInfo = _.pick(user, 'name', 'email', 'phone', '_id');
    console.log(customerInfo);
    res.send(customerInfo);
})

router.put('/:id', async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send("Object id is wrong");
    const user = await User.findByIdAndUpdate(req.params.id, { userType: req.body.userType }, {
        new: true
    })
    if (!user) return res.status(404).send('The order with the given ID was not found.');
    res.send(user);
});

module.exports = router;