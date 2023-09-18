/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { CriticalityGroup } from 'components/common/CriticalityGroup/CriticalityGroup';

jest.mock('store/actions/data/criticalityGroup', () => ({
    criticalityDataActions: {}
}));

const data=[{"criticalityGroupCode":"106","criticalityGroupName":"Kai","activeIndicator":false,"criticalityDefaultGroup":false,"id":"106","allowedTimings":[]}];

describe('CriticalityGroup Components', () => {

    it('should render CriticalityGroup components', () => {
        customRender(<CriticalityGroup />);
    });

    it('search should work', () => {
        customRender(<CriticalityGroup />);

        const searchBox=screen.getByRole('textbox', { name: 'Criticality Group Name' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn=screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        fireEvent.change(searchBox, { target: { value: '' } });
        fireEvent.click(searchBtn);

    });

    it('add and edit form should work', async () => {

        const saveData=jest.fn();

        customRender(<CriticalityGroup saveFormShowLoading={jest.fn()} saveData={saveData} fetchList={jest.fn()} />);

        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        const groupId=screen.getByRole('textbox', { name: 'Criticality Group Id' });
        fireEvent.change(groupId, { target: { value: 106 } });
        
        const groupName=screen.getAllByRole('textbox', { name: 'Criticality Group Name' });
        fireEvent.change(groupName[1], { target: { value: 'Kai' } });

        const defaultGroup=screen.getByRole('switch', { name: 'Default Group' });
        fireEvent.click(defaultGroup);

        const status=screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() });

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();

    });

    it('edit and view with cancel buttons should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CriticalityGroup: { isLoaded: true, data: data },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <CriticalityGroup />
            </Provider>
        );

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const editBtn=screen.getByTestId('edit');
        fireEvent.click(editBtn);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const closeBtn=screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn[0]);

    });

    it('refresh buttons should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CriticalityGroup: { isLoaded: true, data: data },
            },
        });

        const fetchList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <CriticalityGroup fetchList={fetchList} />
            </Provider>
        );

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const refreshBtn=screen.getByTestId('refreshBtn');
        fireEvent.click(refreshBtn);

        fetchList.mock.calls[0][0].onSuccessAction();

    });

});
