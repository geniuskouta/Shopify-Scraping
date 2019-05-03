const puppeteer = require('puppeteer');

(async function main (){
	try{

		const browser = await puppeteer.launch({ headless: false});
		const page = await browser.newPage();
		page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36');

		await page.goto('https://experts.shopify.com');
		await page.waitForSelector('.section');
		const sections = await page.$$('.section');

		
		for (let i = 0; i< sections.length; i++) {


		await page.goto('https://experts.shopify.com');
		await page.waitForSelector('.section');
		const sections = await page.$$('.section');
			const section = sections[i];
			const button = await section.$('a.marketing-button');
			const buttonName = await page.evaluate(button => button.innerText, button);
			console.log('\n\n');
			console.log(buttonName);
			button.click();
			await page.waitForSelector('#ExpertsResults');
			const lis = await page.$$('#ExpertsResults > li');

			//loop over each Li on the inner page
			for (const li of lis){
				const name = await li.$eval('h2', h2 => h2.innerText);
				console.log('name:', name);
			}
		}

	}catch(e){
		console.log('our error', e);
	}
})();