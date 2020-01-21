import axios from 'axios';

export const state = () => ({
    userList: [{
        "n": "Admin",
        "email": "admin@annatadesign.com",
        "password": "admin",
        "company": "Annata",
        "jobTitle": "Admin",
        "address": {
            "city": "Bangalore",
            "state": "Karnataka",
            "country": "India",
        },
        isAdmin: true,
    },
    {
        "n": "User",
        "email": "user@annatadesign.com",
        "password": "user",
        "company": "Annata",
        "jobTitle": "UI Developer",
        "address": {
            "city": "Bangalore",
            "state": "Karnataka",
            "country": "India",
        },
        isAdmin: false,
    }
    ],
    status: '',
    isLoggedIn: '',
    user: {}
})

export const mutations = {
    auth_success(state, user) {
        return new Promise((resolve, reject) => {
            state.status = true
            state.user = user
            resolve(state.status)
        })
    },
    auth_logOut(state) {
        state.status = false
    },
    auth_error(state) {
        state.status = false
        return new Promise((resolve, reject) => {
            resolve(state.status)
        })
    },
    addUser(state, user) {
        state.userList.push(user);
        // console.log(JSON.stringify(state.userList))
    },
    editUser(state, user) {

        this.state.userList.some((u, i) => {
            if (u.email === user.email) {
                // const isAdmin = this.state.userList[i].isAdmin
                this.state.userList[i] = user;
                // this.state.userList[user.userIndex]['isAdmin'] = isAdmin
            }
        })

    },
    deleteUser(state, index) {
        delete this.state.userList.splice(index, 1)
    },
    setUsers(state, users) {
        this.state.userList = users
    }
}

export const getters = {
    isLoggedIn: state => state.status,
    getUsers: state => {
        return state.userList;
    },
    getUser: (state) => {
        return state.user
    }
}

export const actions = {
    login({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            let cUser = {};
            if (user.email.value === 'admin@annatadesign.com' && user.password.value === 'admin') {
                cUser = { email: user.email.value, name: 'Admin', isAdmin: true };
                commit('auth_success', cUser);
                resolve(true)
            } else {
                axios.get('https://nuxt-server.herokuapp.com/api/users')
                    .then((res) => {
                        let users = res.data;
                        let len = res.data.length;
                        let id;
                        const valid = users.some((u) => {
                            return u.email === user.email.value && u.password === user.password.value && (cUser = u)
                        })
                        if (valid) {
                            commit('auth_success', cUser)
                            resolve(true)
                        } else {
                            commit('auth_error')
                            reject(false)
                        }
                    })
            }
        })
    },
    logout({
        commit
    }) {
        commit('auth_logOut')
    },
    addUser({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            axios.post('https://nuxt-server.herokuapp.com/api/register', user).then(res => {
                resolve(true)
            })
        })
    },
    editUser({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            axios.put('https://nuxt-server.herokuapp.com/api/user/' + user.id, user.temp).then(res => {
                commit('editUser', user.temp)
                resolve(true)
            })
        })
    },
    deleteUser({ commit }, data) {
        return new Promise((resolve, reject) => {
            axios.delete("https://nuxt-server.herokuapp.com/api/user/" + data.id).then(res => {
                commit('deleteUser', data.index)
                resolve(true);
            }).catch(res => {
                console.log('Errored in Edit User')
            })
        })

    },
    setAllUsers({ commit }, users) {
        commit('setUsers', users)
    }
}