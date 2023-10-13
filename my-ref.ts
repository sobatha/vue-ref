type Dep = Set<ReactiveEffect>;
let activeEffect: ReactiveEffect | undefined;

class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {
  }

  run() {
    activeEffect = this;
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

const msg = ref<string>("hello!")

const showMsg:ReactiveEffect = new ReactiveEffect(()=>console.log("I am tracking ",msg.value))

msg.value = "changed!"


export interface ComputedRef<T = any> extends WritableComputedRef<T> {
    readonly value: T
  }
  
  export interface WritableComputedRef<T> extends Ref<T> {
    readonly effect: ReactiveEffect<T>
  }