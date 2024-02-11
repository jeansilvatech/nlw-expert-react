import * as Dialog from "@radix-ui/react-dialog";
import { X, CircleFadingPlus } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from "react";
import {toast} from 'sonner';
interface NewNoteCardProps{
  onNoteCreated:(content:string)=>void
}
let speechRecognition:SpeechRecognition| null = null

export function NewNoteCard({onNoteCreated}:NewNoteCardProps){
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
    const [isRecording, setIsRecording] =useState(false)
    const [content, setContent] = useState('')
    function handleStartEditor(){
        setShouldShowOnboarding(false)
    }
    function handleContentChanged(event:ChangeEvent<HTMLTextAreaElement>){
        setContent(event.target.value)
        if(event.target.value===''){
            setShouldShowOnboarding(true)
        }

    }
    function handleSaveNote(event:FormEvent){
        event.preventDefault()
        if(content===''){
          return
        }
        onNoteCreated(content)
        setContent('')
        setShouldShowOnboarding(true)
        toast.success("Nota criada com sucesso!")
    }
    function handleStartRecording(){
      
      const isSpeechRecognitionAPIAvailable ='SpeechRecognition' in window || 'webkitSpeechRecognition' in window
      if(!isSpeechRecognitionAPIAvailable){
        alert('Infelizmente seu navegador não suporta a API de gravação')
        return
      }
      setIsRecording(true)
      setShouldShowOnboarding(false)
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

      speechRecognition = new SpeechRecognitionAPI()
      speechRecognition.lang = 'pt-BR'
      speechRecognition.continuous = true
      speechRecognition.maxAlternatives = 1
      speechRecognition.interimResults = true

      speechRecognition.onresult = (event)=>{
          const transcription = Array.from(event.results).reduce((text, results)=>{
            return text.concat(results[0].transcript)
          }, '')
          setContent(transcription)
      }
      speechRecognition.onerror = ()=>{
        console.error(event)
      }
      speechRecognition.start()
    }
    function handleStopRecording(){
      setIsRecording(false)
      if(speechRecognition!== null){
        speechRecognition.stop()
      }
    }
    return(
        <Dialog.Root>
        <Dialog.Trigger className="flex flex-col text-left rounded-md bg-lime-900 p-5 gap-3 overflow-hidden hover:ring-2 hover:ring-lime-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400 group">
          <span className="text-md font-medium text-lime-400">
            Adicionar nota
          </span>
          <p className="text-sm leading-6 text-slate-200">
            Grave uma nota em áudio que será convertida para texto
            automaticamente.
          </p>
          <div className="w-full h-full flex justify-center items-end">
          <CircleFadingPlus className="text-lime-400 group-hover:scale-125 transition duration-300 ease-in-out" size={50} />
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50">
          <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                <X className="size-5" />
            </Dialog.Close>
            <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-md font-medium text-slate-300">
                Adicionar nota
              </span>
             {shouldShowOnboarding?(
                 <p className="text-sm leading-6 text-slate-400">
                 Comece <button type="button" onClick={handleStartRecording} className="font-medium text-lime-400 hover:underline">gravando uma nota </button> em áudio ou se preferir <button type="button" onClick={handleStartEditor} className="font-medium text-lime-400 hover:underline"> utilize apenas texto </button>.
                 </p>
             ):(
                <textarea autoFocus onChange={handleContentChanged} value={content} className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"></textarea>
             )}
            </div>
            {isRecording ? (
              <button
              onClick={handleStopRecording}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sn text-slate-300 outline-none font-medium hover:text-slate-100" 
              type="button"
              >
              <div className="size-3 rounded-full bg-red-500 animate-pulse"/>
              Gravando! (Clique p/ interromper)
              </button>
            ) : (
            <button
            onClick={handleSaveNote}
            className="w-full bg-lime-400 py-4 text-center text-sn text-lime-950 outline-none font-medium hover:bg-lime-500" 
            type="button"
            >
            Salvar nota
            </button>
            )}
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
        </Dialog.Root>
    )
}