function middlewarePipeline (context, middleware, index) {
  const nextMiddleware = middleware[index]

  if (!nextMiddleware) {
    return context.nextPipe
  }

  return () => {
    const nextPipeline = middlewarePipeline(
      context, middleware, index + 1
    )
    nextMiddleware({ ...context, nextPipe: nextPipeline })
  }
}

export default middlewarePipeline
