import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import NameForm from "./pages/NameForm";
import GroupList from "./pages/GroupList";
import Nominations from "./pages/Nominations";
import Voting from "./pages/Voting";
import Loading from "./pages/Loading";
import Winner from "./pages/Winner";

function App() {
	return (
		<div className="flex flex-col space-y-normal w-full items-center">
			<Header />
			<Routes>
				<Route exact path="/" element={<WelcomePage />} />
				<Route path="/about" element={<div>About</div>} />
				<Route path="/flock/:coop_name/lobby/" element={<GroupList />} />
				<Route path="/flock/:coop_name/nominations/" element={<Nominations />} />
				<Route path="/flock/:coop_name/voting/" element={<Voting />} />
				<Route path="/flock/:coop_name/loading/" element={<Loading />} />
				<Route path="/flock/:coop_name/winner/" element={<Winner />} />
				<Route path="/flock/:coop_name/join/" element={<NameForm />} />
			</Routes>
		</div>
	);
}

export default App;
