var router = require("express").Router();
const doctorController = require('../controllers/doctor.controller');


router.post('/doctor_signup',doctorController.doctor_signup);
router.post('/doctor_login',doctorController.doctor_login);
router.post('/create_patient',doctorController.create_patient);
router.get('/retrieve_patients',doctorController.retrieve_patients);
router.put('/update_patient/:id',doctorController.update_patient);
router.delete('/delete_patient/:id',doctorController.delete_patient);



module.exports = router;