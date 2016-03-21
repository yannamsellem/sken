/*Services requiring*/

var moment = require('moment'),
    fs     = require('fs'),
    path   = require('path'),
    morgan = require('morgan');

/*Class definition*/

    function ErrorHandler() {}

/*Private variable definitions*/

    var log = {
        pathDirectory: path.join(global.paths.root, 'log'),
        request: 'error.request.log',
        access: 'access.log'
    };

/*Public methods definition*/

    ErrorHandler.prototype.logError = logError;
    ErrorHandler.prototype.errorHandler = errorHandler;

/*Public static methods definition*/

    ErrorHandler.set = set;

/*Exports*/
module.exports = ErrorHandler;

/*Public methods definitions*/

    function logError(error, request, response, next) {
        var filePath = path.join(log.pathDirectory, log.request);
        var text = '[' + moment().format('YYYY.MM.DD - h:mm:ss') + '] - ';
        text += (error.status || 500) + ' - ' + error.stack + '\n\n';

        if (fs.existsSync(filePath)) {
            fs.appendFileSync(filePath, text, 'utf8');
        } else {
            fs.writeFileSync(filePath, text, 'utf8');
        }

        next(error);
    }

    function errorHandler(error, request, response, next) {
        response.status(error.status || 500).json({ message: error.message });
    }

/*Public static methods definition*/

    function set(app) {
        var errorHandler = new ErrorHandler();
        // app.use(errorHandler.logError);
        app.use(errorHandler.errorHandler);
    }