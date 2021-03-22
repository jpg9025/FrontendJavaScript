import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import RegisterFormController from './controllers/RegisterFormController.js';
import TitleController from './controllers/TitleController.js';

window.addEventListener('DOMContentLoaded', async () => {
    // Loader Controller
    const loader = document.querySelector('.lds-roller');
    const loaderController = new LoaderController(loader);

    // Error Controller
    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);

    // Web Titles
    const title = document.querySelector('title');
    const titleController = new TitleController(title);
    const header = document.querySelector('.web-title');
    const headerController = new TitleController(header);
    const footer = document.querySelector('.footer-title');
    const footerController = new TitleController(footer);

    // Register Form Controller
    const formElement = document.querySelector('form');
    const formController = new RegisterFormController(formElement);
});
