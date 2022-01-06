import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Keyword() {
	const { id } = useParams();
	const [keys, setKeys] = useState([]);
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);

	function getDataById() {
		axios
			.get(`http://localhost:3001/dictionary?id=${id}`)
			.then(res => res.data[0])
			.then(res => {
				setKeys(Object.keys(res));
				setData(Object.values(res));
			});
	}

	useEffect(() => {
		getDataById();
	}, []);

	useEffect(() => {
		if (data && keys) {
			setLoading(true);
		}
	}, [data, keys]);

	return loading ? (
		<div className="keyword">
			<ul>
				{keys.map((value, index) => {
					if (value !== "id") {
						return (
							<li key={index}>
								<h4>{value}</h4>
								{data[index]}
							</li>
						);
					}
				})}
			</ul>
		</div>
	) : (
		<h1>Loading...</h1>
	);
}
