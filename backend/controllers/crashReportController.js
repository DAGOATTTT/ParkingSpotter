
const asyncHandler = require('express-async-handler')
const nodeMailer = require('nodemailer')
const Mailgen = require('mailgen')
const Report = require('../models/ReportModel')
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
// @desc Get crash reports
// @route GET /api/crashReports
// @access Private
const getCrashReports = asyncHandler(async(req, res) => {
    const {parkinglot} = req.body
    console.log("Received parking lot:", parkinglot);
    const report = await Report.find({location: parkinglot})
    const output = report.length
   
    res.status(200).json({result: output}) // get report

})

/* maybe use to show all reports
const getCrashReports = asyncHandler(async(req, res) => {
    const report = await Report.find()

    res.status(200).json(report) // get report

})
*/

// @desc Create crash report
// @route POST /api/
// @access Private
const createCrashReport = asyncHandler(async (req, res) => {

    console.log(req.body.location)
    //Test Case that confirms request parameters are correct for crash reports(Daher)
    if(!req.body.location){
        res.status(400)
        throw new Error('Please add location')
    }

    const report = await Report.create({
        location: req.body.location,

    })



    const lastuser = await User.find().limit(1).sort({$natural:-1})
    let lastemail = lastuser[0].email


    //email config
    let config = {
        service: 'gmail',
        auth: {
            user : process.env.email,
            pass: process.env.password
        }
    }
    let transporter = nodeMailer.createTransport(config)

    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: "Mailgen",
            link: "https://mailgen.js/"
        }

    })

    let response = {
        body: {
            name: `${lastemail}`,
            intro: `A report has been made at ${req.body.location}`
            
        }
    }
    let mail = MailGenerator.generate(response)

    let message = {
        from: process.env.email,
        to: lastemail,
        subject: "Report Notification",
        html: mail

    }

    transporter.sendMail(message)

    console.log(report);
    res.status(200).json(report)    
   
})



// @desc Update crash report
// @route PUT /api/goals/:id
// @access Private


const updateCrashReport = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update crash report ${req.params.id}` })
})

// @desc Delete crash report
// @route DELETE /api/goals/:id
// @access Private
// Test Case: 

const deleteCrashReport = asyncHandler(async (req, res) => {
    const report = await Report.findByID(req.params.id)
    console.log(report);

    // Test case: If the report that user wants to delete does not exist within the
    // database, display error message.
    if (!report){
        res.status(400)
        throw new Error('Report not found')
    }

    const user = await User.findByID(req.user.id)

    //check for user
    // Test case: If report is found but the user does not exist within the database,
    // display user error message
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the report user
    // Test case: User can only delete reports created from user.
    if(report.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    // Test case : If all requirements (report is found, user exists, user is  autorized to delete)
    // are met then it deletes report from database
    await report.remove()

    res.status(200).json({ id: req.params.id }) // delete the report based on ID
})

module.exports = {
    getCrashReports,
    createCrashReport,
    updateCrashReport,
    deleteCrashReport,
}