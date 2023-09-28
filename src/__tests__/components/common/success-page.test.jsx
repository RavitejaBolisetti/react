/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
<<<<<<< HEAD:src/__tests__/pages/sales/VehicleAllotmentPriorityMaster/vehicle-allotment-priority-master-page.test.jsx
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { VehicleAllotmentPriorityMasterPage } from '@pages/Sales/VehicleAllotmentPriorityMaster/VehicleAllotmentPriorityMasterPage';

describe('vehicle allotment priority master Components', () => {
    it('should render vehicle allotment priority Master Page components', () => {
        customRender(<VehicleAllotmentPriorityMasterPage />);
=======
import customRender from '@utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import SuccessPage from 'components/common/SuccessPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Success Page Component', () => {

    it('should render left panel', async () => {
        customRender(<SuccessPage />);
>>>>>>> feature:src/__tests__/components/common/success-page.test.jsx
    });

});
