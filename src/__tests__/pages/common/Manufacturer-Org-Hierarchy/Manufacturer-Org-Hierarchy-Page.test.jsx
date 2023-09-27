/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { ManufacturerOrgHierarchyPage } from '@pages/common/ManufacturerOrganizationHierarchy/ManufacturerOrgHierarchyPage';

jest.mock('pages/common/PageHeader', () => {
    const PageHeader = ({ handleChangeHistoryClick }) => <div><button onClick={handleChangeHistoryClick}>Change History</button></div>;
    return {
        __esModule: true,
        PageHeader,
    };
});

describe('ManufacturerOrgHierarchyPage Components', () => {

    it('should render Manufacturer Org HierarchyPage components', () => {
        customRender(<ManufacturerOrgHierarchyPage />);
        fireEvent.click(screen.getByRole('button', { name: 'Change History'}));
    });

});
