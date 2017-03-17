import {stringify} from "query-string";

export const categoryApi = {
    fetchCategory: (categoryId) => {
        return fetch('http://localhost:9000/api/categories/' + categoryId, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            });
    },
    fetchCategories: () => {
        return fetch('http://localhost:9000/api/categories/', {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            });
    },
    removeCategories: (categories) => {
        console.log(categories);
        return fetch('http://localhost:9000/api/categories/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: stringify({categories: categories})
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            });
    }
}