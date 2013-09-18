var DMD = (function(){
    var div_content;
    var div_menu;
    var pages_md = {};
    var pages_url = {};
    var default_page_name = null;

    function init(){
        // window.onload = onLoadListener;
        // window.onhashchange = onHashChangeListener;
        // or
        if (window.addEventListener) {
            window.addEventListener("load", onLoadListener, false);
            window.addEventListener("hashchange", onHashChangeListener, false);
        } else if (window.attatchEvent) {
            window.attatchEvent("onload", onLoadListener);
            window.attatchEvent("onhashchange", onHashChangeListener);
        }
    };

    function onLoadListener(){
        div_content = window.document.getElementById("dmd-content");
        if (! div_content) { return; }

        div_menu = window.document.getElementById("dmd-menu");

        var pages = div_content.getElementsByClassName("dmd-page");
        for (var i = 0; i < pages.length; i++) {
            var name = pages[i].getAttribute("title");

            if (! name) { continue; }

            if (pages[i].tagName.toLowerCase() === "pre") {
                pages_md[name] = pages[i].innerHTML || "";
            } else if (pages[i].tagName.toLowerCase() === "a") {
                pages_url[name] = pages[i].getAttribute("href") || "";
            } else {
                pages_md[name] = "Cannot display '" + name + "' page.";
            }

            if (default_page_name === null) {
                default_page_name = name;
            }

            if (div_menu) {
                var linode = window.document.createElement("li");
                var anode = window.document.createElement("a");
                anode.setAttribute("href", "#" + name);
                anode.innerHTML = name;
                linode.appendChild(anode);
                div_menu.appendChild(linode);
                div_menu.appendChild(window.document.createTextNode("\n"));
            }
        }

        // div_content.innerHTML = "";
        while (div_content.hasChildNodes()) {
            div_content.removeChild(div_content.lastChild);
        }

        onHashChangeListener();
    };

    function getCurrentHash(){
        var h = window.content.location.hash;
        if (h) {
            return (h.substr(1) || "");
        }
        return "";
    }

    function onHashChangeListener(){
        if (! div_content) { return; }

        loadContent(getCurrentHash() || default_page_name);
    }

    function convertWikiLinks(str){
        if (str) {
            return str.replace(/\[\[([\w-/.]+)\]\]/g, '<a href="#$1">$1</a>');
        }
        return "";
    }

    function loadContent(name){
        if (name) {
            if (name in pages_md){
                div_content.innerHTML =
                    marked(convertWikiLinks(pages_md[name] || ""));
            } else if (name in pages_url) {
                fetchContent(pages_url[name], function(xhr){
                    pages_md[name] = xhr.responseText || "";
                    div_content.innerHTML =
                        marked(convertWikiLinks(pages_md[name] || ""));
                });
            } else {
                div_content.innerHTML = "No content found for '" + name + "'.";
            }
        } else {
            clearContent();
        }
        // getContent(name + ".md", function(xhr){
        //     // content available when xhr.status === 0 ...??
        //     // alert(xhr.status);
        //     // alert(xhr.responseText);
        //     div_content.innerHTML = marked(xhr.responseText);
        // });
    }

    function clearContent(){
        div_content.innerHTML = "";
    }

    function fetchContent(name, callback){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", name, true);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                callback(xhr);
            }
        };
        if (xhr.overrideMimeType) {
            xhr.overrideMimeType('text/plain; charset=UTF-8');
        }
        xhr.send(null);
    }

    return {
        init : init
    };
})();

DMD.init();
