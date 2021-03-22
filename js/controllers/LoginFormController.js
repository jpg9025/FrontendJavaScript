import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";

export default class LoginFormController extends BaseController {
  constructor(element) {
    super(element);
    this.attachEventListener();
  }

  attachEventListener() {
    this.element.addEventListener("submit", async (event) => {
      event.preventDefault(); // Avoid the send of the form to the backend
      const user = {
        username: this.element.elements.email.value,
        password: this.element.elements.password.value,
      };
      this.publish(this.events.START_LOADING);
      try {
        const data = await dataService.login(user);
        dataService.saveToken(data.accessToken);
        let next = '/';
        const queryParams = window.location.search.replace('?', ''); //?net=otherpage -> next = otherpage
        if (queryParams.length >= 2 && queryParams[0] === 'next') {
          next = queryParams[1];
        }
        window.location.href ='index.html'; // Redirect the user to index page after login
      } catch (error) {
        this.publish(this.events.ERROR, error);
      } finally {
        this.publish(this.events.FINISH_LOADING);
      }
    });

    this.element.querySelectorAll("input").forEach((input) => {
      const button = this.element.querySelector("button");
      input.addEventListener("keyup", (event) => {
        // Bulma framework (HTML - CSS) If the input pass the validation the box turns green, if not it turns red
        if (input.validity.valid) {
          input.classList.add("is-success");
          input.classList.remove("is-danger");
        } else {
          input.classList.remove("is-success");
          input.classList.add("is-danger");
        }

        // Validation of the form to able or disable the button
        if (this.element.checkValidity()) { // checkvalidity is a method of forms that check the status of all fields required
          button.removeAttribute("disabled"); // button.setAttribute('disabled', false); <- This way is right too
        } else {
          button.setAttribute("disabled", true);
        }
      });
    });
  };
}
