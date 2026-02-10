export default function decorate(block) {
  console.log('PROMO DECORATE SIMPLE', block);

  block.classList.add('promo');

  const wrapper = document.createElement('div');
  wrapper.classList.add('promo-inner');

  const text = document.createElement('div');
  text.classList.add('promo-text');

  const h = document.createElement('h2');
  h.classList.add('promo-headline');
  h.textContent = 'Send us an email.';
  text.append(h);

  const sub = document.createElement('p');
  sub.classList.add('promo-subheadline');
  sub.textContent = 'We will be in contact soon!';
  text.append(sub);

  wrapper.append(text);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('promo-cta');

  const button = document.createElement('button');
  button.classList.add('promo-button');
  button.type = 'button';

  const icon = document.createElement('span');
  icon.classList.add('promo-icon');
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '✉';
  button.append(icon);

  const label = document.createElement('span');
  label.classList.add('promo-button-label');
  label.textContent = 'inquiries@ensemble.com';
  button.append(label);

  ctaWrapper.append(button);
  wrapper.append(ctaWrapper);

  block.replaceChildren(wrapper);
}
