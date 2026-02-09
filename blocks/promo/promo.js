import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('promo');

  // Keep UE instrumentation on the block, discard raw children
  const cells = [...block.children];
  if (!cells.length) return;

  moveInstrumentation(block, block);

  const findCell = (prop) =>
    cells.find((c) => c.querySelector(`[data-aue-prop="${prop}"]`)) || null;

  const headlineCell = findCell('headline');
  const subCell      = findCell('subheadline');
  const ctaCell      = findCell('ctaText');
  const iconCell     = findCell('ctaIcon');

  const wrapper = document.createElement('div');
  wrapper.classList.add('promo-inner');

  const text = document.createElement('div');
  text.classList.add('promo-text');

  // Headline
  if (headlineCell) {
    const p = headlineCell.querySelector('p');
    const value = p ? p.textContent.trim() : headlineCell.textContent.trim();
    if (value) {
      const h = document.createElement('h2');
      h.classList.add('promo-headline');
      h.textContent = value;
      text.append(h);
    }
  }

  // Sub-headline
  if (subCell) {
    const p = subCell.querySelector('p');
    const value = p ? p.textContent.trim() : subCell.textContent.trim();
    if (value) {
      const sub = document.createElement('p');
      sub.classList.add('promo-subheadline');
      sub.textContent = value;
      text.append(sub);
    }
  }

  wrapper.append(text);

  // CTA
  if (ctaCell) {
    const p = ctaCell.querySelector('p');
    const ctaValue = p ? p.textContent.trim() : ctaCell.textContent.trim();

    if (ctaValue) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('promo-cta');

      const button = document.createElement('button');
      button.classList.add('promo-button');
      button.type = 'button';

      // Icon
      if (iconCell) {
        const ip = iconCell.querySelector('p');
        const iconValue = ip ? ip.textContent.trim() : iconCell.textContent.trim();
        if (iconValue) {
          const icon = document.createElement('span');
          icon.classList.add('promo-icon');
          icon.setAttribute('aria-hidden', 'true');
          icon.textContent = iconValue; // ✉ in your example
          button.append(icon);
        }
      }

      const label = document.createElement('span');
      label.classList.add('promo-button-label');
      label.textContent = ctaValue;
      button.append(label);

      ctaWrapper.append(button);
      wrapper.append(ctaWrapper);
    }
  }

  block.replaceChildren(wrapper);
}
