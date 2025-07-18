import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PageUtils from "../utils/PageUtils";

const PageForm = ({categories, action}) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        page: '',
        pageName: '',
        category: '',
        url: '',
        target: ''
    });

    const targets = ['_self', '_blank']

    const handleChange = e => {
        const {name, value} = e.target;
        if(name === 'category'){
            const cat = Object.entries(categories).find(([key, val]) => val.name.toLowerCase() == value.toLowerCase())
            setFormData(prev => ({ ...prev, [name]: cat ? cat[0] : '' }))
        } 
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        if(name === 'page'){
            const page = Object.entries(categories[formData.category].pages).find(([key, val]) => val.name.toLowerCase() == value.toLowerCase())
            const pageId = page[0]
            const pageValue = page[1]
            setFormData(prev => ({
                ...prev,
                page: pageId,
                pageName: pageValue.name,
                url: pageValue.url,
                target: pageValue.target
            }))
            document.getElementById('pageName').value = pageValue.name;
            document.getElementById('url').value = pageValue.url;
            document.getElementById('target').value = pageValue.target
        }
    }

        const [status, setStatus] = useState(null); // for feedback

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = null;
            if(action === 'add'){
                response = await PageUtils.handleAddPageSubmit(formData);
            } else if (action === 'edit'){
                response = await PageUtils.handleEditPageSubmit(formData) 
            }
            
            if(response.ok){
                setStatus('Page added/edited successfully!');
                setFormData({ pageName: '', category: '', categoryId: '', url: '', target: '' }); 
            } else {
                setStatus('Failed to add/edit page.');
            }
        } catch (error) {
            setStatus('Error: ' + error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <div>
            
                <div>
                    {action === 'edit' && 
            formData.category &&
            categories[formData.category] &&
            categories[formData.category].pages && (
                    <div>
                        <label htmlFor="page">Page:</label>
                        <select
                        id="page"
                        name="page"
                        onChange={handleChange}
                        required
                        >
                        <option value="">
                            -- Choose page --
                        </option>
                        {Object.entries(categories[formData.category].pages).map(([key, value]) => (
                            <option key={key} value={value.name.toLowerCase()}>
                            {value.name}
                            </option>
                        ))}
                        </select>
                    </div>
                )}
                <div>
                    <label htmlFor="pageName">Name:</label>
                    <input
                        type="text"
                        id="pageName"
                        name="pageName"
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="url">URL:</label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="target">Open in:</label>
                    <select
                        id="target"
                        name="target"
                        onChange={handleChange}
                        required
                    >   
                        <option value="">
                            -- Choose location --
                        </option>
                            {targets.map(target => (
                                <option key={target} value={target.toLowerCase()}>
                                    {target === '_self' ? 'This window' : 'New tab'}
                                </option>
                            ))}
                    </select>         
                </div>
            </div>
            </div>
            <div>
                <button onClick={() => navigate('/', {state: {reload: true}})} type="submit">Save</button>
                <button onClick={() => navigate('/')}>Cancel</button>
            </div>
        </form>
    )
}

export default PageForm;