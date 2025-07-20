import { Link, useNavigate } from 'react-router-dom';
import './Page.css';
import PageUtils from '../utils/PageUtils';

const Page = ({categoryId, category, pages, action}) => {
    const navigate = useNavigate();

    const handleDelete = async (pageId) => {
        await PageUtils.deletePage(categoryId, pageId)
    }
    
    return (
        <div className='page-container'>
            {Object.entries(pages).map(([key,value]) => (
                <div key={key}>
                    <a href={value.url} target={value.target}>{value.name}</a>
                    {action === 'edit' && (
                        <div>
                        <button onClick={() => {
                            navigate('/editpage', {state: {reload: true, categoryId: categoryId, pageId: key}});
                        }}>
                            Edit
                        </button>
                        <button onClick={() => {
                            handleDelete(key); 
                            navigate('/edit', {state: {reload: true}});
                        }}>
                            Delete
                        </button>
                        </div>
                    )}
                </div>
          ))}
        </div>
    )
}

export default Page;
