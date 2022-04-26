const { Schema, model } = require("mongoose");


const postSchema = new Schema(
    {
        name: String,
        description: String,
        image: String,
        id: {
            type: Schema.Types.ObjectId,
        }

})

const PostModel = model("Post", postSchema);

module.exports = PostModel