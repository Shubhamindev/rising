const mongoose = require("mongoose");
const MONGODB_URL =
  "mongodb+srv://aryanmahajan2004:2gxNmHUIcffpXwI1@cluster0.uitnv4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => {
      console.log("DB Connection Failed");
      console.error(error);
      process.exit(1);
    });
};

// , {
//     useNewUrlParser: true,
//     useUnifiedTopology:true,
//     ssl: false,
//     sslValidate: false,
// }
