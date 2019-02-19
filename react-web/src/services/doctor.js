var $axios = require("axios");
var $base = "http://localhost:3000/doctors/";

module.exports = {
    getDoctorByCrm: function ($crm) {
        return $axios.get(`${$base}/filter/crm/${$crm}`);
    }
}