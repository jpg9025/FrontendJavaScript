import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';


export default class RegisterFormController extends BaseController {

    constructor(element) {
        super(element);
        this.attachEventListener();
    }

    async makeAdvertisment (user) {
        await dataService.registerUser(user);
        alert('User created');
        window.location.href = '/login.html';  // Redirect the user to login page
    }

    checkInputErrors() {

        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('button');
            // Bulma framework (HTML - CSS) If the input pass the validation the box turns green, if not it turns red
            if (input.validity.valid) {
                input.classList.add('is-success');
                input.classList.remove('is-danger');
            } else {
                input.classList.remove('is-success');
                input.classList.add('is-danger');
                console.error(input.validationMessage);
            }

            // Validation of the form to able or disable the button
            if (this.element.checkValidity()) { // checkvalidity is a method of forms that check the status of all fields required
                button.removeAttribute('disabled'); // button.setAttribute('disabled', false); <- This way is right too
            } else {
                button.setAttribute('disabled', true);
            }
        });
    }

    attachEventListener() {

        this.element.addEventListener('submit', async (event) => {
            event.preventDefault(); // Avoid the send of the form to the backend
            const user = {
                username: this.element.elements.email.value,
                password: this.element.elements.password.value
            };
            this.publish(this.events.START_LOADING);
            try {
                await this.makeAdvertisment(user);
            } catch(error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });
        
        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('button');
            input.addEventListener('keyup', event => {
                this.checkInputErrors();
            });
        });

        // Double check of the password
        this.element.querySelectorAll('input[type="password"]').forEach(input => {
            const button = this.element.querySelector('button');
            //const message = this.element.elements['message'];
            input.addEventListener('keyup', event =>  {
                const passInput = this.element.elements['password'];
                const passConfirmInput = this.element.elements['password-confirm']; // The HTML input name="password-confirm" transform to passwordConfirm, we can not use - in JS / <input name="password-confirm" class="input" type="password" placeholder="Confrim password" required>
                if (passInput.value !== passConfirmInput.value) {
                    passInput.setCustomValidity('Passwords do not match'); // mark the input as error
                    passConfirmInput.setCustomValidity('Passwords do not match');
                } else {
                    passInput.setCustomValidity(''); // It is like say that the input is OK
                    passConfirmInput.setCustomValidity(''); // It is like say that the input is OK
                }
                this.checkInputErrors();
            });
        })
    }

}
