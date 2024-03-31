// import express from 'express';
const router = require('express').Router();
// import the API routes
const userRoutes = require('./userRoutes.js');
const thoughtRoutes = require('./thoughtRoutes.js');

// add the API routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// export the router
module.exports = router;