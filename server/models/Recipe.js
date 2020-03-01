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
    createdBy: { type: String, required: true },
    ingredients: [{ type: String }],
    directions: [{ type: String }],
    comments: [CommentSchema],
    likes: [{ type: ObjectId }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Recipe;