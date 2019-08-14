const mongoose = require("mongoose");
const credentials = require("./credentials");
// remote db connection settings. For security, connectionString should be in a separate file not committed to git
// const connectionString = "mongodb+srv://<dbuser>:<dbpassword>@<cluster>.mongodb.net/test?retryWrites=true";

// remote db settings
mongoose.connect(credentials.connectionString, { dbName: 'itcproject' , useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define Book model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 make: { type: String, required: true },
 color: String,
 model: String,
 year: Number,
}); 
module.exports = mongoose.model('car', mySchema);