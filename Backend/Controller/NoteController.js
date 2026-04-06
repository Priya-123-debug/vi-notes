import Note from "../Model/data.js";
export const SaveNotes=async(req,res)=>{
	try{
		const {title,content,isPinned}=req.body;
		console.log(title,content);
		if (!title || !content) {
  return res.status(400).json({ message: "Title and content are required" });
}
		const note=await Note.create({
			title,
			content,
			isPinned:isPinned??false
		});
		res.status(201).json(note);



	}
	catch(err){
		res.status(500).json({message:err.message});
	}

}
export const DeleteNotes=async(req,res)=>{
	try{
		const {id}=req.params;
	const note=	await Note.findByIdAndDelete(id);


if (!note) {
  return res.status(404).json({ message: "Note not found" });
}
		res.status(200).json({message:"delete successfully"});

	}
	catch(err){
		res.status(500).json({message:err.message});
	}
}
export const FetchingNotes=async(req,res)=>{
	try{
     const notes=  await Note.find().sort({isPinned:-1,createdAt:-1});
		 res.json(notes);
	}
	catch(err){
		res.status(500).json({message:"unable to fetch the data"});
	}
}
export const Updatenote=async(req,res)=>{
	try{
		const {id}=req.params;
		const updatenote=await Note.findByIdAndUpdate(id,

			req.body,
			{new:true}

		);
		res.json(updatenote);

	}
	catch(err){
		res.status(500).json({message:"unable to update the data"});
	}
}