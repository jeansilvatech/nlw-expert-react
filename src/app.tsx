import { ChangeEvent, useState } from "react";
import logo from "./assets/nlw-expert.svg";
import logoJS from './assets/logojs.svg'
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";
interface Note{
  id: string
  date: Date
  content: string
}
export function App() {

  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(()=>{
    const notesOnStorage = localStorage.getItem('notes')
    if(notesOnStorage){
      return JSON.parse(notesOnStorage)
    }
    return []
  })
  function onNoteCreated(content:string){
    const newNote={
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }
  function onNoteDeleted(id:string){
      const notesArray = notes.filter(note=>{
        return note.id !== id
      })
      setNotes(notesArray)
      localStorage.setItem('notes', JSON.stringify(notesArray))
  }
  function handleSearch(event:ChangeEvent<HTMLInputElement>){
      const query = event.target.value
      setSearch(query)
    }
    const filteredNotes = search !== ''?notes.filter(note=>note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())):notes
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <div className="flex flex-row items-center">
      <img src={logo} alt="logo nlw expert" />
      <span className="ml-2 text-slate-500 font-semibold">by</span>
      <a href="https://jeansilvatech.netlify.app" target="_blank">
        <img src={logoJS} width={40} alt="" />
      </a>
      </div>
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas.."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 text-lime-400 outline-none"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-lime-400" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />
         {filteredNotes.map(note=>{
          return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>
         })}
      </div>
    </div>
  );
}

export default App;
