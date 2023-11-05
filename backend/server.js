const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000

const app = express()


// so each resource has its own route file under routes...
// therefore: find each get in individual files in the routes folder
/* TODO: Add all routes for the router: Get Reports, Create a report, Delete a report */
app.use('/api/crashReports', require('./routes/crashReportRoutes'))

app.listen(port, () => console.log('Server listening on port ' + port))


 
