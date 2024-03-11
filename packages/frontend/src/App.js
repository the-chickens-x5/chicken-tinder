import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import TutorialPage from "./pages/TutorialPage";
import WelcomePage from "./pages/WelcomePage";
import NameFormPage from "./pages/NameFormPage";
import GroupListPage from "./pages/GroupListPage";
import NominationPage from "./pages/NominationPage";
import VotingPage from "./pages/VotingPage";
import LoadingPage from "./pages/LoadingPage";
import WinnerPage from "./pages/WinnerPage";
import LoginPage from "./pages/LoginPage";
import ProtectedPage from "./components/ProtectedPage";
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
						<Route exact path="/welcome" element={<ProtectedPage><WelcomePage /></ProtectedPage>} />
						<Route exact path="/login" element={<LoginPage />} />
						<Route path="/flock/:coopName/lobby/" element={<ProtectedPage><GroupListPage /></ProtectedPage>} />
						<Route path="/flock/:coopName/nominations/" element={<ProtectedPage><NominationPage /></ProtectedPage>} />
						<Route path="/flock/:coopName/voting/" element={<ProtectedPage><VotingPage /></ProtectedPage>} />
						<Route path="/flock/:coopName/loading/" element={<ProtectedPage><LoadingPage /></ProtectedPage>} />
						<Route path="/flock/:coopName/winner/" element={<ProtectedPage><WinnerPage /></ProtectedPage>} />
						<Route path="/flock/:coopName/join/" element={<ProtectedPage><NameFormPage /></ProtectedPage>} />
					</Routes>
					<Toaster />
				</div>
			</CoopProvider>
		</AuthProvider>
	);
}

export default App;
