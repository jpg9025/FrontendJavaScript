import AdvertismentsListController from './controllers/AdvertismentsListController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewAdvertismentOrLoginController from './controllers/NewAdvertismentOrLoginController.js'
import SearchController from './controllers/SearchController.js';
import TitleController from './controllers/TitleController.js';
import LogOutController from './controllers/LogOutController.js';
import SelectController from './controllers/SelectController.js';

// browser publish the even DOMContentLoaded throw window when all HTML is loaded
window.addEventListener('DOMContentLoaded', async (event) => {
  // Each controller must control an area of the HTML

  // LoaderController is the controller on charge of <div class="lds-roller"></div>
  const loader = document.querySelector('.lds-roller');
  const loaderController = new LoaderController(loader);
  // create controller and give it the element that include the selection of the HTML 

  // Web Titles
  const title = document.querySelector('title');
  const titleController = new TitleController(title);
  const header = document.querySelector('.web-title');
  const headerController = new TitleController(header);
  const footer = document.querySelector('.footer-title');
  const footerController = new TitleController(footer);

  // AdvertismentsListController is the controller on charge of <main class="advertisments-list"></main>
  const advertismentList = document.querySelector('.advertisments-list');
  const controller = new AdvertismentsListController(advertismentList);
  controller.loadAdvertisments();

  // SearchController
  const searchInput = document.querySelector('input[type="search"]');
  new SearchController(searchInput);

  // SelectController
  const selectorController = document.querySelector('.selector');
  new SelectController(selectorController);

  // Error controller is the controller of the errors <div class="global-errors hidden">
  const errorsElement = document.querySelector('.global-errors');
  const errorController = new ErrorController(errorsElement);
  // errorController.showError('testing error design') // Show an error to check how it show the errors

  // NewAdvertismentOrLoginController is the controller for the buttons of login, register and new advertisment <div class="new-advertisment">
  const newAdvertismentButtons = document.querySelector('.new-advertisment');
  new NewAdvertismentOrLoginController(newAdvertismentButtons);

  // LogOut Controller
  const logOutButton = document.querySelector('.log-out');
  new LogOutController(logOutButton);
});

