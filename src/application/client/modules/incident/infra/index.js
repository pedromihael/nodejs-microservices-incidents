const express = require('express')
const logger = require('morgan')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(logger('dev'))

app.get('/health-check', (req, res) => {
  res.status(200).send("Wow, our meeting could not be an incident at all 😏")
})

app.listen(process.env.PORT || 3001, () => {
  console.log('Incidents service is ready ✅');
});
