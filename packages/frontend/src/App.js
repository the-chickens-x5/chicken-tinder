import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import WelcomePage from "./pages/WelcomePage";
import NameFormPage from "./pages/NameFormPage";
import GroupListPage from "./pages/GroupListPage";
import NominationPage from "./pages/NominationPage";
import VotingPage from "./pages/VotingPage";
import LoadingPage from "./pages/LoadingPage";
import WinnerPage from "./pages/WinnerPage";

function App() {
	const [chick, setChick] = useState(null);

	return (
		<div className="flex flex-col space-y-normal w-full items-center">
			<Header />
			<Routes>
				<Route exact path="/" element={<WelcomePage />} />
				<Route path="/about" element={<div>About</div>} />
				<Route path="/flock/:coop_name/lobby/" element={<GroupListPage chick={chick} />} />
				<Route
					path="/flock/:coop_name/nominations/"
					element={<NominationPage chick={chick} />}
				/>
				<Route path="/flock/:coop_name/voting/" element={<VotingPage chick={chick} />} />
				<Route path="/flock/:coop_name/loading/" element={<LoadingPage chick={chick} />} />
				<Route path="/flock/:coop_name/winner/" element={<WinnerPage chick={chick} />} />
				<Route
					path="/flock/:coop_name/join/"
					element={<NameFormPage chick={chick} setChick={setChick} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
