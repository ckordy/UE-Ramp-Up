import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('promo');

  // Snapshot raw content before we replace it
  const root = block.cloneNode(true);

  const getProp = (prop) => {
    const el = root.querySelector(`[data-aue-prop="${prop}"]`);
    return el ? el.textContent.trim() : '';
  };

  const headline    = getProp('headline');
  const subheadline = getProp('subheadline');
  const ctaText     = getProp('ctaText');
  const ctaIcon     = getProp('ctaIcon');

  // Move instrumentation once, then rebuild DOM
  moveInstrumentation(root, block);

  const wrapper = document.createElement('div');
  wrapper.classList.add('promo-inner');

  const text = document.createElement('div');
  text.classList.add('promo-text');

  if (headline) {
    const h = document.createElement('h2');
    h.classList.add('promo-headline');
    h.textContent = headline;
    text.append(h);
  }

  if (subheadline) {
    const sub = document.createElement('p');
    sub.classList.add('promo-subheadline');
    sub.textContent = subheadline;
    text.append(sub);
  }

  wrapper.append(text);

  if (ctaText) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('promo-cta');

    const button = document.createElement('button');
    button.classList.add('promo-button');
    button.type = 'button';

    if (ctaIcon) {
      const icon = document.createElement('span');
      icon.classList.add('promo-icon');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = ctaIcon;
      button.append(icon);
    }

    const label = document.createElement('span');
    label.classList.add('promo-button-label');
    label.textContent = ctaText;
    button.append(label);

    ctaWrapper.append(button);
    wrapper.append(ctaWrapper);
  }

  block.replaceChildren(wrapper);
}
