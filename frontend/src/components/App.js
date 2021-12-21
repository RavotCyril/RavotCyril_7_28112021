import Banner from './Banner'
import logo from '../assets/Logo-Groupomania.png'
import '../styles/Layout.css'

function App() {

	return (
		<div>
			<Banner>
				<img class="navbar-brand" src={logo} alt='logo-Groupomania' className='logo' />
			</Banner>
		</div>
	)
}

export default App
