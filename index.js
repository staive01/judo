var http = require('http');
var Hapi = require('hapi');
var Hoek = require('hoek');
var parser = require('xml2json');

var server = new Hapi.Server();
server.connection({ port: 8080 });

server.register(require('vision'), function (err) {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: './templates'
    });
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});

server.route({
    method: 'GET',
    path: '/ajax/{name}',
    handler: function (request, reply) {
      http.request('http://www.lequipe.fr/rss/actu_rss_Judo.xml', function(res) {
        var str = "";
        res.on('data', function (chunk) {
          str += chunk;
        });
        res.on('end', function () {
          reply(parser.toJson(str));
        });
      }).end();
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

