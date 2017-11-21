class Counter extends HTMLElement {
  constructor() {
    super();

    this.initialRender();
    if (!this.hasAttribute('value')) {
      this.value = 0;
      this.renderValue();
    }
  }

  get value() {
    return parseInt(this.getAttribute('value'), 10);
  }

  set value(newValue) {
    this.setAttribute('value', newValue);
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback() {
    this.renderValue();
  }

  initialRender() {
    this.innerHTML = '';

    const decrementButton = document.createElement('button');
    decrementButton.innerText = '-';
    decrementButton.addEventListener('click', () => {
      this.decrement();
      this.dispatchChangeEvent();
    });
    this.appendChild(decrementButton);

    this.valueElement = document.createElement('span');
    this.appendChild(this.valueElement);

    const incrementButton = document.createElement('button');
    incrementButton.innerText = '+';
    incrementButton.addEventListener('click', () => {
      this.increment();
      this.dispatchChangeEvent();
    });
    this.appendChild(incrementButton);
  }

  renderValue() {
    this.valueElement.innerText = this.value;
  }

  decrement() {
    this.value -= 1;
  }

  increment() {
    this.value += 1;
  }

  dispatchChangeEvent() {
    this.dispatchEvent(new Event('change'));
  }
}

window.customElements.define('dy-counter', Counter);
