import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useForm from "../useForm/useForm";

function Login(props) {

	const { values, handleChange, errors, isValid, resetForm } = useForm();

	function handleSubmit(e) {
		e.preventDefault();
		props.onSubmit(values , resetForm);
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
			isValid={isValid}
			errorMessage={props.errorMessage}
			>

			<h3	className="popup__input-subtitle">Email</h3>
			<input
				className="popup__input"
				type="email"
				name="email"
				value={values.email || ''}
				onChange={handleChange}
				placeholder="Enter email"
				required
			/>
			<span	className="popup__input-error-msg">{errors.email}</span>

			<h3 className="popup__input-subtitle">Password</h3>
			<input
				className="popup__input"
				type="password"
				name="password"
				value={values.password || ''}
				onChange={handleChange}
				placeholder="Enter password"
				minLength={3}
				required
			/>
			<span	className="popup__input-error-msg">{errors.password}</span>
		
		</PopupWithForm>
	);
}

export default Login;
