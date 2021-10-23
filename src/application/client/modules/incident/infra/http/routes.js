const {
  CreateIncidentUseCase,
  DeleteIncidentUseCase,
  GetIncidentByIdUseCase,
  ListAllIncidentsUseCase,
  UpdateIncidentUseCase
} = require('../../useCases')

const { PostgresIncidentRepository } = require('../../repositories/PostgresIncidentRepository')
const repository = PostgresIncidentRepository()

const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const listAllIncidentsUseCase = ListAllIncidentsUseCase(repository)
  const response = await listAllIncidentsUseCase.execute()

  res.send(response)
})

router.get('/:id', async (req, res) => {
  const getIncidentByIdUseCase = GetIncidentByIdUseCase(repository)
  const response = await getIncidentByIdUseCase.execute(req.params.id)

  if (response.isApiError) res.status(response.code).send(response)
  
  else res.send(response)
})

router.post('/', async (req, res) => {
  const createIncidentUseCase = CreateIncidentUseCase(repository)
  const response = await createIncidentUseCase.execute(req.body)

  if (response.isApiError) res.status(response.code).send(response)
  
  else res.send(response)
})

router.put('/:id', async (req, res) => {
  const data = req.body
  const updateIncidentUseCase = UpdateIncidentUseCase(repository)
  const response = await updateIncidentUseCase.execute(req.params.id, data)

  res.send(response)
})

router.delete('/:id', async (req, res) => {
  const deleteIncidentUseCase = DeleteIncidentUseCase(repository)
  const response = await deleteIncidentUseCase.execute(req.params.id)

  res.send(response)
})

module.exports = router