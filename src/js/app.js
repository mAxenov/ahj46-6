// TODO: write code here

import ActionCard from './components/action-card';

const ActionCards = new ActionCard();

let draggedItem = null;
let placeholder = null;
let isDraggingStarted = false;

const createPlaceholder = () => {
  // Create and position placeholder before draggedItem
  placeholder = document.createElement('div');
  placeholder.classList.add('placeholder');
  draggedItem.parentNode.insertBefore(placeholder, draggedItem);
  placeholder.style.height = `${draggedItem.offsetHeight}px`;
};

const getElementCoordinates = (node, searchCoordsBy) => {
  const rect = node.getBoundingClientRect();
  return {
    top:
      searchCoordsBy === 'by-center'
        ? rect.top + rect.height / 2
        : rect.top + 10,
    left: rect.left + rect.width / 2,
  };
};

const isAbove = (nodeA, nodeB) => {
  const rectB = nodeB.getBoundingClientRect();
  return nodeA.y < rectB.top + rectB.height / 2 + 10;
};
const getElementBelow = (draggedItem, searchCoordsBy) => {
  const movingElementCenter = getElementCoordinates(
    draggedItem,
    searchCoordsBy,
  );
  draggedItem.hidden = true;
  const elementBelow = document.elementFromPoint(
    movingElementCenter.left,
    movingElementCenter.top,
  );
  draggedItem.hidden = false;
  return elementBelow;
};

export default function dragNDrop() {
  const cardsItems = document.querySelectorAll('.cards__item');
  const cards = document.querySelectorAll('.cards');
  let elementBelow = null;
  let currentDroppable = null;

  function handleDragStart(e) {
    draggedItem = this;
    setTimeout(() => {
      if (!isDraggingStarted) {
        placeholder = null;
        createPlaceholder();
        isDraggingStarted = true;
      }
      this.style.display = 'none';
    }, 10);
  }
  function handleDragEnd() {
    this.style.display = 'flex';
    draggedItem = null;
    placeholder = null;
    isDraggingStarted = false;
    document.querySelectorAll('.placeholder').forEach((item) => {
      item.parentNode.removeChild(item);
    });
  }
  function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    elementBelow = getElementBelow(e.target, 'by-center');
    if (!elementBelow) return;
    const droppableBelow = elementBelow.closest('.cards__item');
    if (currentDroppable !== droppableBelow) {
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        if (
          !isAbove(e, currentDroppable)
        ) {
          currentDroppable.parentNode.insertBefore(
            placeholder,
            currentDroppable,
          );
        } else {
          currentDroppable.parentNode.insertBefore(
            placeholder,
            currentDroppable.nextElementSibling,
          );
        }
      }
    }
  }

  function handleDragEnter(e) {
    if (e.preventDefault) e.preventDefault();
    this.style.backgroundColor = '#d5dbde';
  }

  function handleDragLeave(e) {
    if (e.preventDefault) e.preventDefault();
    this.style.backgroundColor = 'rgba(0,0,0, 0)';
  }

  function handleDragDrop(e) {
    if (e.preventDefault) e.preventDefault();
    if (this.querySelector('.placeholder') === null) {
      this.append(draggedItem);
    } else {
      placeholder.parentNode.insertBefore(draggedItem, placeholder);
    }
    this.style.backgroundColor = 'rgba(0,0,0, 0)';
  }

  for (let i = 0; i < cardsItems.length; i++) {
    const item = cardsItems[i];

    item.addEventListener('dragstart', handleDragStart);

    item.addEventListener('dragend', handleDragEnd);

    for (let j = 0; j < cards.length; j++) {
      const card = cards[j];

      card.addEventListener('dragover', handleDragOver);

      card.addEventListener('dragenter', handleDragEnter);

      card.addEventListener('dragleave', handleDragLeave);

      card.addEventListener('drop', handleDragDrop);
    }
  }
}

dragNDrop();
