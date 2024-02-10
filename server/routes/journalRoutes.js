const express = require('express');
const router = express.Router();
const {getJournal, postJournal, updateJournal, deleteJournal} = require('../controllers/journalController')

router.get('/journal', getJournal);

router.post('/journal', postJournal);

router.put('/journal/:id', updateJournal);

router.delete('/journal/:id', deleteJournal);

module.exports = router


