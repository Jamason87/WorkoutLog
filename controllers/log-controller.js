const router = require('express').Router();

const validateSession = require('../middleware/validateSession');
const Log = require('../db').import('../models/log');

router.post('/', validateSession, (req, res) => {
    let { description, definition, results } = req.body;

    let owner_id = req.user.id;

    const logEntry = {
        description: description,
        definition: definition,
        results: results,
        owner_id: owner_id
    }

    Log.create(logEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }));
});

router.get('/', validateSession, (req, res) => {
    let owner_id = req.user.id;

    Log.findAll({
        where: {owner_id: owner_id}
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err}))
});

router.get('/:id', validateSession, (req, res) => {
    let id = req.params.id;
    let owner_id = req.user.id;

    Log.findAll({
        where: { id: id, owner_id: owner_id }
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/:id', validateSession, (req, res) => { //update
    let { description, definition, results } = req.body;
    let owner_id = req.user.id;

    const logUpdate = {
        description: description,
        definition: definition,
        results: results
    }

    const query = {
        where: {
            id: req.params.id,
            owner_id: owner_id
        }
    }

    Log.update(logUpdate, query)
        .then((log) => res.status(200).json(log))
        .catch((err) => res.status(500).json({ error: err }));
});

router.delete('/:id', validateSession, (req, res) => {
    let owner_id = req.user.id;

    let query = {
        where: {
            id: req.params.id,
            owner_id: owner_id,
        }
    }

    Log.destroy(query)
      .then(() => res.status(200).json({ message: "Journal Entry Removed" }))
      .catch((err) => res.status(500).json({ error:err }));
});

module.exports = router;