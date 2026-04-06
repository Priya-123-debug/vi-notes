import mongoose from "mongoose";
const Noteschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {          // ✅ FIXED
      type: String,
      required: true,
    },
    isPinned: {         // ✅ FIXED
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Note= mongoose.model("Note", Noteschema);
export default Note;
