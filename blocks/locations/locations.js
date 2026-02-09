import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use block itself as grid container
  block.classList.add('locations');

  const items = [];

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    item.classList.add('location');
    moveInstrumentation(row, item);

    // Expect cells in model order:
    // [primaryImage, secondaryImage, locationName, contactNumber,
    //  streetAddress, city, postalCode, country]
    const [
      primaryImgCell,
      secondaryImgCell,
      nameCell,
      phoneCell,
      streetCell,
      cityCell,
      postalCell,
      countryCell,
    ] = [...row.children];

    // Images wrapper
    const images = document.createElement('div');
    images.classList.add('location-images');

    if (primaryImgCell) {
      const pic = primaryImgCell.querySelector('picture img');
      if (pic) {
        const optimized = createOptimizedPicture(pic.src, pic.alt || '', false, [
          { width: '600' },
        ]);
        moveInstrumentation(pic, optimized.querySelector('img'));
        images.append(optimized);
      }
    }

    if (secondaryImgCell) {
      const pic = secondaryImgCell.querySelector('picture img');
      if (pic) {
        const optimized = createOptimizedPicture(pic.src, pic.alt || '', false, [
          { width: '600' },
        ]);
        moveInstrumentation(pic, optimized.querySelector('img'));
        images.append(optimized);
      }
    }

    item.append(images);

    // Content wrapper
    const content = document.createElement('div');
    content.classList.add('location-content');

    if (nameCell) {
      const nameEl = document.createElement('h3');
      nameEl.classList.add('location-name');
      nameEl.append(...nameCell.childNodes);
      content.append(nameEl);
    }

    if (phoneCell && phoneCell.textContent.trim()) {
      const phoneEl = document.createElement('div');
      phoneEl.classList.add('location-phone');
      phoneEl.append(...phoneCell.childNodes);
      content.append(phoneEl);
    }

    // Address lines
    const address = document.createElement('div');
    address.classList.add('location-address');

    if (streetCell && streetCell.textContent.trim()) {
      const line1 = document.createElement('div');
      line1.append(...streetCell.childNodes);
      address.append(line1);
    }

    const cityParts = [];

    if (cityCell && cityCell.textContent.trim()) {
      cityParts.push(cityCell.textContent.trim());
    }
    if (postalCell && postalCell.textContent.trim()) {
      cityParts.push(postalCell.textContent.trim());
    }

    if (cityParts.length) {
      const line2 = document.createElement('div');
      line2.textContent = cityParts.join(' ');
      address.append(line2);
    }

    if (countryCell && countryCell.textContent.trim()) {
      const line3 = document.createElement('div');
      line3.append(...countryCell.childNodes);
      address.append(line3);
    }

    if (address.children.length) {
      content.append(address);
    }

    item.append(content);
    items.push(item);
  });

  block.replaceChildren(...items);
}
