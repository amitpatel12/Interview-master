import express from 'express'
const router = express.Router()

import { deleteCustomer, deleteSelectedCustomer, getAllCustomer, getCustomer, newCustomer, updateCustomer } from '../controller/customerController.js'

router.post('/contacts', newCustomer)
router.get('/contacts/:id', getCustomer)
router.get('/contacts', getAllCustomer)
router.put('/contacts/:id', updateCustomer)
router.delete('/contacts/:id', deleteCustomer)
router.post('/contacts/delete', deleteSelectedCustomer)

export default router