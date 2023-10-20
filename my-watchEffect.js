"use strict";
let active = null;
class Ref {
    constructor(value) {
        this._value = value;
        this.dep = new Set();
    }
    get value() {
        this.track();
        return this._value;
    }
    set value(newVal) {
        this._value = newVal;
        this.trigger();
    }
    trigger() {
        this.dep.forEach(effect => effect());
    }
    track() {
        if (active)
            this.dep.add(active);
    }
}
function watchEffect(effect) {
    active = effect;
    effect();
    active = null;
}
const message = new Ref("hello");
watchEffect(() => {
    console.log(message.value); //hello!
});
message.value = "changed!";
