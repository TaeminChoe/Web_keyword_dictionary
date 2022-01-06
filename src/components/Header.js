import { Link } from "react-router-dom";
import headerStyles from "../css/Header.module.css";

export default function Header() {
	return (
		<div className={headerStyles.header}>
			<h1>
				<Link className={headerStyles.link} to="/">
					Web 용어 정리
				</Link>
			</h1>
		</div>
	);
}
