var mlw = ("object" == typeof exports) ? exports : {};

if ("object" == typeof exports) {
    jQuery = require('jquery');
}

mlw.feeds = (function($) {
    var extractURL = function(gridViewUrl) {
        var matches = gridViewUrl.match(/\/projects\/([^\/]+)/i);
        if(!matches) {
            return null;
        }
        var projectId = matches[1];
        return gridViewUrl.replace(/\/projects\/.*$/i, "/api/v2/projects/" + projectId + "/feeds/events.xml");
    };

    return {
        extractURL: extractURL
    }
})(jQuery);


if( "object" == typeof document ) {
    jQuery(document).ready(function($) {
        var feedUrl = mlw.feeds.extractURL(window.location.href);
        console.log("feedsUrl = " + feedsUrl);
    });
}
