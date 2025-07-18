class PageUtils {
    static async deletePage(categoryId, pageId){
        try {
            const response = await fetch(`http://localhost:8080/deletepage/${categoryId}/${pageId}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error ('Delele failed');
            const result = await response.json()
            console.log(result.message)
        } catch (error) {
            console.error('Error deleting page:', error);
        }
    }

    static async handleAddPageSubmit(formData) {
        const response = await fetch('http://localhost:8080/addpage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.pageName,
                category: formData.category,
                url: formData.url,
                target: formData.target
            }),
        });
        return response;
    }

    static async handleEditPageSubmit(formData){
        const response = await fetch(`http://localhost:8080/pages/${formData.category}/${formData.page}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.pageName,
                url: formData.url,
                target: formData.target
            }),
        });
    }


}

export default PageUtils;