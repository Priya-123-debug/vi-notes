import mongoose from "mongoose";
const Noteschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    ispinned: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Note= mongoose.model("Note", Noteschema);
export default Note;
