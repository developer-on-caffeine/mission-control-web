import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as EditLogo } from '../images/icons/pen-solid.svg';
import { ReactComponent as CheckLogo } from '../images/icons/check-solid.svg';

const Header = ({action}) => {
    const navigate = useNavigate();

    const handleToggle = () => {
        if(action === 'edit') {
            navigate('/', {state: {action: 'view', reload: true}})
        } else {
            navigate('/edit', {state: {action: 'edit'}})
        }
    }

    return (
        <div className='header-container'>
            <div className='header-left'>
                <h1><Link to="/">Mission Control</Link></h1>    
            </div>
            <div className='header-right'>
                {action === 'edit' ? (
                    <CheckLogo
                        onClick={handleToggle}
                        style={{
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            fill: 'white',
                        }}
                    />  
                ) : (
                    <EditLogo
                        onClick={handleToggle}
                        style={{
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            fill: 'white',
                        }}
                    />
                )}        
            </div>
        </div>

    )
}

export default Header;