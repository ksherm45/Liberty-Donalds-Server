const { Schema, model } = require("mongoose");

const postSchema = new Schema(
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

const PostModel = model("Post", postSchema);

module.exports = PostModel;