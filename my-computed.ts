interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T;
}

interface WritableComputedRef<T> extends Ref<T> {
  readonly effect: ReactiveEffect<T>;
}
