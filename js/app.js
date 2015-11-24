var idpList = 'https://solid.github.io/solid-idp-list/services.json';

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

    // card
    var card = document.createElement('div');
    card.classList.add('card');

    // header
    var header = document.createElement('header');
    header.style.background = (idp.icon_bg && idp.icon_bg.length > 0)?safeHTML(idp.icon_bg):'';
    card.appendChild(header);
    // icon
    if (idp.icon && idp.icon.length > 0) {
      var img = document.createElement('img');
      img.src = safeHTML(idp.icon);
      img.classList.add('roundicon');
      header.appendChild(img);
    } else {
      var img = '<div class="pad15">'+
      '      <div class="icon-placeholder">'+
      '        <div class="smiley">°⏑°</div>'+
      '      </div>'+
      '    </div>';
      header.insertAdjacentHTML('beforeend', img);
    }

    // title
    var title = document.createElement('div');
    title.classList.add('title');
    title.innerHTML = (idp.title && idp.title.length > 0)?safeHTML(idp.title):'';
    if (idp.title_color && idp.title_color.length > 0) {
      title.style.color = safeHTML(idp.title_color);
    }
    header.appendChild(title);

    // article
    var article = document.createElement('article');
    article.innerHTML = (idp.description && idp.description.length > 0)?safeHTML(idp.description):'';
    card.appendChild(article);
    // br
    article.appendChild(document.createElement('br'));
    // privacy
    if (idp.policyURL && idp.policyURL.length > 0) {
      var policy = document.createElement('a');
      policy.classList.add('external');
      policy.href = safeHTML(idp.policyURL);
      policy.innerHTML = "Privacy policy";
      policy.setAttribute('target', '_blank'); // change to modal maybe?
      article.appendChild(document.createElement('small').appendChild(policy));
    }

    // footer
    var footer = document.createElement('footer');
    card.appendChild(footer);
    // buttons div
    var buttons = document.createElement('div');
    buttons.classList.add('buttons');
    footer.appendChild(buttons);
    var button = document.createElement('a');
    button.innerHTML = "Take me there";
    button.href = (idp.url && idp.url.length > 0)?safeHTML(idp.url):'#';
    button.classList.add('button');
    if (idp.btn_bg && idp.btn_bg.length > 0) {
      button.style.background = safeHTML(idp.btn_bg);
    } else {
      button.classList.add('greenbg');
    }
    if (idp.btn_color && idp.btn_color.length > 0) {
      button.style.color = safeHTML(idp.btn_color);
    }
    buttons.appendChild(button);

    // append to DOM
    document.querySelector(".cards").appendChild(card);
  }

  var howto = '<div class="card">'+
    '  <header>'+
    '    <div class="pad15">'+
    '      <div class="icon-placeholder">'+
    '        <div class="smiley">°⏑°</div>'+
    '      </div>'+
    '    </div>'+
    '    <div class="title">Your title here</div>'+
    '  </header>'+
    '  <article>'+
    '    <p>Would you like to have your server listed here?</p>'+
    '    <p>Click the button below to learn how you can register as an official Solid account provider.</p>'+
    '  </article>'+
    '  <footer>'+
    '    <div class="buttons">'+
    '      <a href="https://github.com/solid/solid-idp-list/" target="_blank" class="button">Learn more</a>'+
    '    </div>'+
    '  </footer>'+
    '</div>';
    document.querySelector(".cards").insertAdjacentHTML('beforeend', howto);
};

var safeHTML = function(str) {
  if (str && str.length > 0) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  return '';
};

init();