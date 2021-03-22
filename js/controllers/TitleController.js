import BaseController from './BaseController.js';
import { webTitle } from '../views.js';

export default class HeaderController extends BaseController {
    constructor(element) {
        super(element);
        this.showWebTitle();
    };

    showWebTitle() {
        this.element.innerHTML = webTitle();
    };
}