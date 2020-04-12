const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");

const connectionString = 'mongodb+srv://ckreeftmeijer:Chr1$tiaan@cluster0-cocre.azure.mongodb.net/test?retryWrites=true&w=majority'
const  connect  =  mongoose.connect(connectionString, { useNewUrlParser: true })
module.exports  =  connect;
