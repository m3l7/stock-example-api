let express = require('express')
    , http = require('http')
    , path = require('path')
    , basicAuth = require('express-basic-auth')
    , app = express();

// all environments
app.set('port', process.env.PORT || 16020);

app.use([express.static(path.join(__dirname, '../../../docs/API/'))]);

http.createServer(app).listen(app.get('port'), function () {
    console.log(`Doc http server listening on port %d`, app.get('port'));
});