let userInfoField = document.getElementById("userInfoField");
userInfoField.childNodes.forEach(el=>{
    if (el.tagName == "P") {
        switch (el.childNodes[0].nodeValue) {
            case "Name:":
                el.childNodes[1].innerHTML = JSON.parse(localStorage.getItem("u")).userName;
                break;
            case "User Name:":
                el.childNodes[1].innerHTML = JSON.parse(localStorage.getItem("u")).userUName;
                break;
            case "Email:":
                el.childNodes[1].innerHTML = JSON.parse(localStorage.getItem("u")).userEmail;
                break;
            case "Phone:":
                let value = JSON.parse(localStorage.getItem("u")).userPhone;
                if (value == "null") {
                    el.childNodes[1].innerHTML = "";
                }else{
                    el.childNodes[1].innerHTML = value;
                }
                break;
            case "Followers Count:":
                length = JSON.parse(localStorage.getItem("u")).posts;
                el.childNodes[1].innerHTML = length.length;
                break;
            default:
                break;
        }
    }
});

function exitSession(){
    localStorage.removeItem("hasSessionActive");
    localStorage.removeItem("u");
    localStorage.removeItem("theme");
    window.location = "../login.html";
}