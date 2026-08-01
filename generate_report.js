const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log("1. Generating SVG QR codes...");
    const githubQR = await QRCode.toString('https://github.com/melvindeepesh-boop/SECOND-LIFE', {
      type: 'svg',
      margin: 1,
      color: {
        dark: '#00F5FF',
        light: '#00000000'
      }
    });

    const websiteQR = await QRCode.toString('https://second-kohl-ten.vercel.app/', {
      type: 'svg',
      margin: 1,
      color: {
        dark: '#10B981',
        light: '#00000000'
      }
    });

    console.log("2. Reading HTML template...");
    let htmlContent = fs.readFileSync(path.join(__dirname, 'report_template.html'), 'utf8');

    console.log("3. Injecting QR codes into placeholders...");
    htmlContent = htmlContent.replace(
      '<div class="qr-box" id="github-qr-placeholder">\n            <!-- Inject GitHub SVG QR Code here -->\n          </div>',
      `<div class="qr-box" id="github-qr-placeholder">${githubQR}</div>`
    );
    htmlContent = htmlContent.replace(
      '<div class="qr-box" id="website-qr-placeholder">\n            <!-- Inject Website SVG QR Code here -->\n          </div>',
      `<div class="qr-box" id="website-qr-placeholder">${websiteQR}</div>`
    );

    console.log("4. Launching Puppeteer browser...");
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    console.log("5. Loading HTML content and assets...");
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    console.log("6. Waiting for Google Fonts to render...");
    await page.evaluateHandle('document.fonts.ready');

    console.log("7. Compiling and printing 27-page PDF...");
    await page.pdf({
      path: 'project_report.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    });

    await browser.close();
    console.log("8. SUCCESS! The report has been written to 'project_report.pdf'.");
  } catch (err) {
    console.error("PDF generation failed:", err);
  }
})();
