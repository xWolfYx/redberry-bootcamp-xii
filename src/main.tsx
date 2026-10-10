import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Footer from "./components/layout/Footer.tsx";
import Navbar from "./components/UI/Navbar.tsx";
import Home from "./pages/HomePage.tsx";
import MovieDetails from "./pages/MovieDetails.tsx";
import Sessions from "./pages/SessionsPage.tsx";
import ScrollTop from "./utils/scrollTop.ts";

const root = document.getElementById("root");
if (!root) throw new Error("Root node doesn't exist");

const queryClient = new QueryClient();

createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ScrollTop />

				<header className="z-1 absolute w-full">
					<Navbar />
				</header>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sessions" element={<Sessions />} />
					<Route path="/movies/:id" element={<MovieDetails />} />
				</Routes>

				<Footer />
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);
