'use-strict';

function base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function bytesToBase64(bytes) {
    const binString = Array.from(bytes, (byte) =>
        String.fromCodePoint(byte),
    ).join("");
    return btoa(binString);
}

//   new TextDecoder().decode(base64ToBytes("YSDEgCDwkICAIOaWhyDwn6aE"));

function getEncryptedData(){
    let obj = {
        "username":"%s",
        "email":"%s",
        "password":"%s",
        "recPhone":"%s",
        "country":"BRAZIL"
    }
    var result = JSON.stringify(obj);

    let array = document.getElementById("siginForm").getElementsByTagName("input");
    for (let index = 0; index < array.length; index++) {
        result = result.replace("%s",bytesToBase64(new TextEncoder().encode(array.item(index).value)));
    }

    return result;
}

var data = [];
function setData(pos = Number(), value){
    data[pos] = value;
}

function sendForm(){
    let headers = new Headers();
        headers.append("Content-Type","application/json");
        headers.append("Connection","keep-alive");

    let options = {
        method: "POST",
        headers: headers,
        redirect: "follow",
        body: getEncryptedData()
    }

    console.log(options.body);
    console.log(JSON.parse(options.body));

    fetch("http://192.168.0.105:8080/users/sigin", options)
        .then((response)=>{response.text()})
        .then((result)=>{setData(0,result)})
        .catch((error)=>{console.error(error)});

    return data[0];
}