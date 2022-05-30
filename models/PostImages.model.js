const { Schema, model } = require("mongoose");

const postImagesSchema = new Schema(
  {
    name: String,
    description: String,
    image: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const PostModelImages = model("PostImages", postSchema);

module.exports = PostModelImages;