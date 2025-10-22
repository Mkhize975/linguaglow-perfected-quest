import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, FileSpreadsheet, Type } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ParaphraseTools = () => {
  const [inputText, setInputText] = useState("");
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [formulaRequest, setFormulaRequest] = useState("");
  const [generatedFormula, setGeneratedFormula] = useState("");
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [isGeneratingFormula, setIsGeneratingFormula] = useState(false);
  const { toast } = useToast();

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text to paraphrase",
        variant: "destructive",
      });
      return;
    }

    setIsParaphrasing(true);
    setParaphrasedText("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-tutor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `Paraphrase the following text professionally: ${inputText}`,
              },
            ],
          }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Failed to paraphrase");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;

        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              setParaphrasedText((prev) => prev + content);
            }
          } catch {
            continue;
          }
        }
      }
    } catch (error) {
      console.error("Paraphrase error:", error);
      toast({
        title: "Error",
        description: "Failed to paraphrase text",
        variant: "destructive",
      });
    } finally {
      setIsParaphrasing(false);
    }
  };

  const handleGenerateFormula = async () => {
    if (!formulaRequest.trim()) {
      toast({
        title: "Input required",
        description: "Please describe the formula you need",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingFormula(true);
    setGeneratedFormula("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-tutor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `Generate an Excel formula for: ${formulaRequest}. Provide the formula and a brief explanation.`,
              },
            ],
          }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Failed to generate formula");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;

        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              setGeneratedFormula((prev) => prev + content);
            }
          } catch {
            continue;
          }
        }
      }
    } catch (error) {
      console.error("Formula generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate formula",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingFormula(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Text Paraphrasing</h2>
        </div>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter text to paraphrase..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px]"
          />
          <Button
            onClick={handleParaphrase}
            disabled={isParaphrasing}
            className="w-full"
          >
            {isParaphrasing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Paraphrasing...
              </>
            ) : (
              "Paraphrase Text"
            )}
          </Button>
          {paraphrasedText && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Paraphrased Result:</h3>
              <p className="whitespace-pre-wrap">{paraphrasedText}</p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur">
        <div className="flex items-center gap-2 mb-4">
          <FileSpreadsheet className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Excel Formula Generator</h2>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Describe the formula you need (e.g., 'sum all values in column A')"
            value={formulaRequest}
            onChange={(e) => setFormulaRequest(e.target.value)}
          />
          <Button
            onClick={handleGenerateFormula}
            disabled={isGeneratingFormula}
            className="w-full"
          >
            {isGeneratingFormula ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Formula"
            )}
          </Button>
          {generatedFormula && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Generated Formula:</h3>
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {generatedFormula}
              </pre>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
