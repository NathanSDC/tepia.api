var access = localStorage.getItem("accessCount");
if (access == "0" || access == null) {
    if (access == "0") {
        localStorage.setItem("accessCount", Number.parseInt(access) + 1);
    }else{
        localStorage.setItem("accessCount", 1);
    }
}else{
    localStorage.setItem("accessCount", Number.parseInt(access) + 1);
}


let signInBtn = document.querySelector("#sign-in-btn");
let logInBtn = document.querySelector("#log-in-btn");

let signInButton = signInBtn.childNodes[0];
let logInButton = logInBtn.childNodes[0];


var isSessionActive = localStorage.getItem("isSessionActive");

if(isSessionActive == "true"){
    signInButton.classList.remove("sgn-mark");
    logInButton.classList.remove("lgi-mark");
}else{
    if (!signInButton.classList.contains("sgn-mark")) {
        signInButton.classList.add("sgn-mark");
    }
    if (!logInButton.classList.contains("lgi-mark")) {
        logInButton.classList.add("lgi-mark");
    }
}