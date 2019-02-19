var $axios = require("axios");
var $base = "http://localhost:3000";
var store = require("store");

// @TODO
// const token = store.get('user') ? store.get('user').token : '';
// const config = {
//     headers: {'Authorization': "Bearer " + token}
// };

module.exports = {
    listAll: function ($module) {
        const token = store.get('user') ? store.get('user').token : '';
        const config = {
            headers: {'Authorization': "Bearer " + token}
        };
        return $axios.get(`${$base}/${$module}`, config);
    },
    insert: function ($module, $object) {
        const token = store.get('user') ? store.get('user').token : '';
        const config = {
            headers: {'Authorization': "Bearer " + token}
        };
        return $axios.post(`${$base}/${$module}`, $object, config);
    },
    update: function ($module, $object) {
        const token = store.get('user') ? store.get('user').token : '';
        const config = {
            headers: {'Authorization': "Bearer " + token}
        };
        return $axios.patch(`${$base}/${$module}`, $object, config);
    },
    getById: function ($module, $id) {
        const token = store.get('user') ? store.get('user').token : '';
        const config = {
            headers: {'Authorization': "Bearer " + token}
        };
        return $axios.get(`${$base}/${$module}/${$id}`, config);
    },
    delete: function ($module, $id) {
        const token = store.get('user') ? store.get('user').token : '';
        const config = {
            headers: {'Authorization': "Bearer " + token}
        };
        return $axios.delete(`${$base}/${$module}/${$id}`, config);
    },
}