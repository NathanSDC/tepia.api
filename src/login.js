if (localStorage.getItem("hasSessionActive") == null) {
    localStorage.setItem("hasSessionActive", "");
}
if (localStorage.getItem("lfr") == null) {
    localStorage.setItem("lfr", "");
}
if (localStorage.getItem("pssl") == null) {
    localStorage.setItem("pssl", "");
}

var u = document.getElementById("uname");
var p = document.getElementById("p");

const SESSION = JSON.parse(`{
    "isSessionActive": "${localStorage.getItem("hasSessionActive")}",
    "userId": "${(localStorage.getItem("isSessionActive"))? JSON.parse(localStorage.getItem("u")).userId: ""}",
    "userName": "${(localStorage.getItem("isSessionActive"))? JSON.parse(localStorage.getItem("u")).userName: ""}",
    "userUname": "${(localStorage.getItem("isSessionActive"))? JSON.parse(localStorage.getItem("u")).userUname: ""}",
    "userEmail": "${(localStorage.getItem("isSessionActive"))? JSON.parse(localStorage.getItem("u")).userEmail: ""}",
    "userPhone": "${(localStorage.getItem("isSessionActive"))? JSON.parse(localStorage.getItem("u")).userPhone: ""}",
    "c_ulr":"${localStorage.removeItem("ulr")}"
}`);

const config = {
    VALIDATE_URL: function () {
        return "?u=" + u.value + "%20p=" + p.value;
    },
    SESSION: SESSION,
    FETCH_CONFIG: {
        /**
         * The Base Url to all fetchs
         */
        gsl: () => {
            fetch("http://192.168.0.105:9090/connections/n-con",
                {
                    method: "GET",
                    headers: new Headers().append("Content-Type", "application/json"),
                    redirect: "follow"
                }
            )
                .then((response) => response.text())
                .then((result) => {
                    localStorage.setItem("lfr", result);
                    localStorage.setItem("pssl", JSON.stringify(JSON.parse(result).ssl));
                })
                .catch((error) => console.log(error))
        },
        usl: (id) => {
            fetch("http://192.168.0.105:9090/connections/u-" + id,
                {
                    method: "GET",
                    headers: new Headers().append("Content-Type", "application/json"),
                    redirect: "follow"
                }
            )
                .then((response) => response.text())
                .then((result) => {
                    localStorage.setItem("lfr", result);
                    localStorage.setItem("pssl", JSON.stringify(JSON.parse(result).ssl));
                })
                .catch((error) => console.log(error))
        }
    }
}

window.onload = () => {
    config.FETCH_CONFIG.gsl();
    refreshConnection();
}

function refreshConnection() {
    var i = window.setInterval(() => {
        config.FETCH_CONFIG.usl(JSON.parse(localStorage.getItem("lfr")).id);
    }, 15000);
}

let ppe = document.querySelector("#pp");
let bool = false;
function t(el) {
    if (bool) {
        let pe = document.querySelector("#p");
        pe.type = "text";
        el.childNodes[0].name = "eye-outline"
        bool = false;
    } else {
        let pe = document.querySelector("#p");
        pe.type = "password";
        el.childNodes[0].name = "eye-off-outline"
        bool = true;
    }
}

if(localStorage.getItem("hasSessionActive")){
    window.location = "dashboard-overview.html";
}