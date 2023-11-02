/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { VechilePurchaseOrderStatusTag } from 'components/Sales/VehiclePurchaseOrder/utils/VechilePurchaseOrderStatusTag';

describe('vechile purchase order status tag render', () => {
    it('should render vehicle detail status tag component', () => {
        VechilePurchaseOrderStatusTag('POS');
        VechilePurchaseOrderStatusTag('C');
        VechilePurchaseOrderStatusTag('CR');
        VechilePurchaseOrderStatusTag('H');
        VechilePurchaseOrderStatusTag('R');
        VechilePurchaseOrderStatusTag('REC');
        VechilePurchaseOrderStatusTag('SOG');
        VechilePurchaseOrderStatusTag('INV');
    });
});
