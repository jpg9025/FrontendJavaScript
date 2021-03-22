import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class DeleteButtonController extends BaseController {
    constructor(element, advertisment) {
        super(element);
        this.element.addEventListener('click', async ev => {
            const deleteConfirmed = confirm('Are you sure that you want to delete this advertisment?');
            if (deleteConfirmed) {
                await dataService.deleteAdvertisment(advertisment);
                this.publish(this.events.ADD_DELETED, advertisment);
            }
        })
    }
}