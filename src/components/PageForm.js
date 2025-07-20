import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import PageUtils from "../utils/PageUtils";

const PageForm = ({categories, action}) => {
    const navigate = useNavigate();
    const location = useLocation()
    const categoryId = location.state.categoryId;
    const pageId = location.state.pageId ? location.state.pageId : ''
    
    const [pageData, setPageData] = useState({
        categoryId: categoryId,
        pageId: pageId,
        name: pageId !== '' ? categories[categoryId]['pages'][pageId].name : '',
        url:pageId !== '' ? categories[categoryId]['pages'][pageId].url : '',
        target: pageId !== '' ? categories[categoryId]['pages'][pageId].target : '',
    });

    console.log(pageData)
    const targets = ['_self', '_blank']

    const handleChange = e => {
        const { name, value } = e.target;
        setPageData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const [status, setStatus] = useState(null); // for feedback

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = null;
            if(action === 'add'){
                console.log( 'add')
                response = await PageUtils.handleAddPageSubmit(pageData);
            } else if (action === 'edit'){
                response = await PageUtils.handleEditPageSubmit(pageData) 
            }
            
            if(response.ok){
                setStatus('Page added/edited successfully!');
                
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
                <div>
                <div>
                    <label htmlFor="pageName">Name:</label>
                    <input
                        type="text"
                        id="pageName"
                        name="name"
                        value={pageData.name}
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
                        value={pageData.url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="target">Open in:</label>
                    <select
                        id="target"
                        name="target"
                        value={pageData.target}
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
                <button onClick={() => navigate('/edit', {state: {reload: true}})} type="submit">Save</button>
                <button onClick={() => navigate('/edit')}>Cancel</button>
            </div>
        </form>
    )
}

export default PageForm;