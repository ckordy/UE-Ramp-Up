import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('promo');

  // Expect 4 cells: [headline, subheadline, ctaText, ctaIcon]
  const [row] = [...block.children];
  if (!row) return;

  moveInstrumentation(row, block);

  const [headlineCell, subCell, ctaCell, iconCell] = [...row.children];

  const wrapper = document.createElement('div');
  wrapper.classList.add('promo-inner');

  // Text group
  const text = document.createElement('div');
  text.classList.add('promo-text');

  if (headlineCell && headlineCell.textContent.trim()) {
    const h = document.createElement('h2');
    h.classList.add('promo-headline');
    h.append(...headlineCell.childNodes);
    text.append(h);
  }

  if (subCell && subCell.textContent.trim()) {
    const sub = document.createElement('p');
    sub.classList.add('promo-subheadline');
    sub.append(...subCell.childNodes);
    text.append(sub);
  }

  wrapper.append(text);

  // CTA
  if (ctaCell && ctaCell.textContent.trim()) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('promo-cta');

    const button = document.createElement('button');
    button.classList.add('promo-button');
    button.type = 'button';

    // Icon span
    let iconText = '';
    if (iconCell && iconCell.textContent.trim()) {
      iconText = iconCell.textContent.trim();
    }

    if (iconText) {
      const icon = document.createElement('span');
      icon.classList.add('promo-icon');
      icon.setAttribute('aria-hidden', 'true');
      // simple envelope glyph, or map iconText to something else later
      icon.textContent = iconText;
      button.append(icon);
    }

    const label = document.createElement('span');
    label.classList.add('promo-button-label');
    label.append(...ctaCell.childNodes);
    button.append(label);

    ctaWrapper.append(button);
    wrapper.append(ctaWrapper);
  }

  block.replaceChildren(wrapper);
}
