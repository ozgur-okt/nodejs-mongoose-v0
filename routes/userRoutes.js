const express = require('express');
const {
  getUsers,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter
  .route('/')
  .get((req, res) => {
    res.status(500).json({
      status: 'server error',
      message: 'server unavailable',
    });
  })
  .post((req, res) => {
    res.status(500).json({
      status: 'server error',
      message: 'server unavailable',
    });
  });

userRouter
  .route('/:id')
  .get((req, res) => {
    res.status(500).json({
      status: 'server error',
      message: 'server unavailable',
    });
  })
  .patch((req, res) => {
    res.status(500).json({
      status: 'server error',
      message: 'server unavailable',
    });
  })
  .delete((req, res) => {
    res.status(500).json({
      status: 'server error',
      message: 'server unavailable',
    });
  });

module.exports = userRouter;
