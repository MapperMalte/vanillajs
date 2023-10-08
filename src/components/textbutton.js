class TextButton {
  constructor(text, onClick, id) {
    this.text = text;
    this.onClick = onClick; 
    this.id = id; 
  }

  build() {
    const button = document.createElement('button');
    
    if (this.id) {
      button.id = this.id;
    }
    
    button.classList.add('text-button');
    button.textContent = this.text;

    button.addEventListener('click', () => {
      if (typeof this.onClick === 'function') {
        this.onClick();
      }
    });

    return button;
  }
}