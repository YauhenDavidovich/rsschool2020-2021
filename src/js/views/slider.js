import  createElement  from "../logic/basic";

export class Slider {
  /**
   *
   * @param {Element} parentElement
   * @param {string} defaultText
   */
  constructor(parentElement, defaultText) {
    this.index = 0;
    this.parentElement = parentElement;
    this.defaultText = defaultText;
  }

  init() {
    this.createUI();
  }

  createUI() {
    this.leftButton = createElement(
      "button",
      this.parentElement,
      "navigation__button"
    );
    this.leftButton.innerHTML = '&#10094;';
    this.description = createElement("button", this.parentElement, "navigation__description");
    this.description.innerText = this.defaultText;
    this.rightButton = createElement(
      "button",
      this.parentElement,
      "navigation__button"
    );
    this.rightButton.innerHTML = '&#10095;';
  }
}

export default Slider;