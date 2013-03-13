
(function() {
  var version = '2.4';
  function addScript(src, onload) {
      var script = document.createElement('SCRIPT');
      script.type = 'text/javascript';
      script.src = chrome.extension.getURL(src);
      document.getElementsByTagName('head')[0].appendChild(script);
  }

  var match = window.location.href.match(/\/projects\/([\da-z_]+)\/cards\/grid?.*$/);
  if (match) {
      console.log("matched mingle grid view")
      addScript("/jquery-1.9.1.min.js");
      addScript("/live_wall.js");
  }
})();
