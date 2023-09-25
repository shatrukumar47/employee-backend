const express = require("express");
const { EmployeeModel } = require("../models/employeeModel");
const e = require("express");

const employeeRoute = express.Router();

//add
employeeRoute.post("/add", async(req, res)=>{
    const employee = req.body;
    try {
        const data = new EmployeeModel(employee);
        await data.save();
        const addedData = await EmployeeModel.findOne({email: employee?.email})
        res.status(200).send({ msg: "Data added successfully", data: addedData });
    } catch (error) {
        res.status(400).send({ error: error });
    }
})

//get
employeeRoute.get("/", async(req, res)=>{
    try {
        let data = await EmployeeModel.find();
        res.send({data: data})
    } catch (error) {
        res.status(400).send({ error: error });
    }
})

//update
employeeRoute.patch("/update/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        await EmployeeModel.findByIdAndUpdate({_id:id}, req.body);
        res.send({"msg": "item updated successfully"})
    } catch (error) {
        res.status(400).send({ error: error });
    }
})

//delete
employeeRoute.delete("/delete/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        await EmployeeModel.findByIdAndDelete({_id:id});
        res.send({"msg": "Item Deleted"})
    } catch (error) {
        res.status(400).send({ error: error });
    }
})

module.exports = {
    employeeRoute
}