import { Fragment } from 'react' // fragment permite criar um elemento nao renderizado na pagina
import { Outlet, Link } from 'react-router'
import { ReactComponent as CrwLogo } from '../../assets/crown.svg' // importa um 'logo' como um componente diretamente
import './navigation.styles.scss'

function Navigation() {
	return (
		<Fragment>
			<div className='navigation'>
				<Link className='logo-container' to='/'>
					<CrwLogo className='logo' />
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>
					<Link className='nav-link' to='sign-in'>
						SIGN IN
					</Link>
				</div>
			</div>
			<Outlet />
		</Fragment>
	)
}

export default Navigation
