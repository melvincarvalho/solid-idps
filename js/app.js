var idpList = 'https://solid.github.io/solid-idp-list/servers.json';

/* ---- DON'T EDIT BELOW ---- */
var accURL = {};
var queryVals = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

var init = function() {
  var http = new XMLHttpRequest();
  http.open('GET', idpList);
  http.onreadystatechange = function() {
      if (this.readyState == this.DONE) {
        if (this.status === 200) {
          list(JSON.parse(http.responseText));
        } else {
          console.log("Can't load json file: "+this.status);
        }
      }
  };
  http.send();
};

var list = function(data) {
  for (i in data.idps) {
    var idp = data.idps[i];
    var card = '<div class="card">'+
      '  <header>'+
      '   <img src="'+safeHTML(idp.icon)+'" class="roundicon">'+
      '   <div class="title">'+safeHTML(idp.title)+'</div>'+
      '  </header>'+
      '  <article class="justify">'+
          safeHTML(idp.description)+
      '   <br>'+
      '   <small><a href="'+safeHTML(idp.privacyURL)+'" target="_blank">Privacy statement</a></small>'+
      '  </article>'+
      '  <footer>'+
      '    <div class="buttons center">'+
      '      <a href="'+safeHTML(idp.url)+'" class="button greenbg">Take me there</a>'+
      '    </div>'+
      '  </footer>'+
      '</div>';
      document.querySelector(".cards").insertAdjacentHTML('afterbegin', card);
    }
};

var safeHTML = function(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

init();