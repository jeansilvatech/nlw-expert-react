import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from 'date-fns';
import {ptBR} from 'date-fns/locale';
import { X, Clock, Pin } from 'lucide-react'

interface NoteCardProps {
  note: {
    id: string
    date: Date
    content: string
  }
  onNoteDeleted:(id:string)=> void
}
export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-left rounded-md flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden outline-none relative hover:ring-2 hover:ring-slate-600 transition duration-300 hover:scale-95 focus-visible:ring-2 focus-visible:ring-lime-400">
      <Pin className="absolute right-0 top-0 rotate-45 text-lime-400" />
        <span className="text-md font-medium text-slate-300 flex flex-row justify-center items-center gap-2">
        {formatDistanceToNow(note.date, {locale:ptBR, addSuffix:true})}
        <Clock size={20} />
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50">
          <Dialog.Content className="fixed inset-0 md:inset-auto overflow-hidden md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                <X className="size-5" />
            </Dialog.Close>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-md font-medium text-lime-400 flex flex-row justify-left items-center gap-2">
                {formatDistanceToNow(note.date, {locale:ptBR, addSuffix:true})}
                <Clock size={20} />
              </span>
              <div className="h-px w-full bg-slate-400"/>
              <p className="text-sm leading-6 text-slate-400">{note.content}</p>
            </div>
            <button
            onClick={()=>onNoteDeleted(note.id)}
            className="w-full bg-slate-800 py-4 text-center text-sn text-slate-300 outline-none font-medium group" 
            type="button"
            >
                Deseja <span className="text-red-400 group-hover:underline"> apagar essa nota </span>?
            </button>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
