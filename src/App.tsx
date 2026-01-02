import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BookCall from "./pages/BookCall";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import { useState } from "react";
import LoadingScreen  from "./components/LoadingScreen.tsx";
import IntroExperience from "@/components/intro/IntroExperience";
import { AppFlow } from "@/enums/app-flow.enum";

const queryClient = new QueryClient();

const App = () => {
  const [flow, setFlow] = useState<AppFlow>(AppFlow.Loading);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {flow === AppFlow.Loading && (
          <LoadingScreen onComplete={() => setFlow(AppFlow.Onboarding)} />
        )}

        {flow === AppFlow.Onboarding && (
          <IntroExperience onComplete={() => setFlow(AppFlow.Ready)} />
        )}

        {flow === AppFlow.Ready && (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/book" element={<BookCall />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Privacy />} /> {/* Temporary redirect to Privacy */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
