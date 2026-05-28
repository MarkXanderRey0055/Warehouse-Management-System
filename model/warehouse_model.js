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

const warehouseTracking = [
    {
        trackingNum: "TRK123",
        aisle: "A1",
        rack: "Rack-5",
        section: "Electronics"
    },
    {
        trackingNum: "TRK456",
        aisle: "B2",
        rack: "Rack-2",
        section: "Clothing"
    }
];

const warehouseLocations = [
    {
        trackingNum: "TRK-1001",
        aisle: "A1",
        rack: "Rack-5",
        section: "Electronics"
    },
    {
        trackingNum: "TRK1002",
        aisle: "B2",
        rack: "Rack-3",
        section: "Accessories"
    },
    {
        trackingNum: "TRK-1003",
        aisle: "C1",
        rack: "Rack-7",
        section: "Fragile"
    }
]

export const getShipmentLocation =
async (trackingNum) => {

    const shipment =
    warehouseLocations.find(
        item =>
        item.trackingNum === trackingNum
    )

    if(!shipment){

        throw new Error(
            'Shipment location not found'
        )
    }

    return shipment
}

export const updateShipmentLocation =
async (
    trackingNum,
    aisle,
    rack,
    section
) => {

    const shipment =
    warehouseLocations.find(
        item =>
        item.trackingNum === trackingNum
    )

    if(!shipment){

        throw new Error(
            'Shipment location not found'
        )
    }

    shipment.aisle = aisle
    shipment.rack = rack
    shipment.section = section

    return shipment
}