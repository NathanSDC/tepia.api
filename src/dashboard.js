const config = {
    SESSION: {
        Status: "",
        IsActive: true,
        leftTime: 500000
    },
    UI: {
        BASE: JSON.parse(localStorage.getItem("u")),
        UUname: JSON.parse(localStorage.getItem("u")).userUName,
        UName: JSON.parse(localStorage.getItem("u")).userName,
        UId: JSON.parse(localStorage.getItem("u")).userId
    },
    CM: {
        F: {
            cc: fetch("http://192.168.0.105:9090/connections/n-con",
                {
                    method: "GET",
                    headers: new Headers().append("Content-Type", "application/json"),
                    redirect: "follow"
                }
            )
                .then((response) => response.text())
                .then((result) => {
                    localStorage.setItem("lfr", result);
                })
                .catch((error) => console.log(error)),

            uc: fetch("http://192.168.0.105:9090/connections/u-" + JSON.parse(localStorage.getItem("lfr")).id,
                {
                    method: "GET",
                    headers: new Headers().append("Content-Type", "application/json"),
                    redirect: "follow"
                }
            )
                .then((response) => response.text())
                .then((result) => {
                    localStorage.setItem("lfr", result);
                })
                .catch((error) => console.log(error)),
            uu: fetch("http://192.168.0.105:9090/users/id/" + JSON.parse(localStorage.getItem("u")).userId,
                {
                    method: "GET",
                    headers: new Headers().append("Content-Type", "application/json"),
                    redirect: "follow"
                }
            )
                .then((response) => response.text())
                .then((result) => {
                    let u = JSON.parse(result);
                    localStorage.setItem("u",JSON.stringify(JSON.parse(`{"userId":"${u.id}","userName":"${u.name}","userUName":"${u.userName}","userEmail":"${u.email}","userPhone":"${u.phone}","prefers":${JSON.stringify(u.prefers)},"posts":[${u.posts}],"comments":[${u.comments}],"subComments":[${u.subComments}]}`))); 
                })
                .catch((error) => console.log(error))
        },
        CS: {
            K: JSON.parse(localStorage.getItem("lfr")).ssl
        },
        M: JSON.parse(localStorage.getItem("lfr")).moment,
        ID:JSON.parse(localStorage.getItem("lfr")).id
    }
}

window.onload = function (){
    document.title = "Dashboard - " + config.UI.UUname;
    document.getElementById("uname").innerHTML = "@" + config.UI.UUname;

    let root = document.body;
    root.classList.remove("dafault");
    if (localStorage.getItem("u")!=null) {
        var theme = (JSON.parse(localStorage.getItem("u")).prefers.theme + "").replace("_","-").toLowerCase();
        root.setAttribute("class",theme);
    }
};

function dropdown(el){
    let pel = el.childNodes[1];

    if (pel.getAttribute("data-boolean") == "false") {
        el.childNodes[3].classList.remove("display-none");
        pel.childNodes[3].setAttribute("name","caret-up-outline");
        pel.setAttribute("data-boolean", "true");
        setText(pel.childNodes[1]);
    }else if(pel.getAttribute("data-boolean") == "true"){
        el.childNodes[3].classList.add("display-none");
        pel.childNodes[3].setAttribute("name","caret-down-outline");
        pel.setAttribute("data-boolean", "false");
        setText(pel.childNodes[1]);
    }
}

function setText(el){
    switch (localStorage.getItem("theme")) {
        case "dark-blue": el.innerHTML = "DarkBlue"; break;
        case "dark-green": el.innerHTML = "DarkGreen"; break;
        case "dark-red": el.innerHTML = "DarkRed"; break;
        case "default": el.innerHTML = "Default"; break;
        case "light-blue": el.innerHTML = "LightBlue"; break;
        case "light-green": el.innerHTML = "Green"; break;
        case "light-red": el.innerHTML = "Red"; break;
    }
}

function setTheme(theme, el){

    let root = document.body;
    switch (theme) {

        case "DarkBlue":
            localStorage.setItem("theme","dark-blue");
            root.setAttribute("class",localStorage.getItem("theme"));
            dropdown(el);
        break;

        case "DarkRed":
            localStorage.setItem("theme","dark-red");
            root.setAttribute("class",localStorage.getItem("theme"));
            dropdown(el);
        break;

        case "DarkGreen":
            localStorage.setItem("theme","dark-green");
            root.setAttribute("class",localStorage.getItem("theme"));
            dropdown(el);
        break;

        case "LightBlue":
            localStorage.setItem("theme","light-blue");
            root.setAttribute("class",localStorage.getItem("theme"));
            dropdown(el);
        break;

        case "LightGreen":
            localStorage.setItem("theme","light-green");
            root.setAttribute("class",localStorage.getItem("theme"));
            dropdown(el);
        break;

        case "LightRed":
            localStorage.setItem("theme","light-red");
            root.setAttribute("class",localStorage.getItem("theme"));
            dropdown(el);
        break;

        case "Default":
            localStorage.setItem("theme","default");
            root.setAttribute("class",localStorage.getItem("theme"));
            dropdown(el);
        break;
            
        default:
            localStorage.setItem("theme","default");
        break;
    }
}