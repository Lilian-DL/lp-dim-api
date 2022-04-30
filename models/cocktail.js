var mongoose = require("mongoose");

var cocktailSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  bar: { type: String, required: true, enum: ["Bar De Rochefort", "Bar De La Rochelle"] },
});

cocktailSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

cocktailSchema.virtual("id").get(function () {
  return this._id;
});

// Export model.
module.exports = mongoose.model("cocktails", cocktailSchema);
