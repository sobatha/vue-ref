"use strict";
let activeEffect;
class ReactiveEffect {
    constructor(fn) {
        this.fn = fn;
    }
    run() {
        activeEffect = this;
        return this.fn();
    }
}
function ref(value) {
    return new RefImpl(value);
}
class RefImpl {
    constructor(value) {
        this.dep = new Set();
        this._value = value;
    }
    get value() {
        trackEffects(this.dep);
        return this._value;
    }
    set value(newVal) {
        this._value = newVal;
        triggerEffects(this.dep);
    }
}
function trackEffects(dep) {
    if (activeEffect)
        dep.add(activeEffect);
}
function triggerEffects(dep) {
    for (const effect of dep) {
        effect.run();
    }
}
function myWatchEffect(fn) {
    const effect = new ReactiveEffect(fn);
    effect.run();
    activeEffect = undefined;
}
const msg = ref("hello!");
myWatchEffect(() => console.log("I am tracking ", msg.value));
msg.value = "changed!";
