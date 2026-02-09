import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Parent wrapper
  console.log("Decorating contacts block", block);
  const wrapper = document.createElement('div');
  wrapper.classList.add('contacts');

  // Iterate each row (one contact per row)
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

    if (locationCell && locationCell.textContent.trim()) {
      const locationEl = document.createElement('div');
      locationEl.classList.add('contact-location');
      locationEl.append(...locationCell.childNodes);
      contact.append(locationEl);
    }

    if (emailCell) {
      const emailEl = document.createElement('div');
      emailEl.classList.add('contact-email');
      emailEl.append(...emailCell.childNodes);
      contact.append(emailEl);
    }

    wrapper.append(contact);
  });

  block.replaceChildren(wrapper);
}
