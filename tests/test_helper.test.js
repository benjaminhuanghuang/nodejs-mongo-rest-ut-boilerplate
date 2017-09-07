const { mongoose } = require("../db/mongoose");

before(done => {
  mongoose.connect("mongodb://localhost/test-temp", {
    useMongoClient: true
  });

  mongoose.connection.once("open", () => done()).on("error", err => {
    console.warn("Warning", error);
  });
});
