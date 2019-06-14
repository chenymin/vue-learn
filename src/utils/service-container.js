const RepositoryInterface = {
  find () {},
  list () {}
}

function bind (repositoryFactory, Interface) {
  return {
    ...Object.keys(Interface).reduce((prev, method) => {
      const resolveableMethod = async (...args) => {
        const repository = await repositoryFactory()
        return repository.default[method](...args)
      }
      return { ...prev, [method]: resolveableMethod }
    }, {})
  }
}

export default {
  get productRepository () {
    // Delay loading until a method of the repository is called.
    return bind(() => import('@/views/ioc/product'), RepositoryInterface)
  },
  get userRepository () {
    // Load the repository immediately when it's injected.
    const userRepositoryPromise = import('@/views/ioc/user')
    return bind(() => userRepositoryPromise, RepositoryInterface)
  }
}
