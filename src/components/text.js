class Text {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }

  build() {
    const element = document.createElement('div');

    if (this.id) {
      element.id = this.id;
    }

    element.classList.add('text-element');
    element.textContent = this.text;

    return element;
  }
}