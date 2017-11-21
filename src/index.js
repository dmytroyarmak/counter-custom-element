class Counter extends HTMLElement {
  constructor() {
    super();

    this.initialRender();
    this.value = this.hasAttribute('value') ? this.getAttribute('value') : 0;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    const parsedValue = Math.trunc(newValue);
    if (!Number.isNaN(parsedValue) && parsedValue !== this._value) {
      this._value = parsedValue;
      this.renderValue();
    }
  }

  get step () {
    return this.getAttribute('step');
  }

  set step(newStep) {
    this.setAttribute('step', newStep);
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
    this.value -= this.getAndParseStep();
  }

  increment() {
    this.value += this.getAndParseStep();
  }

  getAndParseStep() {
    const parsedStep = !this.step ? NaN : Number(this.step);
    return Number.isNaN(parsedStep) ? 1 : parsedStep;
  }

  dispatchChangeEvent() {
    this.dispatchEvent(new Event('change'));
  }
}

window.customElements.define('dy-counter', Counter);
