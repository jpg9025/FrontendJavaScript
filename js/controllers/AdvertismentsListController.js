import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { advertismentView } from '../views.js';
import DeleteButtonController from './DeleteButtonController.js';
import AdvertismentDetailController from './AdvertismentDetailController.js';

const BASE_URL = 'http://127.0.0.1:8000';

export default class AdvertismentsListController extends BaseController {

    constructor(element){
        super(element);
        this.subscribe(this.events.SEARCH, query => {
            this.loadAdvertisments(query);
        });
        this.subscribe(this.events.ADD_DELETED, ev => {
            this.loadAdvertisments();
        })
    }

    render(advertisments) {
        this.element.innerHTML = '';  // Delete all the advertisments that could appear, we need it empty to call later loadAdvertisments and avoid duplication of info
        for (const advertisment of advertisments) {
            const advDetailController = new AdvertismentDetailController(advertisment);
            const cardWrapper = document.createElement('a');
            cardWrapper.classList.add('card-wrapper');
            cardWrapper.setAttribute('href','detail.html');
            //cardWrapper.setAttribute('href',`${BASE_URL}/api/messages/${advertisment.id}`);
            cardWrapper.setAttribute('target',"blank");
            cardWrapper.innerHTML = advertismentView(advertisment);
            const deleteButton = cardWrapper.querySelector('button');
            if (deleteButton) {
                new DeleteButtonController(deleteButton, advertisment);
            }
            this.element.appendChild(cardWrapper);
        }
    }

    // loadAdvertisments must be async or run with promisses in order to ensure that the HTML contect is chargued even with a connection problem
    async loadAdvertisments(query=null) {
        this.publish(this.events.START_LOADING, {});
        try {
            const advertisments = await dataService.getAdvertisments(query);
            this.render(advertisments);
        } catch (error) {
            console.error(error);
            this.publish(this.events.ERROR, error);
        } finally { // Finally includes code that will be chargued always, if the code of the try run or no (catch)
            this.publish(this.events.FINISH_LOADING, {});
        }
    }

}
