import BaseController from './BaseController.js';

// Do not use the method toggle - that switch from one situation to other like an interruptor - it could throw an error with async
export default class LoaderController extends BaseController {

    constructor(element) {
        super(element);
        this.subscribe(this.events.START_LOADING, () => {
            this.showLoading();
        });
        this.subscribe(this.events.FINISH_LOADING, () => {
            this.hideLoading();
        });
    }

    showLoading() {
        this.element.classList.remove('hidden'); // remove the status hidden
    }

    hideLoading() {
        this.element.classList.add('hidden');
    }

}
