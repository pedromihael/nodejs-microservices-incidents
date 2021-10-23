const knex = require('../../../../../infra/db/adapters/knex')
const ApiErrorFactory = require('../../../../../shared/factories/ApiErrorFactory')

const errorFactory = ApiErrorFactory()

function PostgresIncidentRepository() {
  const findAll = async () => {
    try {
      const results = await knex('incident').orderBy('id')
      return results
    } catch (error) {
      return errorFactory.createError(error, 'findAllIncidents')
    }
   }
  
  const findById = async id => {
    try {
      const result = await knex('incident').where({ id })
      return result[0]
    } catch (error) {
      return errorFactory.createError(error, 'findIncidentById')
    }
  }
  
  const create = async data => {
    try {
      const { description, fk_severity, fk_project, id } = data
      await knex('incident').insert({ description, fk_severity, fk_project, id })

      // this should be sent to projects and providers with kafka

      // const incidentsByProject = await getIncidentsByProject(fk_project)
      // await projectsModel.updateReliability(fk_project, fk_severity, incidentsByProject, 'create')
      // await providerModel.updateReliability(fk_project)
  
      return { ok: true }
    } catch (error) {
      return errorFactory.createError(error, 'createIncident')
    }
   }
  
  const save = async (id, data) => {
    try {
      const { field, value } = data

      if (field === 'weight') {
        // this should be sent to severities with kafka and calculated in each service
      } 
      
      
      await knex('incident')
        .update({ [`${field}`]: value })
        .where({ id });
      
  
      return { ok: true };
    } catch (error) {
      console.log('error', error);
      return errorFactory.createError(error, 'updateIncident');
    }
  }
  
  const remove = async id => {
    try {  
      await knex('incident').where({ id }).delete();
  
      // this should be sent to severities with kafka and calculated in each service

      // await projectsModel.updateReliability(fk_project, fk_severity, incidentsByProject, 'delete');
      // await providerModel.updateReliability(fk_project);
  
      return { ok: true };
    } catch (error) {
      return errorFactory.createError(error, 'deleteIncident');
    }
  }

  return {
    findAll,
    findById,
    create,
    save,
    remove
  }
}

module.exports = { PostgresIncidentRepository }