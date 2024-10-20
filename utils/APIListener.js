const { chromium } = require('playwright');
const fs = require('fs');

class APIListener {
  constructor() {
    this.apiCalls = [];
  }

  async startListening(page) {
    await page.route('**', async (route) => {
      const request = route.request();
      if (this.isAPICall(request)) {
        const curl = this.generateCurl(request);
        this.apiCalls.push({
          url: request.url(),
          method: request.method(),
          headers: request.headers(),
          postData: request.postData(),
          curl: curl
        });
      }
      await route.continue();
    });
  }

  isAPICall(request) {
    // Capture calls that include '/api/' or have the base URL 'https://api.zluri.dev'
    return request.url().startsWith('https://api.zluri');
  }

  generateCurl(request) {
    let curl = `curl -X ${request.method()} "${request.url()}"`;
    
    for (const [key, value] of Object.entries(request.headers())) {
      curl += ` -H "${key}: ${value}"`;
    }

    if (request.postData()) {
      // Escape double quotes in the post data
      const escapedData = request.postData().replace(/"/g, '\\"');
      curl += ` -d "${escapedData}"`;
    }

    return curl;
  }

  saveAsCurls(filePath) {
    const formattedCurls = this.apiCalls.map(call => {
      let curl = call.curl.trim();
      
      // Replace double quotes with single quotes for the URL
      curl = curl.replace(/^(curl -X \w+) "(https?:\/\/[^"]+)"/, "$1 '$2'");
      
      // Format headers
      curl = curl.replace(/ -H "([^"]+)"/g, ' -H \'$1\'');
      
      // Format data: remove outer quotes and escape inner quotes
      curl = curl.replace(/ -d "(.+)"$/, (match, p1) => {
        // Unescape any already escaped quotes
        let unescaped = p1.replace(/\\"/g, '"');
        // Now escape all quotes
        let escaped = unescaped.replace(/"/g, '\\"');
        return ` -d "${escaped}"`;
      });
      
      return curl;
    }).join('\n\n');

    fs.writeFileSync(filePath, formattedCurls);
  }

  saveAsPostmanCollection(filePath) {
    const collection = {
      info: {
        name: "Generated API Collection",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
      },
      item: this.apiCalls.map(call => {
        return {
          name: `${call.method} ${call.url}`,
          request: {
            method: call.method,
            header: Object.entries(call.headers).map(([key, value]) => ({ key, value })),
            url: {
              raw: call.url,
              protocol: call.url.split('://')[0],
              host: call.url.split('://')[1].split('/')[0].split('.'),
              path: call.url.split('://')[1].split('/').slice(1)
            },
            body: call.postData ? {
              mode: 'raw',
              raw: call.postData,
              options: {
                raw: {
                  language: 'json'
                }
              }
            } : undefined
          }
        };
      })
    };

    fs.writeFileSync(filePath, JSON.stringify(collection, null, 2));
  }

}

module.exports = APIListener;