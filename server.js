const app = require("./app");

if (process.env.NODE_ENV === "production") {

}

const PORT = process.env.PORT || 8010; // for prod deployment
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
