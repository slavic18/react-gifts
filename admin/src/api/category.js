export const categoryApi = {
    fetchCategory: (categoryId) => {
        return fetch('http://localhost:9000/api/categories/' + categoryId, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            });
    }
};