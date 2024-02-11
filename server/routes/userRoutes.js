const express = require('express')
const router = express.Router()

const {
    getUser,
    updateUser,
    deleteUser,
    registerUser,
    loginUser,
    logoutUser,
    getLoggedIn
} = require('../controllers/authController')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/:id', getUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

router.post('/logout/:id', logoutUser)

router.get('/loggedin/:id', getLoggedIn)

module.exports = router;