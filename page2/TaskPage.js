const fs = require('fs');

export class TaskPage {
    constructor(page){
        this.page = page;
        this.clickOnTasks = "//button[@type='button']//span[contains(text(),'Tasks')]"
    }
    async goToTasks() {
        const apiCalls = [];
        const listener = request => {
            if (request.url().includes('/tasks')) {
                apiCalls.push({
                    url: request.url(),
                    method: request.method(),
                    headers: request.headers(),
                    postData: request.postData()
                });
            }
        };

        // Start listening to network requests
        this.page.on('request', listener);

        // Perform the action
        await this.page.locator(this.clickOnTasks).click();

        // Wait for network idle to ensure all requests are captured
        await this.page.waitForLoadState('networkidle');

        // Stop listening to network requests
        this.page.off('request', listener);

        // Process the captured requests
        const logs = apiCalls.map(call => {
            let curlCommand = `curl -X ${call.method} '${call.url}'`;
            
            // Add headers to the cURL command
            for (const [key, value] of Object.entries(call.headers)) {
                curlCommand += ` -H '${key}: ${value}'`;
            }
            
            // Add post data if present
            if (call.postData) {
                curlCommand += ` -d '${call.postData}'`;
            }
            
            return {
                url: call.url,
                body: call.postData,
                method: call.method,
                headers: call.headers,  
                curlCommand
            };
        });

        // Write the logs to a file
        fs.writeFileSync('TaskCurls.json', JSON.stringify(logs, null, 2));

        console.log('Network logs for Tasks navigation have been saved to task_navigation_logs.json');
    }

    async goToTasks() {
        const apiCalls = [];
        const listener = async (route) => {
            const request = route.request();
            if (request.url().includes('/tasks')) {
                let postData;
                if (['POST', 'PUT', 'PATCH'].includes(request.method())) {
                    postData = request.postData();
                    if (!postData) {
                        // If postData is null, try to get the request body
                        const requestBody = await request.postDataBuffer();
                        postData = requestBody ? requestBody.toString() : null;
                    }
                }

                apiCalls.push({
                    url: request.url(),
                    method: request.method(),
                    headers: request.headers(),
                    body: postData
                });
            }
            await route.continue();
        };

        // Start intercepting network requests
        await this.page.route('**', listener);

        // Perform the action
        await this.page.locator(this.clickOnTasks).click();

        // Wait for network idle to ensure all requests are captured
        await this.page.waitForLoadState('networkidle');

        // Stop intercepting network requests
        await this.page.unroute('**');

        // Process the captured API calls
        const logs = apiCalls.map(call => {
            let curlCommand = `curl -X ${call.method} '${call.url}'`;
            
            // Add headers to the cURL command
            for (const [key, value] of Object.entries(call.headers)) {
                curlCommand += ` -H '${key}: ${value}'`;
            }
            
            // Add body data if present
            if (call.body) {
                curlCommand += ` -d '${call.body}'`;
            }
            
            return {
                // url: call.url,
                // method: call.method,
                // headers: call.headers,
                // body: call.body,
                curlCommand
            };
        });

        // Write the logs to a file
        fs.writeFileSync('task_api_calls.json', JSON.stringify(logs, null, 2));

        console.log('API calls for Tasks page have been saved to task_api_calls.json');
    }
}