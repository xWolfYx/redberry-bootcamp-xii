import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Footer from "./components/layout/Footer.tsx";
import Navbar from "./components/UI/Navbar.tsx";
import Home from "./pages/HomePage.tsx";
import Sessions from "./pages/SessionsPage.tsx";

const root = document.getElementById("root");
if (!root) throw new Error("Root node doesn't exist");

createRoot(root).render(
	<StrictMode>
		<BrowserRouter>
			<header className="z-1 absolute w-full">
				<Navbar />
			</header>

			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sessions" element={<Sessions />} />
				</Routes>
			</main>

			<Footer />
		</BrowserRouter>
	</StrictMode>,
);
