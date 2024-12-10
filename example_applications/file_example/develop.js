const https = require('follow-redirects').https;
const fs = require('fs');
const util = require('node:util');
const path = require('path');
const exec = util.promisify(require('node:child_process').exec);
const extract = require('extract-zip');

// PDF.js prebuilt package.
const fileUrl = 'https://github.com/mozilla/pdf.js/releases/download/v4.9.155/pdfjs-4.9.155-dist.zip';
const destination = path.resolve('pdfjs-4.9.155-dist.zip');
const outputDestination = path.resolve('./dist/pdfjs-dist');

const file = fs.createWriteStream(destination);


async function build()
{
	const { stdout, stderr } = await exec('npx quack build && npx quack copy');
	console.log('stdout:', stdout);
  	console.error('stderr:', stderr);
	await https.get(fileUrl, (response) => {
		console.log('response: ', response.statusCode);
		response.pipe(file);
		file.on('finish', () => {
			file.close(async () => {
				console.log('destination: ', destination);
				await extract(destination, { dir: outputDestination });
				console.log('Zip File extracted.');
			});
		});
	}).on('error', (err) => {
		fs.unlink(destination, () => {
			console.error('Error downloading file:', err);
		});
	});
} 

build();