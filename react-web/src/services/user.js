var $axios = require("axios");
var $base = "http://localhost:3000/users/";

module.exports = {
    loginEmailAndPassword: function($data){
        return $axios.post(`${$base}login`, $data);
    }
}