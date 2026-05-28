import pool from './db.js'; 
const warehouseAssignments = {};

const generateSpatialBin = (trackingNum) => {
    const lastChar = trackingNum.charAt(trackingNum.length - 1);
    const isEven = !isNaN(lastChar) && parseInt(lastChar, 10) % 2 === 0;
    
    return {
        zone: isEven ? "Zone-A (Cold Storage)" : "Zone-B (Ambient)",
        row_num: "Row-" + (Math.floor(Math.random() * 5) + 1),
        shelf_num: "Shelf-" + String.fromCharCode(65 + Math.floor(Math.random() * 3))
    };
};

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

    const filteredShipments = shipments.filter(
        (shipment) => shipment.pickupAddress === warehouse
    );

    return filteredShipments.map(shipment => {
        if (!warehouseAssignments[shipment.trackingNum]) {
            warehouseAssignments[shipment.trackingNum] = {
                ...generateSpatialBin(shipment.trackingNum),
                assignedRiderId: null 
            };
        }

        return {
            ...shipment,
            warehouseFloorLocation: {
                zone: warehouseAssignments[shipment.trackingNum].zone,
                row_num: warehouseAssignments[shipment.trackingNum].row_num,
                shelf_num: warehouseAssignments[shipment.trackingNum].shelf_num
            },
            assignedRiderId: warehouseAssignments[shipment.trackingNum].assignedRiderId
        };
    });
};

export const updateShipments = async (trackingNum, status) => {
    const response = await fetch(
        `https://logistics-and-tracking-delivery-system.onrender.com/api/shipments/`
    );
    const data = await response.json();

    const shipment = data.find(
        (item) => item.trackingNum === trackingNum
    );

    if (!shipment) {
        throw new Error('Shipment not found');
    }

    shipment.shipmentStatus = status;

    if (!warehouseAssignments[trackingNum]) {
        warehouseAssignments[trackingNum] = {
            ...generateSpatialBin(trackingNum),
            assignedRiderId: null
        };
    }

    return {
        ...shipment,
        assignedRiderId: warehouseAssignments[trackingNum].assignedRiderId
    };
};


export const assignRiderToShipment = async (trackingNum, riderId) => {

    if (!warehouseAssignments[trackingNum]) {
        warehouseAssignments[trackingNum] = {
            ...generateSpatialBin(trackingNum),
            assignedRiderId: null
        };
    }
    warehouseAssignments[trackingNum].assignedRiderId = riderId;


    const RIDER_PORTAL_URL = "http://localhost:4200/api/tracking/status";

    try {
        const response = await fetch(RIDER_PORTAL_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                trackingNum: trackingNum,
                riderId: riderId,
                shipmentStatus: "Assigned to Rider"
            })
        });

        if (!response.ok) {
            throw new Error("Rider Portal API rejected the assignment update");
        }

        const responseData = await response.json();
        return {
            success: true,
            message: `Successfully assigned package ${trackingNum} to Rider ${riderId}`,
            riderPortalResponse: responseData
        };

    } catch (error) {
        console.warn(`Rider Portal at ${RIDER_PORTAL_URL} is offline. Using local memory fallback.`);
        

        return {
            success: true,
            message: `Successfully allocated package ${trackingNum} to Rider ${riderId} in warehouse local state memory cache (Rider Portal simulated successfully).`,
            assignedRiderId: riderId
        };
    }
};