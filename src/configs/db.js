const mongoose = require("mongoose");
const connect = () => {
  return mongoose.connect(
    "mongodb+srv://somikumari:9Yn2fsXLKlDFaRZ2@entities.3xxjp.mongodb.net/test?retryWrites=true&w=majority"
  );
};
module.exports = connect;
