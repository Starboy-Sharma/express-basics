const express  = require('express');
const router   = express.Router();
const uuid     = require('uuid');
const members  = require('../../Members');

// Get Single Members
router.get('/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const user = members.find(member => {
        return member.id === id;
    });

    (user) ? res.send(user) : res.status(400).json({ message: "User not found" });
});


// Get all members
router.get('/', (req, res) => res.json(members));

router.post('/', (req, res) => {

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        login_status: 1
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: "User name or email can't be empty"});
    }

    // add new member
    members.push(newMember);

    res.json(members);
});

module.exports  = router;