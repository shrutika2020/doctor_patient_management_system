const db = require("../models/index"); // models path depend on your structure
const Doctor = db.doctor;
const Patient = db.patient;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

module.exports = {
  doctor_signup: (req, res) => {
    // Validate request
    if (!req.body.email) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });

    }
    var salt = bcrypt.genSaltSync(10);
    var textpassword = bcrypt.hashSync(req.body.password, salt);
    // Create a Tutorial
    var doctor_data = {
      email: req.body.email,
      password: textpassword,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      dob: req.body.dob,
      // hospital: req.body.hospital,
    };
    // Save doctor_data in the database
    Doctor.create(doctor_data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Doctor."
      })
    })
  },
  doctor_login: async (req, res) => {
    const doctor = await Doctor.findOne({ where: { email: req.body.email } });
    console.log(doctor)
    if (doctor) {
      const password_valid = await bcrypt.compare(req.body.password, doctor.password);
      if (password_valid) {
        token = jwt.sign({ "id": doctor.id, "email": doctor.email, "first_name": doctor.first_name }, 'secrete_key');
        token = `Bearer ${token}`;
        res.status(200).json({ message: "user login successflly!!" ,token:token});
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }

    } else {
      res.status(404).json({ error: "User does not exist" });
    }
  },

  create_patient: (req, res) => {
    // Create a Patient
    const patient_data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      dob: req.body.dob,
      mobile: req.body.mobile,
      city: req.body.city,
      createdBy: req.body.doctorId
    };
    Patient.create(patient_data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Patient."
      })
    })
  },
  retrieve_patients: (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Patient.findAll({ })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  },
  update_patient: (req, res) => {
    const id = req.params.id;

    Patient.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Patient with id=" + id
        });
      });
  },
  delete_patient: (req, res) => {
    const id = req.params.id;

    Patient.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Patient was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Patient with id=" + id
        });
      });
  }
}
