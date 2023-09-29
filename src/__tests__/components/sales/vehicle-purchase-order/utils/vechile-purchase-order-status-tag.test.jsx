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
    it('should render vehicle detail status tag component', () => {
        customRender(<VechilePurchaseOrderStatusTag />);
    });

    it('Po submitted tag should render', () => {
        const status = 4;
        customRender(<VechilePurchaseOrderStatusTag status={status} />);
    });

    it('cancel tag should render', () => {
        const status = 1;
        customRender(<VechilePurchaseOrderStatusTag status={status} />);
    });

    it('cancelled requested tag should render', () => {
        const status = 2;
        customRender(<VechilePurchaseOrderStatusTag status={status} />);
    });

    it('hold tag should render', () => {
        const status = 3;
        customRender(<VechilePurchaseOrderStatusTag status={status} />);
    });

    it('release tag should render', () => {
        const status = 5;
        customRender(<VechilePurchaseOrderStatusTag status={status} />);
    });

    it('received tag should render', () => {
        const status = 6;
        customRender(<VechilePurchaseOrderStatusTag status={status} />);
    });

    it('So generated tag should render', () => {
        const status = 7;
        customRender(<VechilePurchaseOrderStatusTag sstatus={status} />);
    });

    it('invoiced requested tag should render', () => {
        const status = 8;
        customRender(<VechilePurchaseOrderStatusTag status={status} />);
    });
});
