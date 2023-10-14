type Dep = Set<ReactiveEffect>;
let activeEffect: ReactiveEffect | undefined;

class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {
  }
  run() {
    return this.fn();
  }
}

function ref<T>(value: T) {
    return new RefImpl(value);
}

class RefImpl<T> {
  private _value: T;
  public dep: Dep = new Set();

  constructor(value: T) {
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

function trackEffects(dep: Dep) {
  if (activeEffect) dep.add(activeEffect);
}

function triggerEffects(dep: Dep) {
  for (const effect of dep) {
    effect.run();
  }
}

function myWatchEffect(fn:()=>any):void {
    const effect = new ReactiveEffect(fn)
    activeEffect = effect;
    effect.run()
    activeEffect = undefined;
}

const msg = ref<string>("hello!")

myWatchEffect(()=>console.log("I am tracking ",msg.value))

msg.value = "changed!"