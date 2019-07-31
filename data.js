




let cars = [
  {"make":"Alfo Romao", "color": "red", "model": "convertable", "year_built":"2000"},
  {"make":"BMW", "color": "silver", "model":"sedan", "year_built":"2011"},
  {"make":"Mercedes", "color": "red", "model":"suv", "year_built":"2010"},
  {"make":"GMC", "color": "silver", "model":"Full-Size Truck", "year_built":"2016"},
  {"make":"Dodge,RAM", "color": "red", "model":"Full-Size Truck", "year_built":"2017"},
];

const getall = () =>{
    return cars;
}

const getitem = (make) => {
    return cars.find((car) => {
        return car.make.toLowerCase() == make.toLowerCase();
    });
}
 
const deleteitem = (make) =>{

    let index = cars.findIndex((car) => {
        return car.make.toLowerCase() == make.toLowerCase();
    });
    if (index == -1) {
        return {deleted:false}
    }
    cars.splice(index)
    return {deleted:true};
}

const addItem = (newCar) => {
    // check if newCar is already in data array
    let result = getitem(newCar.make)

    // if is, return an error
    if (result) {
        return false;
    }

    // if not, add newCar and return success
    cars.push(newCar) 
    return true; 
}

module.exports = { getall, getitem, deleteitem, addItem }
// newCar = {"make":"chevy", "color": "red", "model":"Full-Size Truck", "year_built":"2017"}
// let result = addItem(newCar)
// console.log(result)
// let result2 = addItem(newCar)
// console.log(result2)
// console.log(cars)