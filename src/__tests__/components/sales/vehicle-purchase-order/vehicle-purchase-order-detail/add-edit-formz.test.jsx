/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/VehiclePurchaseOrder/VehiclePurchaseOrderDetail/AddEditForm';

const formActionType = {
    addMode: false,
    editMode: true,
    viewMode: true,
};

describe('add edit form Components', () => {
    it('should render add edit form components', () => {
        customRender(<AddEditForm formActionType={formActionType} isVisible={true} />);
    });
});
