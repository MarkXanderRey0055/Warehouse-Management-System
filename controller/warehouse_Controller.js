import * as WarehouseModel from '../model/warehouse_Model.js'

export const FetchShipments = async (req, res) => {

    const { warehouse } = req.query

    try {

        const shipments = await WarehouseModel.getShipments(warehouse)

        res.status(200).json({
            success: true,
            message: shipments
        })

    } catch (e) {

        console.log(e)

        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })

    }
}


export const updateShipments = async (req, res) => {

    const { status } = req.query
    const { trackingNum } = req.params

    try {

        const shipments = await WarehouseModel.updateShipments(trackingNum, status)

        res.status(200).json({
            success: true,
            message: shipments
        })

    } catch (e) {

        console.log(e)

        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })

    }
}