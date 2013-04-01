var mlw = ("object" == typeof exports) ? exports : {};

if ("object" == typeof exports) {
    jQuery = require('jquery');
}

mlw.mingle = (function() {
    function extractFeedUrl(projecturl) {
        var matches = projecturl.match(/\/projects\/([^\/]+)/i);
        if(!matches) {
            return null;
        }
        var projectId = matches[1];
        return projecturl.replace(/\/projects\/.*$/i, "/api/v2/projects/" + projectId + "/feeds/events.xml");
    }

    return {
        extractFeedUrl:extractFeedUrl
    }
})();



mlw.feeds = (function(jQuery, setTimeout) {
    var _latestPage = null;
    var _reqSettings = null;
    var _latestEntryId = null;

    var Entry = function(element) {
        return {
            id: function() { return element.find('id').text(); }
        };
    }


    var EntryCollection = function(elementCollection) {
        return {
            first: function() { return Entry(elementCollection.first()); },
            each: function(iterator) {
                elementCollection.each(function() {
                    return iterator(Entry(jQuery(this)));
                });
            }
        };
    };

    function request(url, delegate, options) {
        var s = {url: url,
		type: "GET",
		dataType: "text",
		async: true,
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log("!!!!!!!!!!!!!!")
                    console.log(errorThrown)
                    delegate(null)
                },
                success: function(xml) {
                    var document = jQuery(jQuery.parseXML(xml));
                    var entryElements = document.find('feed entry');
                    delegate(EntryCollection(entryElements));
                }};

        jQuery.extend(s, _reqSettings);
        jQuery.extend(s, options);
        jQuery.ajax(s);
    }

    function poll(delegate, interval) {
        var continuePolling = function() {
            setTimeout(function() { poll(delegate, interval); }, interval);
        }

        request(_latestPage, function(entries) {
            var newEntries = [];
            if (entries) {
                var latestEntryId = entries.first().id();

                entries.each(function(entry) {
                    if( entry.id() === _latestEntryId ) {
                       _latestEntryId = latestEntryId;
                        delegate(newEntries);
                        return false;
                    } else {
                        newEntries.push(entry);
                    }

                })
            }
            continuePolling();
        });
    }

    function init(url, reqSettings) {
        _latestPage = url;
        _reqSettings = reqSettings;
        request(_latestPage, function(entries) {
            _latestEntryId = entries.first().id();
        }, {async: false});
    }

    return {
        init: init,
        poll: poll
    }

})(jQuery, setTimeout);



if( "object" == typeof document ) {
    jQuery(document).ready(function($) {
        var url  = mlw.mingle.extractFeedUrl(window.location.href)
        if (url != null) {
            mlw.feeds.init(url);
            mlw.feeds.poll(function(newEntries) {
                $.map(newEntries, function(e) { console.log( "new:" + e.id()); });
            }, 10000);
        }
    });
}
