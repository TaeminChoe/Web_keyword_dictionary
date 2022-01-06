import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AddKeyword from "./router/AddKeyword";
import Home from "./router/Home";
import Keyword from "./router/Keyword";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/keyword/:id" element={<Keyword />} />
					<Route path="/addKeyword" element={<AddKeyword />} />
					<Route path="*" element={<h1>페이지를 찾을 수 없습니다.</h1>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
