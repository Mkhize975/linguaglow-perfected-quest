import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Square, Send, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const VoiceTutor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your English tutor. Press the microphone button to start speaking, or type your message below. How can I help you practice today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { isRecording, startRecording, stopRecording, getAudioBlob } = useVoiceRecorder();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speakText = (text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Wait for voices to load
    const voices = window.speechSynthesis.getVoices();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select an English voice if available
    const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';
    
    utterance.onstart = () => {
      console.log('Speech started');
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      console.log('Speech ended');
      setIsSpeaking(false);
    };
    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      setIsSpeaking(false);
      toast({
        title: "Speech Error",
        description: "Could not play audio. Please try again.",
        variant: "destructive",
      });
    };
    
    speechSynthRef.current = utterance;
    
    // Ensure voices are loaded before speaking
    if (voices.length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        window.speechSynthesis.speak(utterance);
      }, { once: true });
    } else {
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const streamChat = async (userMessages: Message[]) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-tutor`;
    
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok || !resp.body) {
      if (resp.status === 429) {
        toast({
          title: "Rate limit exceeded",
          description: "Please wait a moment before sending another message.",
          variant: "destructive",
        });
      } else if (resp.status === 402) {
        toast({
          title: "Payment required",
          description: "Please add funds to continue using the AI tutor.",
          variant: "destructive",
        });
      }
      throw new Error("Failed to start stream");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantSoFar = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantSoFar += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > 1) {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantSoFar }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
    
    // Speak the completed response
    if (assistantSoFar) {
      speakText(assistantSoFar);
    }
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat([...messages, userMsg]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceRecording = async () => {
    if (isRecording) {
      stopRecording();
      const audioBlob = getAudioBlob();
      if (audioBlob) {
        toast({
          title: "Voice recorded",
          description: "Processing your speech...",
        });
        // For now, we'll use text input. Voice-to-text can be added later
        handleSendMessage("I just spoke something (voice input placeholder)");
      }
    } else {
      startRecording();
      toast({
        title: "Recording started",
        description: "Speak now...",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-2 items-start ${
              message.role === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            <Card
              className={`${
                message.role === "assistant"
                  ? "bg-secondary/50"
                  : "bg-primary/10"
              } max-w-[80%]`}
            >
              <CardContent className="p-4">
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </CardContent>
            </Card>
            {message.role === "assistant" && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => speakText(message.content)}
                disabled={isSpeaking}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {isLoading && (
          <Card className="bg-secondary/50 ml-0 mr-auto max-w-[80%]">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
              </div>
            </CardContent>
          </Card>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4 bg-background">
        <div className="flex gap-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            onClick={handleVoiceRecording}
            disabled={isLoading}
            title={isRecording ? "Stop recording" : "Start recording"}
          >
            {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          {isSpeaking && (
            <Button
              variant="outline"
              size="icon"
              onClick={stopSpeaking}
              title="Stop speaking"
            >
              <Square className="h-4 w-4" />
            </Button>
          )}
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message or use voice..."
            className="flex-1 min-h-[60px] max-h-[120px]"
            disabled={isLoading}
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceTutor;
