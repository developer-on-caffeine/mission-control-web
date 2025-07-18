import '../App.css';
import Category from './Category.js';
import settingsPages from '../data/SettingsPages.js';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({categories, action}) => {
  const navigate = useNavigate()
  return (

    <div className="Dashboard">
      <div>
        <div className='catergories-container'>
            {Object.entries(categories).map(([key,value]) => (
              <Category key={key} categoryId={key} category={value} action={action}/>
            ))}
        </div>
        <Category categoryId={settingsPages.name} category={settingsPages} action={action}/>
      </div>
      {(action === 'deletecategory' || action === 'deletepage') && (
        <button onClick={() => navigate('/')}>Done</button>
      )}
    </div>
  );
}

export default Dashboard;
