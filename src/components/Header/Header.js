import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation'

function Header(props) {

	const isMobile = props.isMobile;
	const location = useLocation();

	return (
		<header className="header">
			<div className="header__container">
				<Link
					className={
						location.pathname === "/saved-news"
							? "header__title header__title_theme_dark"
							: "header__title"
					}
					to="/"
				>
					NewsExplorer
				</Link>
				{ isMobile
					?	<button
							className={location.pathname === "/saved-news"
								? "header__mobile header__mobile_dark"
								: "header__mobile"
							}
							type="button"
							aria-label="open menu"
							onClick={props.onClick}
							>
						</button>
					: <Navigation
							onLogin={props.onLogin}
							onLogout={props.onLogout}
						/>
				}
			</div>
		</header>
	);
}

export default Header;
