import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from './components/Dashboard.js';
import CatForm from './components/CatForm.js';
import PageForm from './components/PageForm.js';
import Header from './components/Header.js';
import { useState } from 'react';
import CategoryUtils from './utils/CategoryUtils.js';
import { useEffect } from 'react';

function App() {
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { pathname } = useLocation();
  const isEditMode = pathname === '/edit';
  const action = isEditMode ? 'edit' : '';

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await CategoryUtils.fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
    if (location.state?.reload) {
      loadCategories();
    }
  }, [location])

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
        <Header action={action}/>
        <Routes>
          <Route path="/" element={<Dashboard categories={categories} action="view"/>} />
          <Route path="/edit" element={<Dashboard categories={categories} action="edit"/>} />
          <Route path="/addpage" element={<PageForm categories={categories} action="add"/>}/>
          <Route path="/editpage" element={<PageForm categories={categories} action="edit"/>}/>

          {/* <Route path="/addcategory" element={<CatForm categories={categories} action="add"/>}/>
          <Route path="/editcategory" element={<CatForm categories={categories} action="edit"/>}/>
          <Route path="/editpage" element={<PageForm categories={categories} action="edit"/>}/>
          <Route path="/deletepage" element={<Dashboard categories={categories} action="deletepage"/>}/>
          <Route path="/deletecategory" element={<Dashboard categories={categories} action="deletecategory"/>}/> */}
        </Routes>
    </div>
  );
}

export default App;
