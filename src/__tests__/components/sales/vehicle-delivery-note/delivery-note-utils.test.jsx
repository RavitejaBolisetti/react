import React from 'react';
import { validateDeliveryNote } from '@components/Sales/VehicleDeliveryNote/utils/validateDeliveryNote';
import customRender from '@utils/test-utils';
import { VEHICLE_DELIVERY_NOTE_SECTION } from 'constants/vehicleDeliveryNoteSection';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('validateDeliveryNote', () => {
    it('should return 1 for Finance Details when sold by dealer', () => {
        const item = { id: VEHICLE_DELIVERY_NOTE_SECTION.FINANCE_DETAILS.id };
        const soldByDealer = true;
        const result = validateDeliveryNote({ item, soldByDealer });
        expect(result).toBe(1);
    });

    it('should return 0 for Finance Details when not sold by dealer', () => {
        const item = { id: VEHICLE_DELIVERY_NOTE_SECTION.FINANCE_DETAILS.id };
        const soldByDealer = false;
        const result = validateDeliveryNote({ item, soldByDealer });
        expect(result).toBe(0);
    });

    it('should return 1 for Add-On Details when sold by dealer', () => {
        const item = { id: VEHICLE_DELIVERY_NOTE_SECTION.ADD_ON_DETAILS.id };
        const soldByDealer = true;
        const result = validateDeliveryNote({ item, soldByDealer });
        expect(result).toBe(1);
    });

    it('should return 0 for Add-On Details when not sold by dealer', () => {
        const item = { id: VEHICLE_DELIVERY_NOTE_SECTION.ADD_ON_DETAILS.id };
        const soldByDealer = false;
        const result = validateDeliveryNote({ item, soldByDealer });
        expect(result).toBe(0);
    });

    it('should return 1 for default case', () => {
        const item = { id: 'unknown' };
        const soldByDealer = true;
        const result = validateDeliveryNote({ item, soldByDealer });
        expect(result).toBe(1);
    });
});
