import { advertismentView } from '../views.js';
import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class SelectController extends BaseController {
    constructor(element) {
        super(element);
        this.element.addEventListener('change', (event) => {
            const selectedOp = event.target.value;
            const advertisments = dataService.getAdvertisments();
            if (advertisments.onSale !== selectedOp) {
                advertisments.classList.add('hidden');
            } else {
                advertisments.classList.remove('hidden')
            }      
        })
    }
}