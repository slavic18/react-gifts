import {stringify} from "query-string";

export const giftApi = {
    fetchGift: (giftId) => {
        return fetch('http://localhost:9000/api/gifts/' + giftId, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            });
    },
    fetchGifts: () => {
        return fetch('http://localhost:9000/api/gifts/', {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            });
    },
    fetchCategoryGifts: (categoryId) => {
        console.log(categoryId);
        return fetch('http://localhost:9000/api/giftsByCategory/?category_id=' + categoryId, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            });
    },
    removeGifts: (gifts) => {
        console.log(gifts);
        return fetch('http://localhost:9000/api/gifts/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: stringify({gifts: gifts})
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            });
    }
}