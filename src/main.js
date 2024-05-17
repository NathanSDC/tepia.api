class Fetch {
  requestOptions = {
    method: "GET",
    headers: this.myHeaders,
    body: undefined,
    redirect: "follow"
  }
  myHeaders = new Headers();
  raw = undefined;

  Fetch (){

  }
  
  options(requestOptions){
    this.requestOptions = requestOptions;
  }
  
  execute(location){
    this.myHeaders.append("Content-Type", "application/json");

    let url = "http://192.168.0.105:9090/" + location;

    fetch(url, this.requestOptions)
    .then((response) => response.text())
    .then((result) => localStorage.setItem("Result", result))
    .catch((error) => console.error(error))
  }
}


window.onload = ()=>{
  var f = new Fetch();
  f.execute("apps");

  let response = JSON.parse(localStorage.getItem("Result"));
  var Apps5 = [];

  var interval = setTimeout(()=>{
    if (response != null) {
      for (let i = 0; i < ((response.length > 7)? 8 : response.length); i++) {
        Apps5[i] = response[i];
      }
      load5Apps(document.getElementById("loader5Apps") ,Apps5);
    }
  }, 200);
}

function load5Apps(el ,array){
  array.forEach(element => {
    let appDisplay = document.createElement("div");
    appDisplay.classList.add("EA-AD","non-selectable");
    appDisplay.id = element.id;

    let box = document.createElement("div");

    let appImage = document.createElement("img");
    appImage.src = element.srcImage
    appDisplay.appendChild(appImage);

    let appTitle = document.createElement("h4");
    appTitle.innerText = element.name;
    box.appendChild(appTitle);

    let appVersion = document.createElement("small");
    var bid = 0;
    var pos = 0;
    for (let j = 0; j < element.appVersions.length; j++) {
      if (element.appVersions[j].id > bid) {
        bid = element.appVersions[j].id;
        pos = j;
      }
    }
    appVersion.innerText = element.appVersions[pos].version;
    box.appendChild(appVersion);
    
    let appDesc = document.createElement("small");
    appDesc.innerText = element.appVersions[pos].versionDescription;
    box.appendChild(appDesc);
    
    appDisplay.appendChild(box);
    
    el.appendChild(appDisplay);
  });
}