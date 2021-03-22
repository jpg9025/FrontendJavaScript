import dataService from '../services/DataService.js';
import BaseController from './BaseController.js';

export default class NewAdvertismentOrLoginController extends BaseController {
    constructor (element) {
        super(element);
        this.checkIfUserIsLogged();
    }

    async checkIfUserIsLogged() {
        const userIsLogged = await dataService.isUserLogged();
        if (userIsLogged) { // Show new advertisment button
            const newAdvertismentButton = this.element.querySelector('.new-advertisment-button');
            newAdvertismentButton.classList.remove('is-hidden');
        } else { // Show loggin or register button
            const loginRegisterButtons = this.element.querySelector('.login-register-buttons');
            loginRegisterButtons.classList.remove('is-hidden');
        }
    }
}