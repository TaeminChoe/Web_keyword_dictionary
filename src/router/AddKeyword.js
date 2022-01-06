import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AddKeyword() {
	const name = useRef();
	const eng = useRef();
	const kor = useRef();
	const nav = useNavigate();

	function createData() {
		const nameValue = name.current.value;
		const engValue = eng.current.value;
		const korvalue = kor.current.value;

		if (nameValue && engValue && korvalue) {
			axios
				.post("http://localhost:3001/dictionary", {
					name: nameValue,
					engName: engValue,
					korName: korvalue,
				})
				.then(() => {
					alert("저장 완료했습니다.");
					nav("/");
				})
				.catch(alert);
		} else {
			alert("항목을 모두 입력하세요.");
		}
	}

	return (
		<div>
			<div className="inputName">
				<label>Name: </label>
				<input type="text" placeholder="Ex) UI" ref={name} />
			</div>
			<div className="inputFullName">
				<label>Eng: </label>
				<input type="text" placeholder="EX) User Interface" ref={eng} />
			</div>
			<div className="inputKorName">
				<label>Kor: </label>
				<input type="text" placeholder="EX) 유저 인터페이스" ref={kor} />
			</div>
			<button onClick={createData}>용어 추가</button>
		</div>
	);
}
