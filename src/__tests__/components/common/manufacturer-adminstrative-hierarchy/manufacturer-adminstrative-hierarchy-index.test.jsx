

/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { ManufacturerAdminstrativeHierarchy, ManufactureAdminHierarchyUpload } from '@components/common/ManufacturerAdminstrativeHierarchy';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Manufacturer Adminstrative Hierarchy components', () => {
    it('should render ManufacturerAdminstrativeHierarchy components', () => {
        customRender(<ManufacturerAdminstrativeHierarchy />)
    });

    it('should render ManufactureAdminHierarchyUpload components', () => {
        customRender(<ManufactureAdminHierarchyUpload />)
    });
});