import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  
  onNoteCreated: (content: string) => void;
}

const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const speechRecognition = new SpeechRecognitionAPI();

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleStartEditor() {
    setShouldShowOnboarding(false);
    setDialogOpen(true);
  }

  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);

    if (e.target.value === "") {
      setShouldShowOnboarding(true);
    }
  }

  function handleSaveNote(e: FormEvent) {
    
    e.preventDefault();

    if (content === "") {
      return;
    }

    onNoteCreated(content);

    setContent("");
    setShouldShowOnboarding(true);
    setDialogOpen(false);

    toast.success("Note created successfully!");
  }

  function handleStartRecording() {
    
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert("Unfortunately your browser does not support the Recording API!");
      return;
    }

    setIsRecording(true);
    setShouldShowOnboarding(false);

    speechRecognition.lang = "en-US";

    
    speechRecognition.continuous = true;
    
    speechRecognition.maxAlternatives = 1;
    
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (e) => {
      
      const audioTranscription = Array.from(e.results).reduce(
        (text, result) => {
          return text.concat(result[0].transcript);
        },
        ""
      );

      setContent(audioTranscription);
    };

    speechRecognition.onerror = (e) => {
      console.log(e);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger className="rounded-md flex flex-col text-left bg-slate-700 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
        Add Note
        </span>

        <p className="text-sm leading-6 text-slate-400">
        Record an audio note that will be converted to text
        automatically.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60">
          <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
            <Dialog.Close className="absolute top-0 right-0 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>

            <form className="flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-300">
                  Add Note
                </span>

                {shouldShowOnboarding ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Start{" "}
                    <button
                      type="button"
                      className="text-md hover:underline text-lime-400"
                      onClick={() => handleStartRecording()}
                    >
                      Recording a Note
                    </button>{" "}
                    in audio or if you prefer{" "}
                    <button
                      type="button"
                      className="text-md hover:underline text-lime-400"
                      onClick={() => handleStartEditor()}
                    >
                     Use only text
                    </button>
                    .
                  </p>
                ) : (
                  <textarea
                    autoFocus
                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                    onChange={(e) => handleContentChange(e)}
                    value={content}
                  />
                )}
              </div>

              {isRecording ? (
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 font-medium hover:text-slate-100 "
                  onClick={() => handleStopRecording()}
                >
                  <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                  Recording! (click to stop)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-medium hover:bg-lime-500"
                >
                 Save Note
                </button>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
