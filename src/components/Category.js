import { useNavigate } from 'react-router-dom';
import './Category.css';
import Page from './Page.js'
import CategoryUtils from '../utils/CategoryUtils.js';
import { useEffect, useState } from 'react';
import { ReactComponent as EditLogo } from '../images/icons/pen-solid.svg';
import { ReactComponent as CheckLogo } from '../images/icons/check-solid.svg';
import { ReactComponent as ColorOption } from '../images/icons/circle-solid.svg';



const Category = ({categoryId, category, action}) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(null)
    const [categoryData, setCategoryData] = useState({
        id: categoryId,
        name: category.name,
        color: category.color
    })
    const [activeColor, setActiveColor] = useState(categoryData.color);


    const [nameEdit, setNameEdit] = useState(false)

    const handleDelete = async () => {
        await CategoryUtils.deleteCategory(categoryId);
        navigate('/edit', {state: {reload: true}});
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prev => ({
            ...prev,
            [name]: value
        }));  
    }

    const handleNameToggle = async () => {
        if(nameEdit){
            const response = await CategoryUtils.handleEditCategorySubmit(categoryData);
        }
        setNameEdit(prev => !prev);    
        navigate('/edit', {state: {reload: true}});
    }

    const handleColorPick = async (pick) => {
        console.log(pick)
        const updatedCategory = {
            ...categoryData,
            color: pick,
        };

        setCategoryData(updatedCategory); 
        setActiveColor(updatedCategory.color);

        const response = await CategoryUtils.handleEditCategorySubmit(updatedCategory);
        
        navigate('/edit', {state: {reload: true}});

    }

    const handleAddPage = () => {
        navigate('/addpage', {state: {reload: true, categoryId: categoryId }});
    }

    return (
        <div className="main-category-container">
                <div className={`category-container category-container-${category.color}`}>
                    <div className={`category-title category-title-${category.color}`}>
                        {action === 'edit' ? (
                            <div>
                                {nameEdit ? (
                                    <div>
                                    <input 
                                        type="text"
                                        id="categoryName"
                                        name="name"
                                        value={categoryData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <CheckLogo
                                        onClick={handleNameToggle}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            cursor: 'pointer',
                                            fill: 'white',
                                        }}
                                    />  </div>
                                ) : (
                                    <div>
                                     <h2>{category.name}</h2>
                                    <EditLogo
                                        onClick={handleNameToggle}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            cursor: 'pointer',
                                            fill: 'white',
                                        }}
                                    /></div>
                                )}
                                <div>
                                    <ColorOption
                                        onClick={() => handleColorPick('blue')}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            cursor: 'pointer',
                                            fill: 'blue',
                                            border: activeColor === 'blue' ? '5px solid black' : '5px',
                                            borderRadius: '50%'
                                        }}
                                    />
                                    <ColorOption
                                        onClick={() => handleColorPick('red')}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            cursor: 'pointer',
                                            fill: 'red',
                                            border: activeColor === 'red' ? '5px solid black' : '5px',
                                            borderRadius: '50%'
                                         }}
                                    />
                                    <ColorOption
                                        onClick={() => handleColorPick('green')}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            cursor: 'pointer',
                                            fill: 'green',
                                            border: activeColor === 'green' ? '5px solid black' : '5px',
                                            borderRadius: '50%'
                                        }}
                                    />
                                </div>
                                <button onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>
                        ) : (
                        <h2>{category.name}</h2>
                    )}
                    </div>
                    <div className='category-pages'>
                        <Page categoryId={categoryId} category={category} pages={category.pages} action={action}/>
                        {action === 'edit' && (
                        <button onClick={handleAddPage}>Add page</button>
                        )}
                    </div>
                </div>
                {/* :
                null
            } */}
        </div>
    )
}

export default Category;