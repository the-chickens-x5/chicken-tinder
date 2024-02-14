import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import NameFormPage from "./pages/NameFormPage";
import GroupListPage from "./pages/GroupListPage";
import NominationPage from "./pages/NominationPage";
import VotingPage from "./pages/VotingPage";
import LoadingPage from "./pages/LoadingPage";
import WinnerPage from "./pages/WinnerPage";

function App() {
	return (
		<div className="flex flex-col space-y-normal w-full items-center">
			<Header />
			<Routes>
				<Route exact path="/" element={<WelcomePage />} />
				<Route path="/about" element={<div>About</div>} />
				<Route path="/flock/:coop_name/lobby/" element={<GroupListPage />} />
				<Route path="/flock/:coop_name/nominations/" element={<NominationPage />} />
				<Route path="/flock/:coop_name/voting/" element={<VotingPage />} />
				<Route path="/flock/:coop_name/loading/" element={<LoadingPage />} />
				<Route path="/flock/:coop_name/winner/" element={<WinnerPage />} />
				<Route path="/flock/:coop_name/join/" element={<NameFormPage />} />
			</Routes>
		</div>
	);
}

export default App;
