import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import GroupCreation from "./pages/GroupCreation";
function App() {
  return (
    <div className="flex flex-col space-y-normal w-full items-center">
      <Header />
      <Routes>
        <Route exact path="/" element={<GroupCreation />} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </div>
  )
}

export default App;
