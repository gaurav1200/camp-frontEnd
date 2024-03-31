const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});
ImageSchema.virtual("thunbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_300,h_200,c_scale");
});

// const opts = { toJSON: { virtual: true } };
const CampgroundSchema = new Schema({
  title: String,
  // images: [ImageSchema],
  location: String,
  city: String,
  state: String,
  country: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  price: Number,
  description: String,
  author: String,
  // author: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

// CampgroundSchema.virtual("properties.popUp").get(function () {
//   return `<a href="/campgrounds/${this._id}">${this.title}</a>`;
// });

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});
module.exports = mongoose.model("Campground", CampgroundSchema);
