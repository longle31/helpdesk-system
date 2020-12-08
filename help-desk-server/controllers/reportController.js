// add_new_report

const Report = require("../models/report")

const add_a_new_report = (req, res) =>{
    const report = new Report(req.body.report);
    console.log(report);
    report.reportDate = new Date();
    report.save()
    .then(report => {
        res.json({error:'add_succeeded',report: report})
        
    })
    .catch(err => res.json({error: err}));
}

const get_all_reports = (req, res) =>{
    Report.find({})
    .then(reports => {
        res.json({error: 'load_succeeded',reports:reports})
    })
    .catch(err => res.json({error: err.message})); 
}

const get_report_by_device = (req, res) =>{
    Report.find({device: req.params.id})
    .then(reports => res.json(reports))
    .catch(err => res.json({message: err.message}));
}

const get_reports_by_employee = (req, res)=>{

    Report.find({employee: req.params.id})
    .then(reports => {
        console.log(reports);res.json({error:'load_reports_successfully',reports})})
    .catch(err => res.json({message: err.message}));
}
const update_report = (req, res) =>{
    console.log(req.body.report);
    Report.findOneAndUpdate({_id: req.params.id}, req.body.report)
    .then(report => Report.findOne({_id: req.params.id}))
    .then(report => res.json({error:'update_successfully', report}))
    .catch(err => res.json({error: err.message}));
}
const delete_report = (req, res) => {
    Report.findByIdAndDelete({_id: req.params.id})
    .then(report => res.send({error: 'delete_successfully', report}))
    .catch(err => res.json({message: err.message}));
}
const get_report_by_id = (req, res)=>{
    Report.findOne({_id : req.params.id})
    .then(report => res.json({error: 'check_status_successfully', report}))
    .catch(error => res.json({error: error.message}));
}
const check_report_status = (req, res)=>{
    Report.findOne({_id : req.params.id})
    .then(report => {console.log(report.status); res.json({error: 'check_status_successfully', status:report.status})})
    .catch(error => res.json({error: error.message}));
}

module.exports = {add_a_new_report, get_all_reports,check_report_status,get_report_by_id, get_report_by_device, get_reports_by_employee, get_reports_by_employee,update_report, delete_report};