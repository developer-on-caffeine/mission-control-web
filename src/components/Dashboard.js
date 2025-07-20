import '../App.css';
import Category from './Category.js';
import settingsPages from '../data/SettingsPages.js';
import { useNavigate } from 'react-router-dom';
import CategoryUtils from "../utils/CategoryUtils";

const Dashboard = ({categories, action}) => {
  const navigate = useNavigate()

  const handleAddCategory = async () => {
    const formData = {
      categoryName: 'New Category',
      color: 'blue'
    }
    const response = await CategoryUtils.handleAddCategorySubmit(formData);
    navigate('/edit', {state: {reload: true}})
  }

  return (

    <div className="Dashboard">
      <div>
        <div className='catergories-container'>
            {Object.entries(categories).map(([key,value]) => (
              <Category key={key} categoryId={key} category={value} action={action}/>
            ))}
            {action === 'edit' && (<button onClick={handleAddCategory}>add category</button>)}
        </div>
        {/* <Category categoryId={settingsPages.name} category={settingsPages} action={action}/> */}
      </div>
      {/* {(action === 'deletecategory' || action === 'deletepage') && (
        <button onClick={() => navigate('/')}>Done</button>
      )} */}
    </div>
  );
}

export default Dashboard;
