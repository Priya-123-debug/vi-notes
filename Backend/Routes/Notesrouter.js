import { Router } from "express";
import { SaveNotes, DeleteNotes, FetchingNotes,Updatenote} from "../Controller/NoteController.js"

const router = Router();

// Create note
router.post("/save", SaveNotes);

// Delete note
router.delete("/delete/:id", DeleteNotes);

// Fetch notes
router.get("/fetch", FetchingNotes);
router.put("/update/:id",Updatenote);

export default router;