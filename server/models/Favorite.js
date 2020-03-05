import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Favorite = new Schema(
  {
    User: { type: ObjectId, required: true, ref: "Profile" },
    Recipe: { type: ObjectId, ref: "Recipe", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Favorite.index({ User: 1, Recipe: 1 }, { unique: true })

export default Favorite;