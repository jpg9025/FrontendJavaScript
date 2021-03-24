const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';

// NEVER USE ARROW FUNCTIONS ON METHOD DEFINITIONS - Arrow functions use the scope of their father and it creates problems when we use this

export default {

    getAdvertisments: async function(query = null) {
        const currentUser = await this.getUser(); // get the current user
        let url = `${BASE_URL}/api/messages?_expand=user&_sort=id&_order=desc`;
        if (query) {
            url += `&q=${query}` // Set a search system with the query received
        }
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.map(advertisment => { // <--- this is a resolve(data)
                const user = advertisment.user || {}; // Avoid problem if the username is empty with an empty object
                return {
                    id: advertisment.id,
                    message: advertisment.message.replace(/(<([^>]+)>)/gi, ""), // This regular expresion, inserted with replace, avoid the inyection of HTML code
                    date: advertisment.createdAt || advertisment.updatedAt,
                    author: user.username || 'Unkown', // replacing advertisment.user.username for user.username if the username is empty it will run 
                    image: advertisment.image,
                    canBeDeleted: currentUser ? currentUser.userId === advertisment.userId : false, // Same as: if(currentUser = null) { currentUser.userId === advertisment.userId - if it's equal, returns true and the user can delete the advertisment } else { false }
                    onSale: advertisment.onSale,
                    price: advertisment.price
                }
            }); 
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    getAdvertismentById: async function(id) {
        const data = await Promise.all([
            this.getUser(),
            this.get(`${BASE_URL}/api/messages/`) // No entiendo porqué no me recibe los datos directamente del anuncio concreto con `${BASE_URL}/api/messages/${id}`
        ]);
        try {
            for (var datos of data) {
                if (datos.id === id) {
                    const message = datos[0];
                    const image = datos[1];
                    const onSale = datos[2];
                    const price = datos[3];
                    const aurhor = datos[5];
                    console.log(message)
                }
            } return datos
        } catch (error) {
            if (error.statusCode === 404) {
                return null
            } else {
                throw error
            }
        }
    },

    url: function(url, params={}) {
        return `${BASE_URL}${url}`
    },

    get: async function(path, getData, json = true) {
        const url = this.url(path, getData);
        return await this.request('GET', path, getData, json)
    },

    post: async function(url, postData, json = true) {
        return await this.request('POST', url, postData, json)
    },

    delete: async function(url) {
        return await this.request('DELETE', url, {});
    },

    put: async function(url, putData, json = true) {
        return await this.request('PUT', url, putData, json);
    },

    request: async function(method, url, postData, json = true ) { // third param json, optional, is init as true and it sets header and body
        const config = {
            method: method,
            headers: { },
            body: null
        };
        if (json) {
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(postData) // transform the user object in a JSON string type
        } else {
            config.body = postData;
        }
        // Autentication with JWT. Its done with the headers and token (if there is a token)
        const token = await this.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(url, config);
        const data = await response.json();  // data is server answer, can be OK or NOK
        if (response.ok) {
            return data;
        } else {            
            throw new Error(data.message || JSON.stringify(data));
        }
    },

    registerUser: async function(user) {
        const url = `${BASE_URL}/auth/register`;
        return await this.post(url, user);
    },

    login: async function(user) {
        const url = `${BASE_URL}/auth/login`;
        return await this.post(url, user);
    },

    saveToken: async function(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: async function() {
        return localStorage.getItem(TOKEN_KEY);
    },

    /**/
    deleteToken: async function(token) {
        localStorage.removeItem(TOKEN_KEY, token);
    },

    isUserLogged: async function() {
        const token = await this.getToken();
        return token !== null;
    },

    saveAdvertisment: async function (advertisment) {
        // Advertisment image
        const url = `${BASE_URL}/api/messages/`;
        if (advertisment.image) {
            const imageURL = await this.uploadImage(advertisment.image);
            advertisment.image = imageURL;
        }
        
        // On Sale or To Buy options
        if (document.querySelector('input[type="radio"]:checked').value === "true"){
            advertisment.onSale = true;
        } else {
            advertisment.onSale = false;
        }

        // Price
        advertisment.price = document.querySelector('input[type="number"]').value

        // Advertisment id
        advertisment.id = parseInt(advertisment.id);
        if (advertisment.id) {
            url += `${advertisment.id}`;
            return await this.put(url, advertisment);
        } else {
            return await this.post(url, advertisment);
        }
    },

    uploadImage: async function(image) {
        const form = new FormData(); // FormData() is an JS object that simulate a form HTML 
        form.append('file', image); // In sparrest, its needed to make a POST request with the attribute name="file"
        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false);
        // console.log('uploadImage', response);
        return response.path;
    },

    getUser: async function() {
        try {
            const token = await this.getToken(); // the token has the user information
            const tokenParts = token.split('.'); // token are divided in three parts by points
            if (tokenParts.length !== 3) {
                return null;
            }
            const payload = tokenParts[1]; // get the playload, codifyed on base64 - tokenParts[1] is username
            const jsonStr = atob(payload); // decode the base64
            const { userId, username } = JSON.parse(jsonStr); // pasing the JSON of decoded base64
            return { userId, username };
        } catch (error) {
            return null;
        }
    },

    deleteAdvertisment: async function(advertisment) {
        const url = `${BASE_URL}/api/messages/${advertisment.id}`;
        return await this.delete(url);
    }
};
