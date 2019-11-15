import Vue from 'vue'

export function recompute (vm, propName) {
  // handle non-existent props.
  if (!vm.$__recomputables || !vm.$__recomputables[propName]) {
    return
  }

  vm.$__recomputables[propName].backdoor++
}

export function recomputable (fn, name) {
  const reactive = Vue.observable({
    backdoor: 0
  })

  return function () {
    // initialize a map once.
    if (!this.$__recomputables) {
      this.$__recomputables = {}
    }

    // add a reference to my reactive backdoor trigger.
    if (!this.$__recomputables[fn.name || name]) {
      this.$__recomputables[fn.name || name] = reactive
    }

    reactive.backdoor // reference it!

    return fn.call(this)
  }
}
