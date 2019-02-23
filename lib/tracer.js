'use strict'

const { responsePathAsArray, defaultFieldResolver } = require('graphql')
const Table = require('cli-table')

class Tracer {
  constructor () {
    this.table = new Table({
      head: ['Field name', 'Parent Type', 'Return Type', 'Path', 'Duration (ns)', 'Duration (ms)']
    })
    this.tracingResolvers = []
  }

  fieldResolver () {
    const self = this
    return function (value, args, ctx, info) {
      const tracerResult = {}

      tracerResult.fieldName = info.fieldName
      tracerResult.path = [...responsePathAsArray(info.path)]
      tracerResult.parentType = info.parentType
      tracerResult.returnType = info.returnType
      tracerResult.startTime = duration(process.hrtime())

      self.tracingResolvers.push(tracerResult)

      const result = defaultFieldResolver(value, args, ctx, info)

      tracerResult.endTime = duration(process.hrtime())

      return result
    }
  }

  tracing () {
    const self = this
    return function (req, res, next) {
      res.once('finish', function () {
        self.tracingResolvers = self.tracingResolvers.map(tracingResolver => {
          const duration = tracingResolver.endTime - tracingResolver.startTime
          self.table.push([
            tracingResolver.fieldName,
            tracingResolver.parentType,
            tracingResolver.returnType,
            tracingResolver.path.join(' - '),
            duration,
            duration / 1e6
          ])

          return { ...tracingResolver, duration }
        })

        if (self.tracingResolvers.length) {
          console.log(self.table.toString())
        }
      })

      self.table = new Table({
        head: ['Field name', 'Parent Type', 'Return Type', 'Path', 'Duration (ns)', 'Duration (ms)']
      })
      self.tracingResolvers = []

      next()
    }
  }
}

function duration (hrtime) {
  return hrtime[0] * 1e9 + hrtime[1]
}

const tracer = new Tracer()

module.exports = {
  tracing: tracer.tracing(),
  fieldResolver: tracer.fieldResolver()
}
