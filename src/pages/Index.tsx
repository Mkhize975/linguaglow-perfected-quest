import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParaphraseTools } from "@/components/ParaphraseTools";
import VoiceTutor from "@/components/VoiceTutor";
import { FileText, Mic, Calculator } from "lucide-react";

const Index = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">LinguaGlow AI Assistant</h1>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Content Tools
              </TabsTrigger>
              <TabsTrigger value="tutor" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Voice Tutor
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tools">
              <ParaphraseTools />
            </TabsContent>
            
            <TabsContent value="tutor" className="h-[calc(100vh-12rem)]">
              <VoiceTutor />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
