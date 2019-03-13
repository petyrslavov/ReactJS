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
  rentPost: (req, res) => {
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
}