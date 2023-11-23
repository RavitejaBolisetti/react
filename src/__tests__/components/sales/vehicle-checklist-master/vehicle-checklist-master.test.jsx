/* eslint-disable jest/no-mocks-import */
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { VehicleChecklistMaster } from 'components/Sales/VehicleChecklistMaster';

jest.mock('store/actions/data/sales/vehicleChecklistMaster/VehicleChecklistMaster', () => ({
    vehicleChecklistMasterDataActions: {},
}));

jest.mock('@components/Sales/VehicleChecklistMaster/AddEditForm', () => {
    const AddEditForm = ({ onFinish, onCloseAction }) => (
        <div>
            <button onClick={onFinish}>Save</button>
            <button onClick={onCloseAction}>Cancel</button>
        </div>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Vehicle Checklist Master Component', () => {
    it('should render vehicle checklist master component', () => {
        customRender(<VehicleChecklistMaster />);
    });

    it('add and cancel should work', () => {
        customRender(<VehicleChecklistMaster />);
        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('add edit form should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleChecklistMaster: {
                    VehicleChecklistMasterList: { isLoaded: true, data: [{ descriptionTitle: 'Kai', id: 106 }] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleChecklistMaster fetchVehicleChecklist={jest.fn()} saveData={jest.fn()} />
            </Provider>
        );
        const tree = screen.getByText('Kai');
        fireEvent.click(tree);
        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);
        // const status = screen.getByRole('switch', { name: 'Status' });
        // fireEvent.click(status);
        const searchText = screen.getByPlaceholderText('Search');
        fireEvent.change(searchText, { target: { value: 'Kai' } });

        const addSiblingBtn = screen.getByRole('button', { name: 'Add Sibling' });
        fireEvent.click(addSiblingBtn);

        const closeCircle = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeCircle);
        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('onFinish should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleChecklistMaster: {
                    VehicleChecklistMasterList: { isLoaded: true, data: [{ descriptionTitle: 'Kai', id: 106, attributeLevel: 'GRP', parentCode: 106, code: 106 }] },
                },
            },
        });

        const saveData = jest.fn();
        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const res = { data: { attributeLevel: 'CHKL' } };

        customRender(
            <Provider store={mockStore}>
                <VehicleChecklistMaster fetchVehicleChecklist={jest.fn()} fetchDetailList={fetchDetailList} fetchList={fetchList} saveData={saveData} />
            </Provider>
        );

        const tree = screen.getByText('Kai');
        fireEvent.click(tree);

        const addChildBtn = screen.getByRole('button', { name: 'Add Child' });
        fireEvent.click(addChildBtn);

        const subGroupDesc = screen.getByRole('textbox', { name: 'for screen reader' });
        fireEvent.change(subGroupDesc, { target: { value: 'Kai' } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });
        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();
    });

    it('add child should work for sub-group', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleChecklistMaster: {
                    VehicleChecklistMasterList: { isLoaded: true, data: [{ descriptionTitle: 'Kai', id: 106, attributeLevel: 'SUBGRP' }] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleChecklistMaster fetchVehicleChecklist={jest.fn()} />
            </Provider>
        );

        const tree = screen.getByText('Kai');
        fireEvent.click(tree);

        const addChildBtn = screen.getByRole('button', { name: 'Add Child' });
        fireEvent.click(addChildBtn);
    });

    it('add sibling should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleChecklistMaster: {
                    VehicleChecklistMasterList: { isLoaded: true, data: [{ descriptionTitle: 'Kai', id: 106 }] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleChecklistMaster fetchVehicleChecklist={jest.fn()} />
            </Provider>
        );
        const tree = screen.getByText('Kai');
        fireEvent.click(tree);

        const addSiblingBtn = screen.getByRole('button', { name: 'Add Sibling' });
        fireEvent.click(addSiblingBtn);
    });
});
