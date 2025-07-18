import { Link } from 'react-router-dom';
import './Header.css';


const Header = () => {
    return (
        <div className='header-container'>
            <div className='header-title-background'>
                <h1><Link to="/">Mission Control</Link></h1>
            </div>
        </div>
    )
}

export default Header;