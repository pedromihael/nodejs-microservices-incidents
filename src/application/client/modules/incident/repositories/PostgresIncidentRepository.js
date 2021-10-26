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
      if (result.length) {
        return result[0]
      } else {
        return null
      }
    } catch (error) {
      return errorFactory.createError(error, 'findIncidentById')
    }
  }
  
  const create = async (data, kafkaProducer) => {
    try {
      const { description, fk_severity, fk_project, id } = data
      await knex('incident').insert({ description, fk_severity, fk_project, id })

      await kafkaProducer.send({
        topic: 'update-project-reliability',
        messages: [
          { value: JSON.stringify({ fk_severity, fk_project }) },
        ],
      })

      // await kafkaProducer.send({
      //   topic: 'update-provider-reliability',
      //   messages: [
      //     { value: JSON.stringify({ fk_severity, fk_project }) },
      //   ],
      // })
  
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