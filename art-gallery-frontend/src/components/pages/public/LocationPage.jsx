import IconWithLabel from '@components/common/IconWithLabel.jsx';
import { Main } from '@components/layout/exports';

const LocationPage = () => {
	return (
		<Main>
			<h1>Location</h1>

			<h2>Gallery</h2>

			<IconWithLabel id='address' classes='fa-solid fa-location-dot'>
				<div>
					<div>3230 Washington Avenue</div>
					<div>Saint Louis, MO 63103</div>
				</div>
			</IconWithLabel>

			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3116.4868974267765!2d-90.22799731712087!3d38.63768348546273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8b4a73036068f%3A0x239134931737e684!2s3230%20Washington%20Ave%2C%20St.%20Louis%2C%20MO%2063103!5e0!3m2!1sen!2sus!4v1760081246872!5m2!1sen!2sus'
				loading='lazy'
				referrerPolicy='no-referrer-when-downgrade'></iframe>

			<h2>Contact</h2>

			<div id='contact-icons'>
				<IconWithLabel id='phone' classes='fa-solid fa-square-phone'>
					314-555-1234
				</IconWithLabel>
				<IconWithLabel id='email' classes='fa-solid fa-square-envelope'>
					info@magstl.com
				</IconWithLabel>
				<IconWithLabel
					id='facebook'
					classes='fa-brands fa-square-facebook'>
					midtownartgallery-stl
				</IconWithLabel>
				<IconWithLabel
					id='instagram'
					classes='fa-brands fa-square-instagram'>
					magstl
				</IconWithLabel>
				<IconWithLabel
					id='bluesky'
					classes='fa-brands fa-square-bluesky'>
					midtownartgallery
				</IconWithLabel>
				<IconWithLabel
					id='twitter-x'
					classes='fa-brands fa-square-x-twitter'>
					magstl
				</IconWithLabel>
			</div>
		</Main>
	);
};

export default LocationPage;
