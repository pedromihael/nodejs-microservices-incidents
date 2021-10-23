const ApiErrorFactory = require('../../../../../../shared/factories/ApiErrorFactory')

const apiErrorFactory = ApiErrorFactory()

function CreateIncidentUseCase(repository) {
  const execute = async data => {
    console.log('data', data)
    if (data) {
      const response = await repository.create(data)
      return response
    } else {
      const error = apiErrorFactory.createError(
        'API Error',
        'CreateIncidentWithMissingData',
        400
      )
      console.log("error", error)
      return error
    }
  }

  return { execute }
}

module.exports = CreateIncidentUseCase
