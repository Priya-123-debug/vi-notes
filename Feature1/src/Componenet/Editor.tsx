import  { useEffect, useState } from "react";
import Navbar from "./Navbar";

type Note = {
  _id: string;
  title: string;
  content: string;
};

function Editor() {
  const [edit, setediting] = useState(false);
  const [data, setdata] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // FETCH NOTES
  const fetchNotes = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/fetch`);
    const result = await res.json();
    setNotes(result);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // SELECT NOTE
  const handleSelect = (note: {
    _id: string;
    title: string;
    content: string;
  }) => {
    setediting(true);
    setSelectedId(note._id);
    setTitle(note.title);
    setdata(note.content);
  };

  // SAVE
  const handleSave = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/notes/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title || "Untitled",
        content: data,
      }),
    });

    fetchNotes();
    setTitle("");
    setdata("");
  };

  // DELETE
  const deleteNote = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/notes/delete/${selectedId}`, {
      method: "DELETE",
    });

    fetchNotes();
    setediting(false);
    setSelectedId(null);
    setTitle("");
    setdata("");
  };

  // UPDATE
  const editNote = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/notes/update/${selectedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content: data,
      }),
    });

    fetchNotes();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {edit && (
        <div className="flex justify-end gap-3 p-3 bg-white shadow">
          <button
            onClick={handleSave}
            className="bg-green-600 px-3 py-1 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={editNote}
            className="bg-yellow-500 px-3 py-1 text-white rounded"
          >
            Update
          </button>
          <button
            onClick={deleteNote}
            className="bg-red-600 px-3 py-1 text-white rounded"
          >
            Delete
          </button>
        </div>
      )}

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <div className="w-1/4 bg-gray-900 text-white p-4">
          <button
            className="bg-blue-600 w-full py-2 rounded mb-4"
            onClick={() => {
              setediting(true);
              setTitle("");
              setdata("");
              setSelectedId(null);
            }}
          >
            + Add Note
          </button>

          {notes.map((note) => (
            <div
              key={note._id}
              onClick={() => handleSelect(note)}
              className={`p-2 rounded cursor-pointer ${
                selectedId === note._id
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {note.title}
            </div>
          ))}
        </div>

        {/* EDITOR */}
        <div className="flex-1 p-6">
          {!edit ? (
            <div className="text-center text-gray-500">
              <h2 className="text-xl">Welcome</h2>
              <p>Click Add Note</p>
            </div>
          ) : (
            <div className="bg-white h-full rounded shadow flex flex-col">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title..."
                className="p-4 text-xl border-b outline-none"
              />

              <textarea
                value={data}
                onChange={(e) => setdata(e.target.value)}
                className="flex-1 p-4 outline-none"
                placeholder="Start writing..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editor;
