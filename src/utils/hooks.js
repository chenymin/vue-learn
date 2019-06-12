const hooks = []

export function addHook (hook) {
  hooks.push(hook)
}

export function runHooks (context) {
  return hooks.filter(hook => hook.condition(context))
               .map(hook => hook.callback(context))
}

export function withHooks (func, context) {
  return (...args) => {
    console.log(args)
    const result = func(...args)

    if (result.then) {
      result
        .then(payload => runHooks({ ...context, payload }))
        .catch(error => runHooks({ ...context, error }))
      return result
    }

    runHooks({ ...context, payload: result })
    return result
  }
}
