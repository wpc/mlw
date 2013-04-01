var mlw = require('./live_wall.js'),
jQuery = require('jquery'),
http = require('http'),
fs = require('fs');

exports.mingle = {
    extract_feed_url_from_grid_view_url: function(test) {
        var url = mlw.mingle.extractFeedUrl("https://mingle.com/projects/foo/cards/grid?color_by=type");
        test.equal(url,  "https://mingle.com/api/v2/projects/foo/feeds/events.xml")
        test.done();
    },

    extract_feed_url_from_url_with_context_path: function(test) {
        var url = mlw.mingle.extractFeedUrl("https://mingle.com/sbb/projects/foo/cards/grid?color_by=type");
        test.equal(url,  "https://mingle.com/sbb/api/v2/projects/foo/feeds/events.xml")
        test.done();
    },

    extract_feed_url_should_return_null_if_url_is_not_a_grid_view_url: function(test) {
        var url = mlw.mingle.extractFeedUrl("https://go01.com/go/home")
        test.equal(url, null);
        test.done();
    }
}


exports.feeds = {
    setUp: function(callback) {
      //  var data = this.data = {latest: };
        // var feedLatestPage = "test/data/latest.atom.xml"
        // this.server = http.createServer(function (req, res) {
        //     console.log('*********>> request received');
        //     fs.readFile(this.feedLatestPage, 'utf8', function(error, data) {
        //         if(error) {
        //             res.writeHead(404);
        //             res.end(JSON.stringify(err));
        //         }
        //         res.writeHead(200, {'Content-Type': 'application/atom+xml'});
        //         res.end(data);
        //     });
        // });

        // this.server.listen(8124);

        mlw.feeds.init("http://localhost:3000/api/v2/projects/first/feeds/events.xml", {
            username: 'admin',
            password: 'pass'
        });
        callback();
    },

    poll_feeds_get_new_entries: function(test) {
        mlw.feeds.poll(function(entries) {});
        test.done();
    }
}
