import API from './api';

export const AuthService = {
    login: (data) => {
        return API.post('/login',data)
            .then(({data}) => {
                API.defaults.headers['Authorization'] = `Bearer ${data.token}`;
                return data
            })
            .catch(err => {
                console.log('Auth Service err',err);
                throw err
            })
    },

    register: (data) => {
        return API.post('/register',data)
            .then(({data}) => {
                API.defaults.headers['Authorization'] = `Bearer ${data.token}`;
                return data
            })
            .catch(err => {
                console.log('Auth Service err',err);
                throw err
            })
    },

    logout: (data) => {
        API.defaults.headers['Authorization'] = '';
    }

}
