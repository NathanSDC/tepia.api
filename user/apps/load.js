const __main__ = ()=>{
    let decoded = decodeURI(window.location.search.substring(5,window.location.search.length));
    console.log(decoded);
    var app = JSON.parse(decoded);

    function getNewerVersion() {
        if (app != null && app != undefined) {
            var bid = 0;
            var pos = 0;
            for (let j = 0; j < app.appVersions.length; j++) {
                if (app.appVersions[j].id > bid) {
                    bid = app.appVersions[j].id;
                    pos = j;
                }
            }

            return app.appVersions[pos];
        } else {
            console.error("app is " + null + " or " + undefined);
        }
    }

    function build() {
        var headElement = `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${getNewerVersion().versionDescription}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">        
    <link rel="apple-touch-icon" href="${app.srcImage}">
    <link rel="shortcut icon" href="${app.srcImage}">
    <link rel="stylesheet" href="http://192.168.0.105:5500/user/apps/src/loaded-content.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <title>${app.name} - @${app.user.userName}</title>
</head>`;

        var bodyElement = `
<body>
    <header class="page-header">
        <section class="header-menu non-selectable">
        <h2>
            <img src="http://192.168.0.105:5500/assets\%20-\%20images/images/Logo1.2.png" width="22px"> 
            <small>AWebStore</small>
        </h2>
        <menu class="menu non-selectable" type="context">
            <li><a href="">Blog</a></li>    
            <li><a href="">Services</a></li>
            <li><a href="http://192.168.0.105:5500/+login.html">Login</a></li>
            <li><a href="http://192.168.0.105:5500/sigin.html">Signup</a></li>
        </menu>
        </section>
        <hr>
    <header>
    <main>

    </main>
    <footer>

    </footer>
    <script type="text/javascript" src="http://192.168.0.105:5500/user/apps/src/loaded-content.js"></script>
</body>`;

        var base = `<!DOCTYPE html>
<html lang="en">
${headElement}
${bodyElement}
</html>`;

        return base;
    }

    document.getElementById("show").innerText = build();

}

window.onload = __main__;