module.exports = (function () {
    'use strict';

    var fs    = require('fs'),
        path  = require('path'),
        rs    = require('robotskirt');

    // The constructor function that is exported from this module.
    function MarkdownCompiler() {
    }

    // A function that will be used to override the HTML table rendering so we
    // can add the bootstrap classes for tables.
    function renderTable(header, body) {
        var tableClasses,
            table;

        tableClasses = ['table', 'table-nonfluid-ra', 'table-bordered',
            'table-condensed', 'table-striped'].join(' ');

        table = '<table class="' + tableClasses + '"><thead>\n';

        if (header) {
            table = table + header;
        }

        table = table + '</thead><tbody>\n';
        if (body) {
            table = table + body;
        }

        table = table + '</tbody></table>\n';

        return '<div class="table-responsive">\n' + table + '</div>\n';
    }

    // Compiles a markdown file into a HTML document.
    // sourcefile (string)   The path to the input markdown file
    // callback              Callback that is called upon completion.
    //                       If, err is falsy, results will be the path to the
    //                       output HTML file.
    MarkdownCompiler.prototype.compileToHtml =
        function (sourceFile, callback) {
        var dirName,
            baseName,
            extName,
            sourceFileContents,
            outputFile,
            outputFileContents,
            renderer,
            parser;

        dirName = path.dirname(sourceFile);
        extName = path.extname(sourceFile);
        baseName = path.basename(sourceFile, extName);
        outputFile = path.join(dirName, baseName + '.html');

        sourceFileContents = fs.readFileSync(sourceFile, {encoding: 'utf8'});
        renderer = new rs.HtmlRenderer();
        renderer.table = renderTable;

        // Use the GFM extensions for tables, autolinking, fenced code, and
        // strikethrough.  Note that we are not using GFM linebreaks.  Instead,
        // we prefer the ability to break lines at column 80 without creating a
        // new paragraph.
        parser = new rs.Markdown(renderer, [rs.EXT_TABLES, rs.EXT_AUTOLINK,
            rs.EXT_FENCED_CODE, rs.EXT_STRIKETHROUGH]);
        outputFileContents = parser.render(sourceFileContents);
        fs.writeFileSync(outputFile, outputFileContents, {encoding: 'utf8'});

        callback(undefined, outputFile);
    };

    return MarkdownCompiler;
})();
