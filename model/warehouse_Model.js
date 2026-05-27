import pool from './db.js'

export const getShipments = async (warehouse) => {
    const response = await fetch(
        `https://logistics-and-tracking-delivery-system.onrender.com/api/shipments/`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const shipments = await response.json();

    return shipments.filter(
        (shipment) => shipment.pickupAddress === warehouse
    );
};



export const updateShipments = async (trackingNum, status) => {

    const response = await fetch(
        `https://logistics-and-tracking-delivery-system.onrender.com/api/shipments/`
    );

    const data = await response.json();

    console.log(data);

    const shipment = data.find(
        (item) => item.trackingNum === trackingNum
    );

    if (!shipment) {
        throw new Error('Shipment not found');
    }

    shipment.shipmentStatus = status;

    return shipment;
};