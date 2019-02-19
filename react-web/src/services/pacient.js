var $axios = require("axios");
var $base = "http://localhost:3000/pacients/";

module.exports = {
    getPacientByCpf: function ($cpf) {
        return $axios.get(`${$base}/filter/cpf/${$cpf}`);
    }
}