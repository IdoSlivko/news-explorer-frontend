import './About.css'
import image from '../../images/avatar.png'

function About() {

	return (
		<div className="about">
			<div className="about__container">
				<img className="about__image" src={image} alt="author" />
				<div className="about__box">
					<h2 className="about__header">About the author</h2>
					<div className="about__intro-box">
						<p className="about__intro">
							This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.
						</p>
						<p className="about__intro">
							You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
