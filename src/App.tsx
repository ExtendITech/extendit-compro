import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import HomeBlue from "./pages/HomeBlue";
import HomeGreen from "./pages/HomeGreen";
import HomeGreenSoft from "./pages/HomeGreenSoft";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomeBlue />} />
					<Route path="/blue" element={<HomeBlue />} />
					<Route path="/green" element={<HomeGreen />} />
					<Route path="/green-soft" element={<HomeGreenSoft />} />
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
