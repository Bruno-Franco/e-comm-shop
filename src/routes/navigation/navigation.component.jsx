import { Fragment, useContext } from 'react' // fragment permite criar um elemento nao renderizado na pagina
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import { Outlet, Link } from 'react-router'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import { ReactComponent as CrwLogo } from '../../assets/crown.svg' // importa um 'logo' como um componente diretamente
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import './navigation.styles.scss'

function Navigation() {
	const { currentUser } = useContext(UserContext)
	const { isOpen, setIsOpen } = useContext(CartContext)

	return (
		<Fragment>
			<div className='navigation'>
				<Link className='logo-container' to='/'>
					<CrwLogo className='logo' />
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='shop'>
						SHOP
					</Link>
					{currentUser ? (
						<span className='nav-link' onClick={signOutUser}>
							SIGN OUT
						</span>
					) : (
						<Link className='nav-link' to='auth'>
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>
				{isOpen ? <CartDropdown /> : null}
			</div>
			<Outlet />
		</Fragment>
	)
}

export default Navigation
