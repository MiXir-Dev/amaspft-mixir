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

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {isLoading ? (
          <LoadingScreen onComplete={handleLoadingComplete} />
        ) : (
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
