const libPictViewClass = require('pict-view');

const default_configuration = 
{
	"RenderOnLoad": true,
	"DefaultRenderable": "PDFJS-Wrap",
	"DefaultDestinationAddress": "#PDFJS-Container-Div",
	"ViewAddress": 'PictSectionPDFJS',
	"theme": "dark",
	"styles": /*css*/``,
    "pdfUrl": "",
    "pdfjsPath": "./pdfjs-dist",
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
                                    viewer-path="${ this.options.pdfjsPath }"
									viewer-css-theme="${ this.options?.theme?.toUpperCase() || 'DARK' }"
									viewer-extra-styles="${ this.options?.styles }
															#editorStampButton {
																display: none;
															}
															#editorInkButton {
																display: none;
															}
															#editorFreeTextButton {
																display: none;
															}
															#editorHighlightButton {
																display: none;
															}
														"
									>
                                </pdfjs-viewer-element>`;
        this.pict.ContentAssignment.assignContent(`${ this.options?.DefaultDestinationAddress } > #pdfjs-injectable`, viewerEl);
	}

	/*
		Gets the current active page of the pdf viewer.
	*/
	getCurrentPage()
	{
		// Note: Getting the pagenumber requires getting the shadow dom attached to the viewer and then querying the document object of the frame's content window.
		return document.querySelector('pdfjs-viewer-element')?.shadowRoot?.querySelector('iframe')?.contentWindow?.document?.getElementById('pageNumber')?.value || 1;
	}

}

module.exports = PictSectionPDFJS;
module.exports.default_configuration = default_configuration;

