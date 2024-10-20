export class EV_AccessRequest{
    constructor(page){
        this.page = page;
    }
    async goToEVAccessRequest(){
        await this.page.getByRole('button', { name: 'App Requisition Access' }).click();
        
    }
    async navigateEVAccessRequest(){
        await this.page.getByRole('link', { name: 'Approvals' }).click();
    }
}
