



import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Note {
  id: string;
  createdAt: Date;
  content: string;
}

interface User {
  id: string;
  email: string;
}

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      setUser({ id: decoded.id, email: decoded.email });
      loadNotes();
    }
  }, [token]);

  
  async function loadNotes() {
    if (!token) return;
    try {
      const response = await axios.get("https://note-taking-app-bq1e.onrender.com/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  }

  async function onNoteCreated(content: string) {
    if (!token) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/notes",
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotes([response.data, ...notes]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  async function onNoteDeleted(id: string) {
    if (!token) return;

    try {
      await axios.delete(`https://note-taking-app-bq1e.onrender.com/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const filteredNotes = search
    ? notes.filter((note) => note.content.toLowerCase().includes(search.toLowerCase()))
    : notes;

  async function handleSignup() {
    try {
      const response = await axios.post("https://note-taking-app-bq1e.onrender.com/signup", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      alert("Sign-up successful! Please log in.");
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  }

  async function handleLogin() {
    try {
      const response = await axios.post("https://note-taking-app-bq1e.onrender.com/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setNotes([]);
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      {!token ? (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold"> Log In</h2>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-100 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-100 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn bg-green-500 text-white p-2" onClick={handleLogin}>
            Log In
          </button>
          <button className="btn bg-blue-500 text-white p-2 w-100" onClick={handleSignup}>
            Not have account? Sign Up
          </button>
          
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Welcome, {user?.email}!</h2>
            <button className="btn bg-red-500 text-white p-2" onClick={handleLogout}>
              Log Out
            </button>
          </div>

          <form className="w-full">
            <input
              type="text"
              placeholder="Look in your notes..."
              className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
              onChange={handleSearch}
            />
          </form>

          <div className="h-px bg-slate-700" />

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
            <NewNoteCard onNoteCreated={onNoteCreated} />
            {filteredNotes.map((note) => (
              <NoteCard note={note} key={note.id} onNoteDeleted={onNoteDeleted} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
