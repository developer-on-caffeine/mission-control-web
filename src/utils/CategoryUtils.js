class CategoryUtils {
  static async fetchCategories() {
    try {
      const response = await fetch('http://localhost:8080/pages');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;      
    }
  };

  static async deleteCategory(categoryId){
    try {
      const response = await fetch(`http://localhost:8080/deletecategory/${categoryId}`, {
          method: 'DELETE',
      })
      if (!response.ok) throw new Error ('Delele failed');
      const result = await response.json()
      console.log(result.message)
    } catch (error) {
        console.error('Error deleting page:', error);
    }
  }

  static async handleAddCategorySubmit(formData) {
    console.log(formData)
    const response = await fetch('http://localhost:8080/addcategory', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: formData.categoryName,
          color: formData.color,
          pages: formData.pages
      }),
    });
    return response;
  }

  static async handleEditCategorySubmit(formData){
    console.log(formData)
    const response = await fetch(`http://localhost:8080/categories/${formData.category}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: formData.categoryName,
          color: formData.color
      }),
    });
    return response;
  }
}

export default CategoryUtils;