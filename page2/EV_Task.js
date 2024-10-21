export class EV_Task{
    constructor(page){
        this.page = page;
    }
    async goToEVTask(){
        await this.page.getByRole('button', { name: 'Tasks' }).waitFor({ state: 'visible' });
        await this.page.getByRole('button', { name: 'Tasks' }).click();

    }
}