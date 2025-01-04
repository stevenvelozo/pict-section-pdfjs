const libPictApplication = require('pict-application');

const libPictSectionPDFJS = require('../../source/Pict-Section-PDFJS.js');

class ExampleFileView extends libPictSectionPDFJS
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}
}

class PostcardApplication extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.pict.addView('ExampleFileView', Object.assign(libPictSectionPDFJS.default_configuration, { pdfUrl:'/pdfjs-dist/web/compressed.tracemonkey-pldi-09.pdf' }), ExampleFileView);
		this.pict.views.ExampleFileView.render();
	}
};

module.exports = PostcardApplication

module.exports.default_configuration = ({
	"Name": "A Simple PDF Viewer application",
	"Hash": "File",

	"MainViewportViewIdentifier": "ExampleFileView",

	"pict_configuration":
		{
			"Product": "File-Application",

			"DefaultAppData": {
			}
		}
});