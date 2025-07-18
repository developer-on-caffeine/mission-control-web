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
                category.name === "Settings" ?
                (<p key={key}><Link to={value.url}>{value.name}</Link></p>)
                :
                <p key={key}>
                    <a href={value.url} target={value.target}>{value.name}</a>
                    {action === 'deletepage' && (
                        <button onClick={() => {
                            handleDelete(key); 
                            navigate('/deletepage', {state: {reload: true}});
                        }}>
                            Delete
                        </button>
                    )}
                </p>
          ))}
        </div>
    )
}

export default Page;
