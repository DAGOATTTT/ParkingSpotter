const express = require('express')
const router = express.Router()
const { 
    getCrashReports,
    createCrashReport,
    updateCrashReport,
    deleteCrashReport
} = require('../controllers/crashReportController')


//These functions' routes could be consolidated/connected, but for later readibility, I will not
router.get('/', getCrashReports)

router.post('/', createCrashReport)

router.put('/:id', updateCrashReport)

router.delete('/:id', deleteCrashReport)

module.exports = router