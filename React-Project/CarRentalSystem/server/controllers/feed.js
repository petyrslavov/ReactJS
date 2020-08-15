const Car = require('../models/Car');
const Rent = require('../models/Rent');

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
  createRent: (req, res) => {
    const car = req.params.id;
    const user = req.user._id;
    const days = Number(req.body.days);

    Rent.create({ days, user, car })
      .then(() => {
        Car.findById(car)
          .then((c) => {
            c.isRented = true;

            return c.save();
          })
          .then((createdRent) => {
            res.status(200).json({
              message: 'Rent created successfully.',
              data: createdRent
            })
          })
      })
      .catch(console.error);
  },
  editPost: (req, res) => {
    if (req.user.roles.indexOf('Admin') > -1) {
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
    } else {
      return res.status(200).json({
        success: false,
        message: 'Invalid credentials!'
      })
    }
  }, 
  deletePost: (req, res) => {
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
