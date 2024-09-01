import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import Quill, { QuillOptions } from "quill";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";

import "quill/dist/quill.snow.css";
import { Button } from "./ui/button";
import { ImageIcon, Smile } from "lucide-react";
import { Hint } from "./hint";
import { Delta, Op } from "quill/core";

type EditorValue = {
  image: File | null;
  body: string;
};

interface EditorProps {
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  variant?: "create" | "update";
}

const Editor = ({
  onSubmit,
  onCancel,
  placeholder = "Write something...",
  defaultValue = [],
  disabled = false,
  innerRef,
  variant = "create",
}: EditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
    };

    new Quill(editorContainer, options);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label="Hide formatting" align="center">
            <Button
              disabled={false}
              size="sm"
              onClick={() => {}}
              variant={"ghost"}
            >
              <PiTextAa className="size-4 " />
            </Button>
          </Hint>

          <Hint label="Emoji" align="center">
            <Button
              disabled={false}
              size="sm"
              onClick={() => {}}
              variant={"ghost"}
            >
              <Smile className="size-4 " />
            </Button>
          </Hint>

          {variant === "create" && (
            <Hint align="center" label="Image">
              <Button
                disabled={false}
                size="sm"
                onClick={() => {}}
                variant={"ghost"}
              >
                <ImageIcon className="size-4 " />
              </Button>
            </Hint>
          )}

          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => {}}
                disabled={false}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {}}
                disabled={false}
                size={"sm"}
                className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/20 text-white"
              >
                Save
              </Button>
            </div>
          )}

          {variant === "create" && (
            <Button
              disabled={false}
              onClick={() => {}}
              size={"iconSm"}
              className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/20 text-white"
            >
              <MdSend className="size-4 " />
            </Button>
          )}
        </div>
      </div>
      <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <p>
          <strong>Shift + Return</strong> to add a new line
        </p>
      </div>
    </div>
  );
};

export default Editor;
