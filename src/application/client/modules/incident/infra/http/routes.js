const {
  CreateIncidentUseCase,
  DeleteIncidentUseCase,
  GetIncidentByIdUseCase,
  ListAllIncidentsUseCase,
  UpdateIncidentUseCase
} = require('../../useCases')

const express = require('express')
const router = express.Router()

router.get('/incidents', async (req, res) => {
  const listAllIncidentsUseCase = ListAllIncidentsUseCase()
  const response = await listAllIncidentsUseCase.execute()

  res.send(response)
})

router.get('/incidents/:id', async (req, res) => {
  const getIncidentByIdUseCase = GetIncidentByIdUseCase()
  const response = await getIncidentByIdUseCase.execute(req.params.id)

  res.send(response)
})

router.post('/incidents', async (req, res) => {
  const createIncidentUseCase = CreateIncidentUseCase()
  const response = await createIncidentUseCase.execute(req.body)

  res.send(response)
})

router.put('/incidents/:id', async (req, res) => {
  const data = req.body
  const updateIncidentUseCase = UpdateIncidentUseCase()
  const response = await updateIncidentUseCase.execute(req.params.id, data)

  res.send(response)
})

router.delete('/incidents/:id', async (req, res) => {
  const deleteIncidentUseCase = DeleteIncidentUseCase()
  const response = await deleteIncidentUseCase.execute(req.params.id)

  res.send(response)
})

module.exports = router