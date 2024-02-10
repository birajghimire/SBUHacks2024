const express = require('express');
const router = express.Router();
const {getJournal, getSingleJournal, postJournal, postPageInJournal, updateJournal, updatePageInJournal, deleteJournal, deletePageInJournal} = require('../controllers/journalController')

//Get all the journals
router.get('/journal', getJournal);

//Get a specific journal
router.get('/journal/:journalId', getSingleJournal);

//Post the newly created journal to the db
router.post('/journal', postJournal);

//Post a new page for a specific journal
router.post('/journal/:journalId/pages', postPageInJournal)

//Update a specific Journal
router.put('/journal/:journalId', updateJournal);

//Update a specific page in a journal so when the user clicks like edit or something
router.put('/journal/:journalId/pages/:pageId', updatePageInJournal)

//Delete a specific journal
router.delete('/journal/:id', deleteJournal);

//Delete a specific page in a journal
router.delete('/journal/:journalId/pages/:pageId', deletePageInJournal) 

module.exports = router


