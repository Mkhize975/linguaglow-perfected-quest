import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParaphraseTools } from "@/components/ParaphraseTools";
import { FileText } from "lucide-react";

const Index = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">AI Content Assistant</h1>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          <ParaphraseTools />
        </div>
      </main>
    </div>
  );
};

export default Index;
