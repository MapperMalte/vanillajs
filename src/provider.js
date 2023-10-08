class StateProvider {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class StateObserver {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} received data: ${data}`);
  }
}

const stateObserversMap = new Map();

const stateProvidersMap = new Map();
function createStateProvider(id) {
  if (stateProvidersMap.has(id)) {
    return stateProvidersMap.get(id);
  } else {
    const provider = new StateProvider();
    stateProvidersMap.set(id, provider);
    return provider;
  }
}