const libPictViewClass = require('pict-view');

const default_configuration = 
{
	"RenderOnLoad": true,
	"DefaultRenderable": "PDFJS-Wrap",
	"DefaultDestinationAddress": "#PDFJS-Container-Div",
	"ViewAddress": 'PictSectionPDFJS',
    "pdfUrl": "",
    "pdfjsPath": "/pdfjs-dist",
	"Templates": [
		{
			"Hash": "PDFJS-Container",
			"Template": /*html*/`
                <div id="pdfjs-injectable" class="injectable-size">
                </div>
                <style>
                    .injectable-size {
                        height: 100%;
                    }
                </style>
			`
		}
	],

	"Renderables": [
		{
			"RenderableHash": "PDFJS-Wrap",
			"TemplateHash": "PDFJS-Container",
			"DestinationAddress": "#PDFJS-Container-Div",
			"RenderType": "replace"
		}
	],

	"TargetElementAddress": "#PDFJS-Container-Div"
}

class PictSectionPDFJS extends libPictViewClass
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, default_configuration, pOptions);

		super(pFable, tmpOptions, pServiceHash);
	}

	onBeforeInitialize()
	{
		super.onBeforeInitialize();
	}

	onAfterRender()
	{
		const viewerEl = /*html*/`<pdfjs-viewer-element 
                                    class="injectable-size"
                                    src="${ this.options.pdfUrl }"
                                    viewer-path="${ this.options.pdfjsPath }">
                                </pdfjs-viewer-element>`;
        this.pict.ContentAssignment.assignContent("#pdfjs-injectable", viewerEl);
	}

}

module.exports = PictSectionPDFJS;
module.exports.default_configuration = default_configuration;

