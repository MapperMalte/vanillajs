class FormItem {
  constructor(label, type, validator, formId) {
    this.label = label;
    this.type = type;
    this.validator = validator;
    this.state = State.of(label + formId);
    this.state.setState({ value: '', valid: false, description: this.label });
  }

  validate(value) {
    const validation = this.validator(value);
    if (validation.valid) {
      this.state.setState({ value: value, valid: true, description: this.label });
    } else {
      this.state.setState({ value: value, valid: false, description: validation.errormsg });
    }
    return validation;
  }
}

class InputState {
  constructor() {
    this.label = null;
    this.caretPosition = 0;
    this.selectionStart = 0; 
    this.selectionEnd = 0;
  }

  save(label, selectionStart, selectionEnd) {
    this.label = label;
    this.caretPosition = selectionStart;
    this.selectionStart = selectionStart; 
    this.selectionEnd = selectionEnd;
  }
}

class Form {
  constructor(id, domSurgeon) {
    this.id = id;
    this.domSurgeon = domSurgeon;
    this.formItems = [];
    this.submitButtonText = 'Submit';
    this.inputState = new InputState();
  }

  addFormItem(label, type, validator) {
    const formItem = new FormItem(label, type, validator, this.id, this);
    const labelId = this.getIdForLabel(label);
    formItem.state.observe((newState) => {
      this.domSurgeon.updateElement('#'+labelId, 
        new ComponentBuilder(this.buildLabel(labelId,newState))
      );
    });
    this.formItems.push(formItem);
  }
  
  setTitle(title){
    this.title = title;
  }

  setSubmitButtonText(submitButtonText){
    this.submitButtonText = submitButtonText;
  }
  
  getIdForLabel(label) {
    return `${this.id}-${label}-label`;
  }
  
  getIdForInput(input) {
    return `${this.id}-${input}-input`;
  }
  
  buildLabel(id, state) {
    const labelElement = document.createElement('label');
    labelElement.textContent = state.description;
    labelElement.id = id;
    if (state.valid) {
        labelElement.classList.remove('invalid-input');
        labelElement.classList.add('valid-input');
    } else {
        labelElement.classList.remove('valid-input');
        labelElement.classList.add('invalid-input');
    }
      
    return labelElement;
  }
  
  getFormStates() {
    return this.formItems.map((item) => item.state);
  }

  getFormStateByLabel(label) {
    const formItem = this.formItems.find((item) => item.label === label);
    return formItem ? formItem.state : null;
  }

  build() {
    const formElement = document.createElement('form');
    formElement.classList.add('form-card');
    formElement.id = this.id;
    
    if ( this.title ){
        const headerWrapper = document.createElement('div');
        headerWrapper.classList.add('title');
        const headerElement = document.createElement('h2');
        headerElement.innerHTML = this.title;
        headerWrapper.appendChild(headerElement);
        formElement.appendChild(headerWrapper);
    }
      
    this.formItems.forEach((item) => {
      formElement.appendChild(
        this.buildLabel(
            this.getIdForLabel(item.label),
            item.state.state
        )
      );
      const inputElement = document.createElement('input');
      inputElement.type = item.type;
      inputElement.name = item.label;
      inputElement.value = item.state.state.value;
      inputElement.id = this.getIdForInput(item.label);
      formElement.appendChild(inputElement);
      
      if ( item.type !== 'date' )
      {
        inputElement.addEventListener('input', (event) => {
            this.inputState.save(
                item.label,
                event.target.selectionStart, 
                event.target.selectionEnd
            );
            item.validate(event.target.value);
        });
      } else {
        inputElement.addEventListener('change', function() {
          const selectedDate = inputElement.value;
          item.validate(selectedDate);
        });
      }

      if (item.label === this.inputState.label) {
        inputElement.focus();
        if ( item.type !== 'date' )
        {
            inputElement.setSelectionRange(
                this.inputState.selectionStart, 
                this.inputState.selectionEnd
            );
        }
      }
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = this.submitButtonText;
    formElement.appendChild(submitButton);

    return formElement;
  }
}