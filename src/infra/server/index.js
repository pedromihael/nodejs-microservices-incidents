const express = require('express')
const logger = require('morgan')
const dotenv = require('dotenv')
const routes = require('../../application/client/modules/incident/infra/http/routes')

dotenv.config()

const app = express()

app.use(logger('dev'))

app.use(routes)

app.get('/health-check', (req, res) => {
  res.status(200).send("Wow, our meeting could not be an incident at all 😏")
})

app.listen(process.env.PORT || 3001, () => {
  console.log('Incidents service is ready ✅');
});
