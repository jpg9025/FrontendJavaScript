import BaseController from './BaseController.js';
import dataService from '../services/DataService.js'

export default class NewAdvertismentFormController extends BaseController {
    
    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
        this.focusInTextarea();
        this.checkIfImageIsLoaded();
    }

    async checkIfUserIsLogged() { // Could be interesting to have this method in BaseController because could be more pages that redirect to login page
        const userIsLogged = await dataService.isUserLogged();
        if(!userIsLogged) {
            window.location.href = '/login.html?next=/new-advertisment.html'; // If the user is not logged it redirect to login page
        } else {
            this.publish(this.events.FINISH_LOADING);
        }
    }

    focusInTextarea() {
        const textarea = this.element.querySelector('textarea'); 
        textarea.focus(); // With the focus on textarea as soon as the user open the new-advertisment.html it will be possible to start writting without select the are - UX
    }

    attachEventListeners() {
        // Check the validity of the form when the user is writting to able the advertisment -advertisment button or keep it disabled
        const textarea = this.element.querySelector('textarea');
        textarea.addEventListener('keyup', () => {
            const button = this.element.querySelector('button');
            if (this.element.checkValidity()) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', true);
            }
        });

        //Only items on sale could include a price
        const onSale = this.element.querySelector('#onSale');
        const price = this.element.querySelector('price')
        if (onSale.value.checked === "false") {
            price.value = '';
            price.setAttribute('disabled', true);
            price.removeAttribute('required');
        }

        // Form sending control
        this.element.addEventListener('submit', async event => {
            event.preventDefault(); // Avoid that the form is send, behaibour by defect
            const advertisment = {
                message: this.element.elements.message.value,
                image: null,
                onSale: this.element.elements.onSale.value,
                price: this.element.elements.price.value
            }

            console.log(this.element.elements.onSale.value);
            console.log(advertisment.onSale);
            
            if (this.element.elements.file.files.length > 0) { // is this.element.elements. file becuase name=file in HTML <input type="file" name="file" accept="image/*">
                advertisment.image = this.element.elements.file.files[0];
            }

            this.publish(this.events.START_LOADING);
            try { // When the advertisment is published redirect the user to index page to let they see their advertisment
                await dataService.saveAdvertisment(advertisment);
                window.location.href = '/?message=advertismentOK';
            } catch (error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });
    }

    checkIfImageIsLoaded() {
        // Swift from red to green when the image is uploaded to let the user know that it is a must
        // Show file name
        const fileButton = this.element.querySelector('input');
        const labelForFileButton = this.element.querySelector('label');
        const FileName = this.element.querySelector('.FileSelected');
        fileButton.addEventListener('input', () => {
            if(fileButton.checkValidity(fileButton.file)) {
                FileName.innerHTML=`${fileButton.files[0].name}`;
                labelForFileButton.classList.remove('is-danger');
                labelForFileButton.classList.add('is-success');
            } else {
                //labelForFileButton.innerHTML='Select image';
                labelForFileButton.classList.remove('is-success');
                labelForFileButton.classList.add('is-danger');
                FileName.innerHTML='';
            }
        });
    }

}