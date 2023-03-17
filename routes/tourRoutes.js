const { query } = require('express');
const express = require('express');
const fs = require('fs');
const {
    getTours,
    createTour,
    getOneTour,
    updateTour,
    deleteTour,
} = require('../controllers/tourController');
const Tour = require('../models/tourModel');

const tourRouter = express.Router();

tourRouter.route('/top-5-cheap').get(async (req, res) => {
    try {
        const tours = await Tour.find()
        .sort('price')
        .limit(5)
        .select('name price');

        res.status(200).json({
            status: 'success',
            time: req.time,
            count: tours.length,
            data: {
                tours,
            },
        });
    } catch (error) {
        console.log(error);
    }
});

tourRouter
    .route('/')
    .get(async (req, res) => {
        console.log(req.query);
        try {
            //mongoose way
            //Tour.find().where("duration").equals(5).where("difficulty").equals("easy")

            //for filtering by query params
            //const tours = await Tour.find({...req.query});

            //advanced filtering gte, gt, lt, lte
            //const tours = await Tour.find({duration: {'$gte':5}});

            //sorting http://localhost:3000/api/v1/tours?sort=price
            /* if(req.query.sort){
                const query = await Tour.find({...req.query}).sort(req.query.sort);
                const tours = await query;
            }else{
                const tours = await Tour.find();
            } */

            //selecting certain fields to show in response
            /* let tours;
            if(req.query.fields){
                const fields = {...req.query}.fields.split(",").join(" ") 
                tours = await Tour.find().select(fields)
            }else{
                tours = await Tour.find().select('-__v')
            } */

            //Pagination
            /* const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1 || 100; 
            const skip = (page - 1) * limit;

            let tours;
            if(req.query.page){
                const numTours = await Tour.countDocuments();
                //throw error does not work properly somehow
                if(skip >= numTours) throw new Error ("Page does not exist")
                tours = await Tour.find().skip(skip).limit(limit)
            } */

            //const tours = await Tour.find();
            res.status(200).json({
                status: 'success',
                time: req.time,
                count: tours.length,
                data: {
                    tours,
                },
            });
        } catch (err) {
            console.log(err);
        }
    })
    .post(async (req, res) => {
        try {
            const newTour = await Tour.create(req.body);
            res.status(201).json({
                status: 'success',
                data: newTour,
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    });

tourRouter
    .route('/:id')
    .get(async (req, res) => {
        try {
            const tour = await Tour.findById(req.params.id);
            // Tour.findOne({_id: req.params.id});
            res.status(200).json({
                status: 'success',
                time: req.time,
                data: { tour },
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: 'Invalid ID',
            });
        }
    })
    .patch(async (req, res) => {
        try {
            const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });

            res.status(200).json({
                status: 'success',
                updatedData: tour,
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: 'Invalid ID',
            });
        }
    })
    .delete(async (req, res) => {
        try {
            await Tour.findByIdAndDelete(req.params.id);
            //Dont send anything back when you delete and send 204 as convention
            res.status(204).json({
                status: 'success - deleted',
                deletedData: null,
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: 'Invalid request',
            });
        }
    });

module.exports = tourRouter;
