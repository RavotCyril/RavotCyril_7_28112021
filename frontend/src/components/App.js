import { useState, useEffect } from 'react'
import Banner from './Banner'
import logo from '../assets/Logo-Groupomania.png'
import Cart from './Cart'
import Footer from './Footer'
import '../styles/Layout.css'

function App() {
	const savedCart = localStorage.getItem('cart')
	const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : [])
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	return (
		<div>
			<Banner>
				<img src={logo} alt='logo-Groupomania' className='logo' />
				<h1 className='title'>La maison jungle</h1>
			</Banner>
			<div className='layout-inner'>
				<Cart cart={cart} updateCart={updateCart} />
			</div>
			<Footer />
		</div>
	)
}

export default App
