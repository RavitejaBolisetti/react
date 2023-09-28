import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { ManufacturerAdminstrativeHierarchy } from '@components/common/ManufacturerAdminstrativeHierarchy/ManufacturerAdminstrativeHierarchy';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

describe('ManufacturerAdminstrativeHierarchyMain', () => {
    it('renders without errors', () => {
        customRender(<ManufacturerAdminstrativeHierarchy />);
    });

    it('displays the organization select field', () => {
        customRender(<ManufacturerAdminstrativeHierarchy />);
        const organizationSelect = screen.getByRole("combobox", { name: '' });
        expect(organizationSelect).toBeInTheDocument();
    });

    it('displays the search input when an organization is selected', () => {
        const manufacturerAdminHierarchyData = [{
            attributeKey: null,
            id: "19ec8958-f007-4835-be24-4bc9bd332719",
            manufactureAdminCode: "6e85eee5-4cfc-40cf-90e7-0dce9acbc2e4",
            manufactureAdminLongName: "testing",
            manufactureAdminParntId: "null",
            manufactureAdminShortName: "test",
            manufactureOrganizationId: "91398ed9-9128-4a8d-8165-9dac67e91f61",
            status: true
        }];

        const mockStore = createMockStore({
            auth: { userId: 1232 },
            data: {
                ManufacturerOrgHierarchy: { isLoaded: true, data: manufacturerAdminHierarchyData },
                ManufacturerAdmin: {
                    ManufacturerAdminHierarchy: { data: ['Tax Test', 'Charges Test'] }
                },
            },
        })

        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const treeSelectFieldProps = {
            treeFieldNames: "test",
            treeData: manufacturerAdminHierarchyData,
            selectedTreeSelectKey:123,
            defaultParent: false,
            handleSelectTreeClick: jest.fn(),
            HandleClear: jest.fn(),
            defaultValue: 'organizationId',
            placeholder: 'Organization Hierarchy',
        };

        customRender(
            <Provider store={mockStore}>
                <ManufacturerAdminstrativeHierarchy treeSelectFieldProps={treeSelectFieldProps} fetchDetailList={fetchDetailList} fetchList={fetchList} />
            </Provider>
        );
        const organizationSelect = screen.getByRole("combobox", { name: '' });
        fireEvent.change(organizationSelect, { target: { value: 'some value' } });
    });

});