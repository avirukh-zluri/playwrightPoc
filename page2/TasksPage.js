export class TaskPage {
    constructor(page){
        this.page = page;
        this.clickOnTasks = "//button[@type='button']//span[contains(text(),'Tasks')]"
    }
    async goToTasks(){
        await this.page.locator(this.clickOnTasks).click();
    }
}