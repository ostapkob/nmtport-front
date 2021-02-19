import axios from 'axios'
export default {
    GET_IP({
        commit
    }) {
        commit('CHANGE_IP') // i am doing this because need change ip for the test
    },
    GET_LAST_DATA({
        commit
    }) {
        return axios(this.state.last_data_api, {
            method: "GET"
        })
            .then(args => {
                commit('SET_LAST_DATA_TO_STATE', args.data);
                return args;
            })
            .catch(error => {
                commit('ERROR_STATE_LAST_DATA');
                console.log(error)
                return error;
            })
    },
    GET_KRAN_DATA({
        commit
    }) {
        return axios(this.state.kran_api, {
            method: "GET"
        })
            .then(args => {
                commit('SET_KRAN_DATA_TO_STATE', args.data);
                // commit('HASH_KRAN');
                return args;
            })
            .catch(error => {
                console.log(error)
                return error;
            })
    },
    GET_USM_DATA({
        commit
    }) {
        return axios(this.state.usm_api, {
            method: "GET"
        })
            .then(args => {
                commit('SET_USM_DATA_TO_STATE', args.data);
                // commit('HASH');
                return args;
            })
            .catch(error => {
                console.log(error)
                return error;
            })
    },

    SET_FLAG_NOTIFICATION({
        commit
    }, value) {
        commit('SET_FLAG_NOTIFICATION_TO_STATE', value);
    },
    SET_FLAG_AUDIO({
        commit
    }, value) {
        commit('SET_FLAG_AUDIO_TO_STATE', value);
    },
    SET_KRAN_API({
        commit
    }, value) {
        commit('CHANGE_KRAN_API', value);
        return axios(this.state.kran_api, {
            method: "GET"
        })
            .then(args => {
                // commit('SET_KRAN_DATA_TO_STATE', args.data);
                return args;
            })
            .catch(error => {
                console.log(error)
                return error;
            })
    },
    SET_SELECTED_FEATURES({
        commit
    }, value) {
        commit('SET_SELECTED_FEATURES_TO_STATE', value);
    },
    SET_USM_API({
        commit
    }, value) {
        commit('CHANGE_USM_API', value);
        return axios(this.state.usm_api, {
            method: "GET"
        })
            .then(args => {
                // commit('SET_USM_DATA_TO_STATE', args.data);
                return args;
            })
            .catch(error => {
                console.log(error)
                return error;
            })
    },
    SET_FILTER_LAST_DATA({
        commit
    }, value) {
        commit('SET_FILTER_LAST_DATA_TO_STATE', value);
    },
    SET_FILTER_LAST_DATA_FROM_LOCALSTORAGE({
        commit
    }) {
        commit('SET_STATE_FROM_LOCALSTORAGE');
    },
}
