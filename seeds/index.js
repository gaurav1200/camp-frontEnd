const mongoose = require("mongoose");
// const cities = require("./cities");
const cities = require("./cities1.json");
// const citi = require("./citi.js");
// const cities = citi.cities;
// var data = require("./cities1.json");
// var cities = data.filter((element) => {
//   return element.country_name == "India";
// });
const { places, descriptors } = require("./seedHelpers");
const Campground = require("./campground");
//

mongoose.connect(
  // "mongodb://localhost:27017/yelp-camp",
  "mongodb+srv://firstmachinemail:mh19aa1200@cluster0.fstujlj.mongodb.net/yelp-camp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const random4000 = Math.floor(Math.random() * 60000);

    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // author: "61c594e617413e43985d80de",

      author: "660106498065e367434c6720",
      location: `${cities[random4000].name}, ${cities[random4000].state_name}`,
      city: `${cities[random4000].name}`,
      state: `${cities[random4000].state_name}`,
      country: `${cities[random4000].country_name}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum cumque facere ipsum dolore! Reprehenderit cum quas architecto nisi, distinctio culpa totam vel, ducimus temporibus neque perspiciatis. Quis ducimus voluptatum id?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random4000].longitude,
          cities[random4000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
