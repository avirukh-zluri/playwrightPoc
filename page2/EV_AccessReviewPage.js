export class EV_AccessReview{
    constructor(page){
        this.page = page;
    }
    async goToEVAccessReview(){
        await this.page.getByRole('button', { name: 'Access Reviews Access Reviews' }).click();
        
    }
    async navigateEVAccessReview(){
        await this.page.getByRole('link', { name: 'Upcoming' }).click();
        await this.page.getByRole('link', { name: 'Completed' }).click();
    }
}