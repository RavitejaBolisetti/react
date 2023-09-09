/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { VechilePurchaseOrderStatusTag } from '@components/Sales/VehiclePurchaseOrder/utils/VechilePurchaseOrderStatusTag';

describe('vechile purchase order status tag render', () => {
    it('should render vechile purchase order status tag component', () => {
        customRender(<VechilePurchaseOrderStatusTag />);
    });
});
