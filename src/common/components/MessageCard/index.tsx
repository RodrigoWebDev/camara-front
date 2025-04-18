import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Paperclip, Send } from "lucide-react";

type MessageCardProps = {
  name: string;
  date: string;
  receivedMsg: string;
};

const MessageCard = ({ name, date, receivedMsg }: MessageCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Anexo Button
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const [text, setText] = useState(``);
  const [isTextEmpty, setIsTextEmpty] = useState(true);

  useEffect(() => {
    setIsTextEmpty(text.trim() === ``);
  }, [text]);

  // Submit
  const handleSubmit = () => {
    // console.log(text);
    // console.log(selectedFile?.name);
  };

  return (
    <Card className="flex flex-col items-start p-4 gap-4 self-stretch">
      <CardHeader className="flex items-center px-0 gap-0 self-stretch">
        <CardTitle className="text-lg font-semibold leading-7 font-sans">
          Mensagens
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-start min-h-[80px] px-3 py-2 gap-1 self-stretch rounded-md border bg-background">
        <div className="flex h-[30px] justify-between items-center self-stretch">
          <p className="text-sm font-medium leading-5 text-foreground font-sans truncate overflow-hidden">
            {name}
          </p>
          <p className="text-xs font-normal leading-4 text-foreground font-sans">
            {date}
          </p>
        </div>
        <div className="text-sm font-normal leading-5 text-muted-foreground font-sans">
          {receivedMsg}
        </div>
      </CardContent>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex flex-col h-[126px] items-start gap-2 self-stretch resize-none"
        placeholder="Digite sua Mensagem"
      ></Textarea>

      <CardFooter className="flex justify-between items-start self-stretch px-0">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button
          onClick={handleButtonClick}
          className="flex h-[40px] px-4 py-2 justify-center items-center gap-2"
          variant={"outline"}
        >
          <Paperclip className="w-4 h-4" />
          Anexar
        </Button>

        <Button
          onClick={handleSubmit}
          className={`flex h-[40px] px-4 py-2 justify-center items-center gap-2`}
          disabled={isTextEmpty}
        >
          <Send className="w-4 h-4" />
          Enviar
        </Button>
      </CardFooter>

      {selectedFile && <p>Arquivo selecionado: {selectedFile.name}</p>}

      <div></div>
    </Card>
  );
};

export default MessageCard;
