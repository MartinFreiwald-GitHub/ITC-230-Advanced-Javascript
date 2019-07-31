const expect = require("chai").expect;
const car = require("../data");


describe("Cars module", () => {
 it("returns requested make", () => {
   const result = car.get("BMW");
   expect(result).to.deep.equal({"make":"BMW", "color": "silver", "model":"sedan", "year_built":"2011"});
 });
 
 it("fails w/ invalid car", () => {
   const result = car.get("fake");
   expect(result).to.be.undefined;
 });
});