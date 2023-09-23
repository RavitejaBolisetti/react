import React from 'react';
import { ViewTimeline } from 'components/Sales/VehicleTracking/ViewTimeline';
import customRender from '@utils/test-utils';

describe('Time Line Component', () => {

    it('should render time line component UI', () => {
        customRender(<ViewTimeline isVisible={true} />)
    });

    it('should check shipment status', () => {
        const formDataDispatched = {
            vehicleTrackingDeliveryStatus: ['1'],
            shipmentStatus: 'Dispatched'
        }
        customRender(<ViewTimeline isVisible={true} formData={formDataDispatched} />);
    
        const formDataDelivered = {
            vehicleTrackingDeliveryStatus: ['1', '2'],
            shipmentStatus: 'Delivered'
        }
        customRender(<ViewTimeline isVisible={true} formData={formDataDelivered} />);

        const formDataReceived={
            vehicleTrackingDeliveryStatus: ['1', '2'],
            shipmentStatus: 'Received'
        }
        customRender(<ViewTimeline isVisible={true} formData={formDataReceived} />);

        const formData={
            vehicleTrackingDeliveryStatus: ['1', '2', '3'],
            shipmentStatus: 'Received'
        }
        customRender(<ViewTimeline isVisible={true} formData={formData} />);
    });
    
});