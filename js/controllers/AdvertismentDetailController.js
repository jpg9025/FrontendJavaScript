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

    render (advertisment) {
        this.element.innerHTML = '';  // Delete all the advertisments that could appear, we need it empty to call later loadAdvertisments and avoid duplication of info
        this.element.innerHTML = advertismentDetailView(advertisment);
        const advWrapper = document.createElement('div');
        advWrapper.classList.add('adv-wrapper');
    }

    async loadAvertismentDetail(id) {
        this.publish(this.events.START_LOADING, {});
        try {
            const advertisment = await dataService.getAdvertismentById(id);
            this.render(advertisment);
        } catch (error) {
            console.error(error);
            this.publish(this.events.ERROR, error);
        } finally { // Finally includes code that will be chargued always, if the code of the try run or no (catch)
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}