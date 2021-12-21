import Banner from './Banner'
import logo from '../assets/Logo-Groupomania'
import Footer from './Footer'
import '../styles/Layout.css'

function App() {
	return (
		<div>
			<Banner>
				<img src={logo} alt='logo-groupomania' className='logo' />
			</Banner>
			<Footer />
		</div>
	)
}

export default App
