import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  console.log('PROMO DECORATE', block);
  console.log('PROMO ROW CHILDREN', [...row.children]);

  block.classList.add('promo');

  const [row] = [...block.children];
  if (!row) {
    console.warn('PROMO: no row found');
    return;
  }

  moveInstrumentation(row, block);

  const cells = [...row.children];
  const headlineCell   = cells[0];
  const subCell        = cells[1];
  const ctaCell        = cells[2];
  const iconCell       = cells[3];

  const wrapper = document.createElement('div');
  wrapper.classList.add('promo-inner');

  const text = document.createElement('div');
  text.classList.add('promo-text');

  // Headline
  if (headlineCell && headlineCell.textContent.trim()) {
    const h = document.createElement('h2');
    h.classList.add('promo-headline');

    const p = headlineCell.querySelector('p');
    if (p) {
      // Move the text nodes out of the <p> so we don't nest <p> in <h2>
      h.append(...p.childNodes);
    } else {
      h.append(...headlineCell.childNodes);
    }

    text.append(h);
  }

  // Sub-headline
  if (subCell && subCell.textContent.trim()) {
    const sub = document.createElement('p');
    sub.classList.add('promo-subheadline');

    const p = subCell.querySelector('p');
    if (p) {
      sub.append(...p.childNodes);
    } else {
      sub.append(...subCell.childNodes);
    }

    text.append(sub);
  }

  wrapper.append(text);

  // CTA (button) – only if CTA text exists
  if (ctaCell && ctaCell.textContent.trim()) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('promo-cta');

    const button = document.createElement('button');
    button.classList.add('promo-button');
    button.type = 'button';

    // Optional icon text
    let iconText = '';
    if (iconCell && iconCell.textContent.trim()) {
      const p = iconCell.querySelector('p');
      iconText = p ? p.textContent.trim() : iconCell.textContent.trim();
    }

    if (iconText) {
      const icon = document.createElement('span');
      icon.classList.add('promo-icon');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = iconText;
      button.append(icon);
    }

    const label = document.createElement('span');
    label.classList.add('promo-button-label');

    const p = ctaCell.querySelector('p');
    if (p) {
      label.append(...p.childNodes);
    } else {
      label.append(...ctaCell.childNodes);
    }

    button.append(label);
    ctaWrapper.append(button);
    wrapper.append(ctaWrapper);
  }

  // Replace original row with our structured content
  block.replaceChildren(wrapper);
}
