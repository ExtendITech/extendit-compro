import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import IndexClean from "./pages/IndexClean";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { ContactWizard } from "./components/ContactWizard";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/old-home" element={<IndexClean />} />
					<Route path="/faq" element={<FAQ />} />
					<Route path="/terms" element={<Terms />} />
					<Route path="/privacy" element={<Privacy />} />
					<Route path="/wizard" element={<ContactWizard />} />
					{/* Keep direct Index route for reference/testing */}
					<Route path="/__index" element={<Index />} />
					{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
