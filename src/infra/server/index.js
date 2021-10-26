const express = require('express')
const logger = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const { producer } = require('../../application/client/modules/incident/infra/kafka/producers')
const routes = require('../../application/client/modules/incident/infra/http/routes')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(logger('dev'))

app.get('/health-check', (req, res) => {
  res.status(200).send("Wow, our meeting could not be an incident at all 😏")
})

app.use((req, res, next) => {
  req.producer = producer;

  return next();
})

app.use(routes)

const run = async () => {
  await producer.connect()

  app.listen(process.env.PORT || 3001, () => {
    console.log('Incidents service is ready ✅');
  });
}

run().catch(err => console.error(err))