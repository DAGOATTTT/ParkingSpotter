// @desc Get crash reports
// @route GET /api/goals
// @access Private
const getCrashReports = (req, res) => {
    res.status(200).json({ message: 'Get crash reports' })
}

// @desc Create crash report
// @route POST /api/goals
// @access Private
const createCrashReport = (req, res) => {
    res.status(200).json({ message: 'Create crash report' })
}

// @desc Update crash report
// @route PUT /api/goals/:id
// @access Private
const updateCrashReport = (req, res) => {
    res.status(200).json({ message: `Update crash report ${req.params.id}` })
}

// @desc Delete crash report
// @route DELETE /api/goals/:id
// @access Private
const deleteCrashReport = (req, res) => {
    res.status(200).json({ message: `Delete crash report ${req.params.id}` })
}

module.exports = {
    getCrashReports,
    createCrashReport,
    updateCrashReport,
    deleteCrashReport,
}