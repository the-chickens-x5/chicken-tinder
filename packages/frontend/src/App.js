import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import TutorialPage from "./pages/TutorialPage";
import WelcomePage from "./pages/WelcomePage";
import NameFormPage from "./pages/NameFormPage";
import MainFlockPage from "./pages/MainFlockPage";
import LoadingPage from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import { CoopProvider } from "./context/coop-context";
import { AuthProvider } from "./context/auth-context";

function App() {
	return (
		<AuthProvider>
			<CoopProvider>
				<div className="flex flex-col space-y-normal w-full items-center">
					<Header />
					<Routes>
						<Route exact path="/" element={<TutorialPage />} />
						<Route exact path="/welcome" element={<WelcomePage />} />
						<Route exact path="/login" element={<LoginPage />} />
						<Route exact path="/register" element={<RegisterPage />} />
						<Route exact path="/flock/:coopName" element={<MainFlockPage />} />
						<Route path="/flock/:coopName/loading/" element={<LoadingPage />} />
						<Route path="/flock/:coopName/join/" element={<NameFormPage />} />
					</Routes>
					<Toaster />
				</div>
			</CoopProvider>
		</AuthProvider>
	);
}

export default App;
