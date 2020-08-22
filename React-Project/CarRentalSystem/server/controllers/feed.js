const Car = require('../models/Car');
const Rent = require('../models/Rent');
const User = require('../models/User');

module.exports = {
  getCars: (req, res) => {
    Car.find({ isRented: false })
      .then((cars) => {
        res
          .status(200)
          .json({ message: 'Fetched cars successfully.', cars });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createCar: (req, res) => {
    const carBody = req.body;
    carBody.pricePerDay = Number(carBody.pricePerDay)

    Car.create(carBody)
      .then((car) => {
        res.status(200)
          .json({
            message: 'Car created successfully!',
            car
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  getUserRents: (req, res) => {
    const userId = req.params.id;
    Rent.find({ user : userId}).populate('car')
      .then((rents) => {
        res
          .status(200)
          .json({ message: 'Fetched rents successfully.', rents });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  createRent: (req, res) => {
    let carId = req.body.car._id;
    let userId = req.body.userId;
    let RentedCarInfoObj = {}   

    Car.findById(carId).then(foundCar => {
        User.findById(userId).then(user => {
            user.rentedCars.push(foundCar._id)
            user.save().then(()=>{
                foundCar.isRented = true
                foundCar.save().then(()=>{
                    RentedCarInfoObj={
                        car: foundCar,
                        user: user,
                        days: +req.body.days
                    }

                    Rent.create(RentedCarInfoObj).then((createdRent) => {
                              res.status(200).json({
                                success: true,
                                message: 'Rent created successfully.',
                                data: createdRent
                              })
                              res.redirect('/')
                            })
                })
            })
        })
    })  
  },
  editCar: (req, res) => {
      const carId = req.params.id
      const carObj = req.body

      Car
        .findById(carId)
        .then(existingCar => {
          existingCar.model = carObj.model
          existingCar.image = carObj.image
          existingCar.pricePerDay = carObj.pricePerDay

          existingCar
            .save()
            .then(editedCar => {
              res.status(200).json({
                success: true,
                message: 'Car edited successfully.',
                data: editedCar
              })
            })
            .catch((err) => {
              console.log(err)
              let message = 'Something went wrong :( Check the form for errors.'
              if (err.code === 11000) {
                message = 'Car with the given model already exists.'
              }
              return res.status(200).json({
                success: false,
                message: message
              })
            })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :( Check the form for errors.'
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    
  }, 
  deleteCar: (req, res) => {
    const id = req.params.id
    if (req.user.roles.indexOf('Admin') > -1) {
      Car
        .findById(id)
        .then((car) => {
          car
            .remove()
            .then(() => {
              return res.status(200).json({
                success: true,
                message: 'Car deleted successfully!'
              })
            })
        })
        .catch(() => {
          return res.status(200).json({
            success: false,
            message: 'Entry does not exist!'
          })
        })
    } else {
      return res.status(200).json({
        success: false,
        message: 'Invalid credentials!'
      })
    }
  },
}
