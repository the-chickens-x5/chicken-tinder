import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
function App() {
	return (
		<div className="flex flex-col space-y-normal w-full items-center">
			<Header />
			<Routes>
				<Route exact path="/" element={<WelcomePage />} />
				<Route path="/about" element={<div>About</div>} />
			</Routes>
		</div>
	);
}

export default App;
