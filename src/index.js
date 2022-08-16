import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/style.scss";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';


var date = new Date();
var year = date.getFullYear();
document.getElementById("date").innerHTML = year;

var $password = document.getElementById("password");
var $mybtn = document.getElementById("mybtn");

$mybtn.onclick = function () {
    if(this.textContent='show password') {
        $password.setAttribute("type","text");
        this.textContent="hide password";
    } else {
        $password.setAttribute("type","password");
    }
    this.textContent = "show password";
}


