const Car = require('../models/Car');

module.exports = {
  getCars: (req, res) => {
    Car.find( { isRented: false })
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
  }
}