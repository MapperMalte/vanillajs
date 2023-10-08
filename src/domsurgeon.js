class DOMSurgeon {
  constructor(document) {
    this.document = document;
  }

  // Update an element with new content using a ComponentBuilder
  updateElement(selector, componentBuilder) {
    const element = this.document.querySelector(selector);
    if (element) {
      const parent = element.parentNode;
      const newElement = componentBuilder.build();
      newElement.id = element.id;
      parent.insertBefore(newElement, element);
      parent.removeChild(element);
    } else {
      console.error(`Element with selector '${selector}' not found.`);
    }
  }

  // Insert a new element into the DOM using a ComponentBuilder
  insertElement(parentSelector, componentBuilder) {
    const parent = this.document.querySelector(parentSelector);
    if (parent) {
      const newElement = componentBuilder.build();
      parent.appendChild(newElement);
    } else {
      console.error(`Parent element with selector '${parentSelector}' not found.`);
    }
  }

  // Remove an element from the DOM
  removeElement(selector) {
    const element = this.document.querySelector(selector);
    if (element) {
      element.parentNode.removeChild(element);
    } else {
      console.error(`Element with selector '${selector}' not found.`);
    }
  }
}

// Example ComponentBuilder class
class ComponentBuilder {
  constructor(tagName, content) {
    this.tagName = tagName;
    this.content = content;
  }

  build() {
    const element = document.createElement(this.tagName);
    element.innerHTML = this.content;
    return element;
  }
}