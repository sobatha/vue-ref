
type Effect = () => any
let active: Effect | null = null

class Ref<T> {
    _value: T
    dep: Set<any>
    constructor(value:T) {
        this._value = value
        this.dep = new Set<Effect>();
    }
    get value(){
        this.track()
        return this._value
    }

    set value(newVal) {
        this._value = newVal
        this.trigger()
    }
    trigger() {
        this.dep.forEach(effect=>effect())
    }
    track() {
        if(active) this.dep.add(active)
    }
}

function watchEffect(effect:Effect):void {
    active = effect
    effect()
    active = null
}

const message = new Ref("hello")

watchEffect(()=>{
    console.log(message.value) //hello!
})

message.value = "changed!"