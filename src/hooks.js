import axios from "axios";

function getData(url) {
	const data = axios.get(url).then(res => res.data);
	return data;
}

function removeData(url, id) {
	axios.delete(`${url}/${id}`);
}

export { getData, removeData };
