const raw = localStorage.getItem("u");
const user = JSON.parse(raw);
let posts = JSON.parse(raw).posts;

var parent = document.getElementById("posts-field");
posts.forEach(post => {
    let content = function(){
        var result;
        if (post.srcType=="IMAGE") {
            return `<img src="${post.image_VideoPath}" width="100%">`;
        } else  if (post.srcType=="VIDEO") {
            return `<video src="${post.image_VideoPath}"></video>`;
        }else if (post.srcType=="GIF") {
            return `<img src="${post.image_VideoPath}">`;
        }else if (post.srcType=="TEXT") {
            return `<img src="${post.image_VideoPath}">`;
        }else{

        }
    }

    let comments = function(){
        var resultC = "";
        post.comments.forEach(comment => {
            let c = `
                <div class="comment" id="${post.id}.comment.${comment.id}">
                    <p class="text">${comment.text}</p>
                    <section class="user-iteractive">
                        <div id="${post.id}.comment.${comment.id}.like"  role="button">
                            <ion-icon name="thumbs-up-outline"></ion-icon>
                            <span id="${post.id}.comment.${comment.id}.likesCounter">${comment.likesCounter}</span>
                        </div>
                        <div id="${post.id}.comment.${comment.id}.unlike"  role="button">
                            <ion-icon name="thumbs-down-outline"></ion-icon>
                            <span id="${post.id}.comment.${comment.id}.unlikesCounter">${comment.unlikesCounter}</span>
                        </div>
                    </section>
                </div>
            `;
            resultC += c;
        });
        return resultC;
    }

    const base = `
        <section class="post" id="${post.id}">
            <div>
                <section class="header">
                    <h4 class="title">${post.title}</h4>
                    <small class="uname">@${user.userUName}</small>
                    <!--<small class="desc">${(JSON.stringify(post.description)==post.text)? "" : post.description}</small>-->
                </section>
                <section class="content">
                    ${content()}
                    <p class="text selectable">${post.text}</p>
                </section>
            </div>
            <section class="user-iteractive">
                <div class="action-buttons">
                    <div id="${post.id}.like" onclick="toggle(this)"  role="button">
                        <ion-icon name="thumbs-up-outline"></ion-icon>
                        <span id="${post.id}.likesCounter">${post.likesCounter}</span>
                    </div>
                    <div id="${post.id}.unlike" onclick="toggle(this)"  role="button">
                        <ion-icon name="thumbs-down-outline"></ion-icon>
                        <span id="${post.id}.unlikesCounter">${post.unlikesCounter}</span>
                    </div>
                    <div id="${post.id}.favorite" onclick="toggle(this)"  role="button">
                        <ion-icon name="heart-outline"></ion-icon>
                        <span id="${post.id}.favoritesCounter">${post.favoritesCounter}</span>
                    </div>
                    <div id="${post.id}.share"  role="button">
                        <ion-icon name="share-outline"></ion-icon>
                        <span id="${post.id}.sharesCounter">${post.sharesCounter}</span>
                    </div>
                    <div id="${post.id}.comment"  role="button">
                        <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                        <span id="${post.id}.commentsCounter">${post.comments.length}</span>
                    </div>
                </div>
            </section>
        </section>
    `;
    parent.innerHTML += base;
});

function toggle(el){
    let element = document.getElementById(el.id);

    if (element.childNodes[1].getAttribute("name").includes("-outline")) {
        element.childNodes[1].setAttribute("name",element.childNodes[1].getAttribute("name").replace("-outline",""));

        let counter = document.getElementById(element.childNodes[3].id);
        let basis = new Number(counter.id.charAt(0));
        let type = new String(element.childNodes[3].id.replace(element.childNodes[3].id.charAt(0) + ".", ""));
        for (let i = 0; i < posts.length; i++) {
            let element = posts[i];
            if (element.id == basis) {
                switch(type.valueOf()){
                    case "likesCounter":
                        counter.innerText = element.likesCounter + 1;
                        element.likesCounter += 1;
                        break;
                    case "unlikesCounter":
                        element.unlikesCounter +=1;
                        counter.innerText = element.unlikesCounter;
                        break;
                    case "favoritesCounter":
                        element.favoritesCounter +=1;
                        counter.innerText = element.favoritesCounter;
                        break;
                    case "sharesCounter":
                        element.sharesCounter +=1;
                        counter.innerText = element.sharesCounter;
                        break;
                }
                posts[i] = element;
            }
        }
    }else{
        element.childNodes[1].setAttribute("name",element.childNodes[1].getAttribute("name") + "-outline");

        let counter = document.getElementById(element.childNodes[3].id);
        let basis = new Number(counter.id.charAt(0));
        let type = new String(element.childNodes[3].id.replace(element.childNodes[3].id.charAt(0) + ".", ""));
        for (let i = 0; i < posts.length; i++) {
            let element = posts[i];
            if (element.id == basis) {
                switch(type.valueOf()){
                    case "likesCounter":
                        element.likesCounter -= 1;
                        counter.innerText = element.likesCounter ;
                        break;
                    case "unlikesCounter":
                        element.unlikesCounter -=1;
                        counter.innerText = element.unlikesCounter;
                        break;
                    case "favoritesCounter":
                        element.favoritesCounter -=1;
                        counter.innerText = element.favoritesCounter;
                        break;
                    case "sharesCounter":
                        element.sharesCounter -=1;
                        counter.innerText = element.sharesCounter;
                        break;
                }
                posts[i] = element;
            }
        }   
    }
}