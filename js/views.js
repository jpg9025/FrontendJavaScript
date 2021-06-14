const TITLE = 'ExpressPOP';

export const advertismentView = (advertisment) => {

  let deleteButtonHTML = '';
  if (advertisment.canBeDeleted) {
    deleteButtonHTML = '<a href="#" class="card-footer-item"><button class="button is-warning">Delete</button></a>';
  }

  let onSaleToBuyHTML = '';
  if (advertisment.onSale){
    onSaleToBuyHTML = 'On Sale';
  } else {
    onSaleToBuyHTML = 'To Buy';
  }

  let editButtonHTML = '';
  if (advertisment.canBeDeleted) {
    editButtonHTML = '<a href="#" class="card-footer-item"><button class="button is-info">Edit</button></a>';
  }

  let imgHTML = '';
  if (advertisment.image) {
    imgHTML = `<div class="card-image">
    <figure class="image is-4by3">
    <img src="${advertisment.image}" alt="Placeholder image" multiple>
    </figure>
    </div>`;
  }

  return `<div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">${advertisment.author}</p>
        </div>
        <div class="onSaleToBuy">
          ${onSaleToBuyHTML}:
        </div>
        </br>
        <div class="price">
          ${advertisment.price} €
        </div>
      </div>
      <div class="content">
        ${advertisment.message}
        <br>
        <time datetime="${advertisment.date}">${advertisment.date}</time>
      </div>
    </div>
    ${imgHTML}
    <div class="card-footer">
      ${deleteButtonHTML}
      ${editButtonHTML}
    </div>
  </div>`;
};
  
export const errorView = (errorMessage) => {
  return `<article class="message is-danger">
    <div class="message-header">
      <p>Error</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      ${errorMessage}
    </div>
  </article>`
};

export const webTitle = () => {
  return `${TITLE}`
};

export const advertismentDetailView = (advertisment) => {
  let onSaleToBuyHTML = '';
  if (advertisment.onSale){
    onSaleToBuyHTML = 'On Sale';
  } else {
    onSaleToBuyHTML = 'To Buy';
  }

  let editButtonHTML = '';
  if (advertisment.canBeDeleted) {
    editButtonHTML = '<a href="#" class="card-footer-item"><button class="button is-info">Edit</button></a>';
  }

  let imgHTML = '';
  if (advertisment.image) {
    imgHTML = `<div class="card-image">
    <figure class="image is-4by3">
    <img src="${advertisment.image}" alt="Placeholder image" multiple>
    </figure>
    </div>`;
  }
  return `<div class="card-content">
    <div class="advertisment-image">
        ${imgHTML}
    </div>
    <div class="media">
        <div class="media-content">
            <p class="title is-4">${advertisment.author}</p>
        </div>
        <div class="onSaleToBuy">
            ${onSaleToBuyHTML}
            <p>:</p>
        </div>
        <div class="price">
            ${advertisment.price}
            <p>€</p>
        </div>
    </div>
    <div class="content">
        ${advertisment.message}
        <time datetime="${advertisment.date}">${advertisment.date}</time>
    </div>
  </div>`
}
