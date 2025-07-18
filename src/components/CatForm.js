import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CategoryUtils from "../utils/CategoryUtils";
import { useLocation } from "react-router-dom";

const CatForm = ({ categories, action }) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(null); // for feedback
    const [formData, setFormData] = useState({
        category: '',
        categoryName: '',
        color: '',
        pages: {}
    });

    // const [categoryData, setCategoryData] = useState({
    //     categoryId: '',
    //     category: ''
    // })

    // const { state } = useLocation();

    const colors = ['Blue', 'Green', 'Red']

    // useEffect(() => {
    //     if (action === 'edit' && state) {
    //         const { categoryId, category } = state;

    //         setCategoryData({ categoryId, category });

    //         setFormData({
    //             categoryId,
    //             categoryName: category.name,
    //             color: category.color,
    //             pages: category.pages || {}
    //         });

    //         document.getElementById('categoryName').value = category.name
    //         document.getElementById('color').value = category.color
        
    //     }
    // }, [state, action]);

    const handleChange = e => {
        const {name, value} = e.target;

        if (name === 'category') {
            const category = Object.entries(categories).find(([key, val]) => val.name.toLowerCase() == value.toLowerCase())
            const categoryId = category[0]
            const categoryValue = category[1]
            setFormData((prev) => ({
                ...prev,
                category: categoryId,
                categoryName: categoryValue.name, // or any custom logic
                color: categoryValue.color,
                pages: categoryValue.pages
            }));
            document.getElementById('categoryName').value = categoryValue.name
            document.getElementById('color').value = categoryValue.color
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = null;

            if(action === 'add'){
                response = await CategoryUtils.handleAddCategorySubmit(formData);
            } else if(action === 'edit'){
                console.log(formData)
                response = await CategoryUtils.handleEditCategorySubmit(formData);
            }
            if(response.ok){
                    setStatus('Category added/edited successfully!');
                    setFormData({ categoryName: '', color: '', pages: {} }); 
                } else {
                    setStatus('Failed to add/edit category.');
                }
        } catch (error) {
            setStatus('Error: ' + error.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {action === 'edit' && (
                    <div>
                        <label htmlFor="category">Category:</label>
                        <select
                        id="category"
                        name="category"
                        onChange={handleChange}
                        required
                        >
                        <option value="">
                            -- Choose category --
                        </option>
                        {Object.entries(categories).map(([key, value]) => (
                            <option key={key} value={value.name.toLowerCase()}>
                            {value.name}
                            </option>
                        ))}
                        </select>
                    </div>
                )}
                <div>
                    <div>
                        <label htmlFor="categoryName">Name:</label>
                        <input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="color">Select color:</label>
                        <select
                            id="color"
                            name="color"
                            onChange={handleChange}
                            required
                        >   
                            <option value="">
                                -- Choose a color --
                            </option>
                                {colors.map(color => (
                                    <option key={color} value={color.toLowerCase()}>
                                        {color}
                                    </option>
                                ))}
                        </select>         
                    </div>
                </div>
                <div>
                    <button onClick={() => navigate('/', {state: {reload: true}})} type="submit">Save</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
        
    )
}

export default CatForm;