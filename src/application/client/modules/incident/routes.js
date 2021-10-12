const express = require('express');
const router = express.Router();

const {
  getIncidentById,
  registerIncident,
  getAllIncidents,
  getIncidentsByProject,
  getIncidentsByProjectGroupedByWeight,
  updateIncident,
  deleteIncident,
} = require('./controllers');

router.get('/incidents', async (req, res) => {
  const response = await getAllIncidents();
  res.send(response);
});

router.get('/incident/:id', async (req, res) => {
  const response = await getIncidentById(req.params.id);
  res.send(response);
});

router.get('/incident/projects/:projectId', async (req, res) => {
  const response = await getIncidentsByProjectGroupedByWeight(req.params.projectId);
  res.send(response);
});

router.get('/incident/projects/:projectId/detailed', async (req, res) => {
  const response = await getIncidentsByProject(req.params.projectId);
  res.send(response);
});

router.post('/incident', async (req, res) => {
  const { description, fk_severity, fk_project, id } = req.body;
  const response = await registerIncident(description, fk_severity, fk_project, id);
  res.send(response);
});

router.put('/incident', async (req, res) => {
  const { field, value, fk_project, id } = req.body;
  const response = await updateIncident(id, field, value, fk_project);

  res.send(response);
});

router.delete('/incident/:id', async (req, res) => {
  const response = await deleteIncident(req.params.id);

  res.send(response);
});

module.exports = router;
