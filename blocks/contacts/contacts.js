import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use the block itself as the grid container
  block.classList.add('contacts');
  const contacts = [];

  [...block.children].forEach((row) => {
    const contact = document.createElement('div');
    contact.classList.add('contact');

    moveInstrumentation(row, contact);

    const [nameCell, titleCell, locationCell, emailCell] = [...row.children];

    if (nameCell) {
      const nameEl = document.createElement('div');
      nameEl.classList.add('contact-name');
      nameEl.append(...nameCell.childNodes);
      contact.append(nameEl);
    }

    if (titleCell) {
      const titleEl = document.createElement('div');
      titleEl.classList.add('contact-title');
      titleEl.append(...titleCell.childNodes);
      contact.append(titleEl);
    }

  if (titleCell || (locationCell && locationCell.textContent.trim())) {
    const titleEl = document.createElement('div');
    titleEl.classList.add('contact-title');

    const titleText = titleCell ? titleCell.textContent.trim() : '';
    const locationText = locationCell ? locationCell.textContent.trim() : '';

    const combined = locationText
      ? `${titleText}, ${locationText}`
      : titleText;

    titleEl.textContent = combined;
    contact.append(titleEl);
  }

    contacts.push(contact);
  });

  block.replaceChildren(...contacts);
}
