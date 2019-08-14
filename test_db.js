const Car = require("./models/cars");

console.log(Car)
Car.countDocuments((err, result) => {
    console.log(result);
});

Car.find({}, (err, result) => {

    if (err) {
        console.log(err);
    } else {

        console.log(result);
    }
});