import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { advertismentDetailView } from '../views.js';

export default class AdvertismentDetailController extends BaseController {
    constructor(element) {
        super(element)
        this.subscribe(this.events.ADD_DELETED, ev => {
            this.loadAdvertismentDetail();
        })
    }
    
    loadAvertismentDetail(advertisment) {
        this.element.innerHTML = advertismentDetailView(advertisment);
    }
}