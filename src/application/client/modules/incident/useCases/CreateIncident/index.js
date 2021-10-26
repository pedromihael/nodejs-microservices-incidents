const ApiErrorFactory = require('../../../../../../shared/factories/ApiErrorFactory')

const apiErrorFactory = ApiErrorFactory()

function CreateIncidentUseCase(repository) {
  const execute = async (data, producer) => {
    if (data && producer) {
      const response = await repository.create(data, producer)
      return response
    } else {
      return apiErrorFactory.createError(
        'API Error',
        'CreateIncidentWithMissingData',
        400
      )
    }
  }

  return { execute }
}

module.exports = CreateIncidentUseCase
