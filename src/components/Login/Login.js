import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Login(props) {

	function handleSubmit(e) {
		e.preventDefault();
	}

	return (

		<PopupWithForm
			isOpen={props.isOpen}
			onClose={props.onClose}
			title="Sign in"
			name="login"
			submitText="Sign in"
			onSubmit={handleSubmit}
			onLogChange={props.onSignup}
			logText="Sign up"
			>

			<h3	className="popup__input_subtitle">Email</h3>
			<input
				className="popup__input"
				type="email"
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
		
		</PopupWithForm>
	);
}

export default Login;
