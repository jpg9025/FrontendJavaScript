import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class AdvertismentController extends BaseController {

    constructor(element) {
        super(element);
        this.moveToAddDetail();
    }

    moveToAddDetail() {
        try {
            const addSelected = this.element.querySelector('.card-Wrapper');
            addSelected.addEventListener('click', event => {
                console.log('tirando billetes de cien');
                window.location.href = '/advertismentDetail.html';
            })
        } catch (error) {
            //throw new Error(error.status);
        }
    }
}