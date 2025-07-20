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

    static async handleAddPageSubmit(pageData) {
        console.log(pageData)
        const response = await fetch('http://localhost:8080/addpage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoryId: pageData.categoryId,
                name: pageData.name,
                url: pageData.url,
                target: pageData.target
            }),
        });
        return response;
    }

    static async handleEditPageSubmit(pageData){
        const response = await fetch(`http://localhost:8080/pages/${pageData.categoryId}/${pageData.pageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: pageData.name,
                url: pageData.url,
                target: pageData.target
            }),
        });
    }


}

export default PageUtils;