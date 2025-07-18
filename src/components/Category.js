import { useNavigate } from 'react-router-dom';
import './Category.css';
import Page from './Page.js'
import CategoryUtils from '../utils/CategoryUtils.js';
import { useState } from 'react';


const Category = ({categoryId, category, action}) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(null)

    const handleDelete = async () => {
        await CategoryUtils.deleteCategory(categoryId);
    }

    // const handleEdit = async () => {
    //     navigate('/editcategory', {state: {categoryId: categoryId, category: category}});
    // }

    return (
        <div className="main-category-container">
            {/* {Object.keys(category.pages).length > 0 ? */}
                <div className={`category-container category-container-${category.color}`}>
                    <div className={`category-title category-title-${category.color}`}>
                        <h2>{category.name} 
                            {/* {category.name !== "Settings" && (<button onClick={() => handleEdit()}>Edit</button>)} */}
                            </h2>
                        
                        {action === 'deletecategory' && category.name !== "Settings" && (
                        <button onClick={() => {
                            handleDelete(); 
                            navigate('/deletecategory', {state: {reload: true}});
                        }}>
                            Delete
                        </button>
                    )}
                    </div>
                    <div className='category-pages'>
                        <Page categoryId={categoryId} category={category} pages={category.pages} action={action}/>
                    </div>
                </div>
                {/* :
                null
            } */}
        </div>
    )
}

export default Category;