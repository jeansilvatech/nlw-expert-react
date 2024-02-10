import logo from "./assets/nlw-expert.svg";
import { Form } from "./components/form";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="logo nlw expert" />
      <Form />
      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard />
        <NoteCard
          note={{
            date: new Date(),
            content: "Hello World",
          }}
        />
      </div>
    </div>
  );
}

export default App;
