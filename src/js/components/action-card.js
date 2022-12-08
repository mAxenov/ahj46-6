import dragNdrop from '../app';

export default class ActionCard {
  constructor() {
    this.cardsAdd = document.querySelectorAll('.cards__add');
    this.boards = document.querySelector('.boards');
    this.textAreaValue = '';

    this.onListItemClick = this.onListItemClick.bind(this);
    this.onCloseFormClick = this.onCloseFormClick.bind(this);
    this.onAddCardClick = this.onAddCardClick.bind(this);
    this.cardsAddClick = this.cardsAddClick.bind(this);
    this.onShowFormClick = this.onShowFormClick.bind(this);
    this.onTextAreaInput = this.onTextAreaInput.bind(this);

    this.cardsAddClick();

    this.boards.addEventListener('mouseover', this.onListItemClick);
  }

  cardsAddClick() {
    this.cardsAdd.forEach((el) => el.addEventListener('click', this.onShowFormClick));
    this.textAreaValue = '';
  }

  onShowFormClick(e) {
    e.target.classList.add('active');
    this.getParentItem(e).querySelector('.form').hidden = false;
    this.showBtnAdd(this.getParentItem(e).querySelector('.add__item-btn'), this.textAreaValue);
    this.getParentItem(e).querySelector('.form__textarea').value = '';
    this.getParentItem(e).querySelector('.cancel__item-btn').addEventListener('click', this.onCloseFormClick);
    this.getParentItem(e).querySelector('.add__item-btn').addEventListener('click', this.onAddCardClick);
    this.getParentItem(e).querySelector('.form__textarea').addEventListener('input', this.onTextAreaInput);
  }

  onAddCardClick(e) {
    const newCard = document.createElement('div');
    const textContent = document.createElement('p');
    newCard.classList.add('cards__item');
    newCard.draggable = true;
    textContent.textContent = this.textAreaValue;
    newCard.appendChild(textContent);
    this.getParentItem(e).querySelector('.cards').appendChild(newCard);
    this.onCloseFormClick(e);
    dragNdrop();
  }

  onCloseFormClick(e) {
    this.textAreaValue = '';
    this.getParentItem(e).querySelector('.cards__add').classList.remove('active');
    this.getParentItem(e).querySelector('.form').hidden = true;
    this.getParentItem(e).querySelector('.cancel__item-btn').removeEventListener('click', this.onCloseFormClick);
    this.getParentItem(e).querySelector('.add__item-btn').removeEventListener('click', this.onAddCardClick);
    this.getParentItem(e).querySelector('.form__textarea').removeEventListener('input', this.onTextAreaInput);
  }

  onTextAreaInput(e) {
    this.textAreaValue = e.target.value;
    this.showBtnAdd(this.getParentItem(e).querySelector('.add__item-btn'), this.textAreaValue);
  }

  showBtnAdd(addBtn, textAreaValue) {
    if (textAreaValue) {
      addBtn.disabled = false;
      addBtn.style.opacity = 1;
    } else {
      addBtn.disabled = true;
      addBtn.style.opacity = 0.5;
    }
  }

  getParentItem(e) {
    return e.target.closest('.boards__item');
  }

  onListItemClick(e) {
    const parentEl = e.target.closest('.cards__item');
    if (parentEl !== null && parentEl.querySelector('.cards__item-delete') === null) {
      const closeElement = document.createElement('div');
      const close = document.createElement('div');
      closeElement.classList.add('cards__item-delete');
      close.classList.add('close');
      closeElement.appendChild(close);
      parentEl.appendChild(closeElement);

      parentEl.addEventListener(('mouseleave'), (e) => {
        const parentEl = e.target.closest('.cards__item');
        if (parentEl === null) {
          return;
        }
        const el = parentEl.querySelector('.cards__item-delete');
        if (el !== null) {
          parentEl.removeChild(el);
        }
      });

      parentEl.querySelector('.cards__item-delete').addEventListener('click', (e) => {
        const el = e.target.closest('.cards');
        el.removeChild(e.target.closest('.cards__item'));
      });
    }
  }
}
