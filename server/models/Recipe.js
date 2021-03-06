import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
  email: { type: String, required: true },
  comment: { type: String, required: true }
});

const Recipe = new Schema(
  {
    Id: { type: ObjectId },
    name: { type: String, required: true },
    description: { type: String, required: true },
    deleted: { type: Boolean, default: false, select: false },
    createdBy: { type: ObjectId, required: true, ref: "Profile" },
    ingredients: { type: String },
    directions: { type: String },
    favorited: [{ type: String }],
    comments: [CommentSchema],
    imgUrl: { type: String },
    likes: [{ type: String }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Recipe;