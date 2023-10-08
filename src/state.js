class State {
    static of(id){
        let state = new State(id);
        return state;
    }
    
    constructor(id){
        this.id = id;
        this.provider = createStateProvider(id);
    }
    
    setState(data){
        this.state = data;
        this.provider.notify(this.state);
    }
    
    observe(onChanged){
        const observer = new StateObserver(this.id);
        observer.update = onChanged;
        this.provider.addObserver(observer);
    }
}