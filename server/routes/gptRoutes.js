const express = require('express');
const router = express.Router();
const {postGPT} = require('../controllers/gptController')

router.post('/chat', postGPT);

module.exports = router

