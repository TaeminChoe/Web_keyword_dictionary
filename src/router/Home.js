import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import homeStyles from "../css/Home.module.css";
import { getData, removeData } from "../hooks";

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	function remove(event) {
		removeData("http://localhost:3001/dictionary", event.target.parentNode.id);
		update();
	}

	function update() {
		getData("http://localhost:3001/dictionary").then(setData);
	}

	useEffect(() => {
		update();
	}, []);

	useEffect(() => {
		if (data.length > 0) {
			setLoading(true);
		}
	}, [data]);

	return loading ? (
		<div className={homeStyles.home}>
			<button>
				<Link className={homeStyles.add} to="/addKeyword">
					용어 추가
				</Link>
			</button>
			<ul>
				{data.map(value => (
					<li id={value.id} key={value.id}>
						<Link className={homeStyles.keyword} to={`/keyword/${value.id}`}>
							{value.name}
						</Link>
						<button onClick={remove}>삭제</button>
					</li>
				))}
			</ul>
		</div>
	) : (
		<h1>Loading...</h1>
	);
}
