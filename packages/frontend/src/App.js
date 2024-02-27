import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import NameFormPage from "./pages/NameFormPage";
import GroupListPage from "./pages/GroupListPage";
import NominationPage from "./pages/NominationPage";
import VotingPage from "./pages/VotingPage";
import LoadingPage from "./pages/LoadingPage";
import WinnerPage from "./pages/WinnerPage";
import { Toaster } from "react-hot-toast";
import { CoopProvider } from "./context/coop-context";

function App() {
	return (
		<CoopProvider>
			<div className="flex flex-col space-y-normal w-full items-center">
				<Header />
				<Routes>
					<Route exact path="/" element={<WelcomePage />} />
					<Route path="/about" element={<div>About</div>} />
					<Route path="/flock/:coopName/lobby/" element={<GroupListPage />} />
					<Route path="/flock/:coopName/nominations/" element={<NominationPage />} />
					<Route path="/flock/:coopName/voting/" element={<VotingPage />} />
					<Route path="/flock/:coopName/loading/" element={<LoadingPage />} />
					<Route path="/flock/:coopName/winner/" element={<WinnerPage />} />
					<Route path="/flock/:coopName/join/" element={<NameFormPage />} />
				</Routes>
				<Toaster />
			</div>
		</CoopProvider>
	);
}

export default App;
