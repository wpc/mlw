require('jquery')
var mlw = require('./live_wall.js');

exports.feeds = {
    extract_url_from_grid_view_url: function(test) {
        var url = mlw.feeds.extractURL("https://mingle.com/projects/foo/cards/grid?color_by=type");
        test.equal(url,  "https://mingle.com/api/v2/projects/foo/feeds/events.xml")
        test.done();
    },

    extract_url_from_url_with_context_path: function(test) {
        var url = mlw.feeds.extractURL("https://mingle.com/sbb/projects/foo/cards/grid?color_by=type");
        test.equal(url,  "https://mingle.com/sbb/api/v2/projects/foo/feeds/events.xml")
        test.done();
    },

    extract_url_should_return_null_if_url_is_not_a_grid_view_url: function(test) {
        var url = mlw.feeds.extractURL("https://go01.com/go/home")
        test.equal(url, null);
        test.done();
    }

}
