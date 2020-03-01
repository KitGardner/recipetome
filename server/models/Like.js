import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Like = new Schema(
  {
    User: { type: String, required: true },
    Recipe: { type: ObjectId, ref: "Recipe", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Like.index({ User: 1, Recipe: 1 }, { unique: true })

export default Like;