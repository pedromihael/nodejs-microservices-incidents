const knex = require('../../../db');

const severitiesController = require('../../severity/controllers');

const projectsModel = require('../../project/models');
const providerModel = require('../../provider/models');

const ApiErrorFactory = require('../../../shared/factories/ApiErrorFactory');
const errorFactory = new ApiErrorFactory();

const getAllIncidents = async () => {
  try {
    const results = await knex('incident').orderBy('id');
    return results;
  } catch (error) {
    return errorFactory.createError(error, 'getAllIncidents');
  }
};

const getIncidentById = async (id) => {
  try {
    const result = await knex('incident').where({ id });
    return result[0];
  } catch (error) {
    return errorFactory.createError(error, 'getIncidentById');
  }
};

const getIncidentsByProject = async (fk_project) => {
  try {
    const result = await knex('incident')
      .join('severity', 'severity.id', 'incident.fk_severity')
      .join('severity_enum', 'fk_severity_enum', 'severity_enum.id')
      .select(
        'severity_enum.name',
        'severity.weight',
        'severity.id',
        'incident.id',
        'incident.description',
        'incident.fk_severity',
      )
      .where({ 'incident.fk_project': fk_project })
      .orderBy('incident.id');
    return result;
  } catch (error) {
    return errorFactory.createError(error, 'getIncidentsByProject');
  }
};

const getProjectByIncident = async (id) => {
  try {
    const result = await knex('incident').where({ id });
    return result[0];
  } catch (error) {
    return errorFactory.createError(error, 'getIncidentByProjectId');
  }
};

const getIncidentsByProjectGroupedByWeight = async (fk_project) => {
  try {
    const groups = await knex('incident')
      .count('fk_severity')
      .select('fk_severity')
      .where({ fk_project })
      .groupBy(['fk_severity']);

    const total = await knex('incident').count('*').where({ fk_project });

    return { groups, total: total[0].count };
  } catch (error) {
    console.log('error', error);
    return errorFactory.createError(error, 'getIncidentsByProjectGroupedByWeight');
  }
};

const registerIncident = async (description, fk_severity, fk_project, id) => {
  try {
    await knex('incident').insert({ description, fk_severity, fk_project, id });

    const incidentsByProject = await getIncidentsByProject(fk_project);
    await projectsModel.updateReliability(fk_project, fk_severity, incidentsByProject, 'create');
    await providerModel.updateReliability(fk_project);

    return { ok: true };
  } catch (error) {
    console.log('error', error);
    return errorFactory.createError(error, 'registerIncident');
  }
};

const updateIncident = async (id, field, value, fk_project) => {
  try {
    if (field === 'weight') {
      const incidentsByProject = await getIncidentsByProject(fk_project);
      const { id: fk_severity } = await severitiesController.getSeverityByWeight(value);

      if (fk_severity) {
        await knex('incident').update({ fk_severity }).where({ id });
        await projectsModel.updateReliability(fk_project, fk_severity, incidentsByProject, 'update');
        await providerModel.updateReliability(fk_project);
      } else {
        return errorFactory.createError(
          'This weight is not supported. Choose one of these: 1, 5, 10, 100.',
          'updateIncident',
        );
      }
    } else {
      await knex('incident')
        .update({ [`${field}`]: value })
        .where({ id });
    }

    return { ok: true };
  } catch (error) {
    console.log('error', error);
    return errorFactory.createError(error, 'updateIncident');
  }
};

const deleteIncident = async (id) => {
  try {
    const { fk_project, fk_severity } = await getProjectByIncident(id);
    const incidentsByProject = await getIncidentsByProject(fk_project);

    await knex('incident').where({ id }).delete();

    await projectsModel.updateReliability(fk_project, fk_severity, incidentsByProject, 'delete');
    await providerModel.updateReliability(fk_project);

    return { ok: true };
  } catch (error) {
    return errorFactory.createError(error, 'deleteIncident');
  }
};

module.exports = {
  getAllIncidents,
  getIncidentById,
  getIncidentsByProject,
  getIncidentsByProjectGroupedByWeight,
  getProjectByIncident,
  registerIncident,
  updateIncident,
  deleteIncident,
};
