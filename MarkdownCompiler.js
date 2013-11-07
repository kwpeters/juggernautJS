module.exports = (function () {
    'use strict';

    var path  = require('path'),
        rs    = require('robotskirt');

    // The constructor function that is exported from this module.
    function MarkdownCompiler(grunt) {
        this.grunt = grunt;
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

        sourceFileContents = this.grunt.file.read(sourceFile);
        renderer = new rs.HtmlRenderer();
        renderer.table = renderTable;

        // Use the GFM extensions for tables, autolinking, fenced code, and
        // strikethrough.  Note that we are not using GFM linebreaks.  Instead,
        // we prefer the ability to break lines at column 80 without creating a
        // new paragraph.
        parser = new rs.Markdown(renderer, [rs.EXT_TABLES, rs.EXT_AUTOLINK,
            rs.EXT_FENCED_CODE, rs.EXT_STRIKETHROUGH]);
        outputFileContents = parser.render(sourceFileContents);
        this.grunt.file.write(outputFile, outputFileContents);

        callback(undefined, outputFile);
    };


    // Compiles a markdown file into a PDF document.
    // sourceFile (string)   The path to the input markdown file
    // callback(err, result) Callback that is called upon completion.
    //                       If err is falsy, results will be the path to the
    //                       output PDF file.
    MarkdownCompiler.prototype.compileToPdf = function (sourceFile, callback) {
        var sourceDirName,
            sourceBaseName,
            sourceExtName,
            outputFile,
            pdfTemplateFile,
            pandocArgs,
            pandocProcess;

        pdfTemplateFile = path.join('..', 'pdf_template.tex');

        sourceDirName = path.dirname(sourceFile);
        sourceExtName = path.extname(sourceFile);
        sourceBaseName = path.basename(sourceFile, sourceExtName);
        outputFile = sourceBaseName + '.pdf';

        pandocArgs = ['--template=' + pdfTemplateFile,
                      '--latex-engine=xelatex',
                      sourceBaseName + sourceExtName,
                      '-o', outputFile];

        pandocProcess = this.grunt.util.spawn(
            {
                cmd: 'pandoc',
                args: pandocArgs,
                opts: {cwd: sourceDirName}
            },
            function (error, result, code) {
                if (error || (code !== 0)) {
                    callback(
                        new Error('Failed to generate ' + outputFile + ': ' +
                                  String(result)),
                        null);
                } else {
                    callback(undefined, path.join(sourceDirName, outputFile));
                }

            }
        );
    };

    return MarkdownCompiler;
})();
