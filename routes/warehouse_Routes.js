import * as WarehouseController from '../controller/warehouse_Controller.js'
import express from 'express'
import CheckToken from '../middleware/AuthService.js'

const WarehouseRoutes = express.Router()

WarehouseRoutes.use(CheckToken)

WarehouseRoutes.post('/shipments', WarehouseController.FetchShipments)
WarehouseRoutes.put('/updateshipments/:trackingNum', WarehouseController.updateShipments)



WarehouseRoutes.post('/assign-rider/:trackingNum', WarehouseController.AssignRider)
export default WarehouseRoutes