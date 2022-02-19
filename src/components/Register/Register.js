import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Register(props) {

	function handleSubmit(e) {
		e.preventDefault();
	}

	return (

		<PopupWithForm
			isOpen={props.isOpen}
			onClose={props.onClose}
			title="Sign up"
			name="register"
			submitText="Sign up"
			onSubmit={handleSubmit}
			onLogChange={props.onLogin}
			logText="Sign in"
			>

			<h3 className="popup__input_subtitle">Email</h3>
			<input
				className="popup__input"
				type="text"
				name="email"
				placeholder="Enter email"
				required
			/>
			<span	className="popup__input-error-msg" />

			<h3 className="popup__input_subtitle">Password</h3>
			<input
				className="popup__input"
				type="password"
				name="password"
				placeholder="Enter password"
				minLength={3}
				required
			/>
			<span	className="popup__input-error-msg" />

			<h3 className="popup__input_subtitle">Username</h3>
			<input
				className="popup__input"
				type="text"
				name="username"
				placeholder="Enter your username"
				minLength={2}
				maxLength={30}
				required
			/>
			<span	className="popup__input-error-msg" />
		
		</PopupWithForm>
	);
}

export default Register;
