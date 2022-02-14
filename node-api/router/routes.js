const express = require('express');

const router = express.Router();


const userRoute = require('.././controllers/user');
const keyRoute = require('.././controllers/keyController');
const keyRequestRoute = require('.././controllers/keyRequestController');
// const DDCCFFRoute = require('.././controllers/ddccffController');
const reqAuthRoute = require('.././controllers/reqAuthController');
const EmployeeRoute = require('.././controllers/employeeController');
const circuitRoute = require('.././controllers/circuitController');
const containerRoute = require('.././controllers/containerController');
const collectionRoute = require('.././controllers/collectionController');
const containerCollectionRoute = require('.././controllers/containerCollectionController');
const list_DCFRoute = require('.././controllers/list_DCFController')

router.use('/list_DCF', list_DCFRoute);
// router.use('/DDCCFF', DDCCFFRoute);
router.use('/user', userRoute);
router.use('/key', keyRoute);
router.use('/circuit', circuitRoute);
router.use('/keyRequest', keyRequestRoute);
router.use('/employee', EmployeeRoute);
router.use('/collection', collectionRoute);
router.use('/container', containerRoute);
router.use('/containerCollection', containerCollectionRoute);
router.use('/reqAuth', reqAuthRoute);

module.exports = router;