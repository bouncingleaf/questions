var http = require('http');

// Event handler, really: creates a server to handle http requests.
http.createServer(function (req, res) {
    // Normalize URL
    var path = req.url.replace(/\/?(?:\?.*)? $/, ''). toLowerCase();
    switch (path) {
        case '':
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Home');
            break;
        case '/about':
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('About');
            break;
        default:
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('Not found');
    }
}).listen(3000);

console.log('Server started on localhost:3000; press ctrl-C to terminate...');
