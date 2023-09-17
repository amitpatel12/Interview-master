import Customer from "../model/customerModel.js"
import mongoose from "mongoose"

export const newCustomer = async (req, res) => {
    try {
        const {name, email, mobileNo, spoc, date} = req.body
        console.log('called customer')
        const customer = new Customer({name, email, mobileNo, spoc, date})

        const result = await customer.save()
        return res.status(200).json({result, msg:'success saved new customer'})
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export const getAllCustomer = async (req, res) => {
    try {
        
        const result = await Customer.find({})

        return res.status(200).json({result, msg:'successfully loaded all customers'})
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export const getCustomer = async (req, res) => {
    try {
        
        const result = await Customer.findOne({_id: req.params.id})
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
        console.log(result?.createdAt?.toLocaleDateString('en-GB', options))

        return res.status(200).json({result, msg:'successfully loaded customer'})
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export const updateCustomer = async (req, res) => {
    try {
        const {name, email, mobileNo, spoc, date} = req.body
        const result = await Customer.updateOne({_id: req.params.id}, {$set:{name, email, mobileNo, spoc, date}})

        return res.status(200).json({result, msg:'successfully updated customer'})
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export const deleteCustomer = async (req, res) => {
    try {
        
       
        const result = await Customer.deleteOne({_id: req.params.id})

        return res.status(200).json({result, msg:'successfully deleted customer'})
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export const deleteSelectedCustomer = async (req, res) => {
    try {
        
        const { ids } = req.body;
        const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
        console.log(objectIds)
      
        const result = await Customer.deleteMany({ _id: { $in: objectIds } });

        return res.status(200).json({result, msg:'successfully all deleted customer'})
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}