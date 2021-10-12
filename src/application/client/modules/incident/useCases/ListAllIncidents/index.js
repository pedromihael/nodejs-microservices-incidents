const ApiErrorFactory = require('../../../../../../shared/factories/ApiErrorFactory')

const apiErrorFactory = ApiErrorFactory()

function ListAllIncidentsUseCase(repository) {
  const execute = async () => {
    try {
      const response = await repository.findAll()
      return response
    } catch (error) {
      return apiErrorFactory.createError(
        'API Error',
        'CannotListAllIncidents',
        400
      )
    }
  }

  return { execute }
}

module.exports = ListAllIncidentsUseCase
