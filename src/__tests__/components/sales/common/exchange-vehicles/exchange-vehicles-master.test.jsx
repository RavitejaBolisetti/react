/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-debugging-utils */
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ExchangeVehiclesMaster } from 'components/Sales/Common/ExchangeVehicles/ExchangeVehiclesMaster';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { Form, Button } from 'antd';

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = ({ onFinish }) => (
    <div>
        <Button htmlType="submit" type="primary" onClick={onFinish}>
            Save
        </Button>
    </div>
);

jest.mock('components/Sales/Common/ExchangeVehicles/AddEditForm', () => {
    const AddEditForm = ({ handleFilterChange, fnSetData }) => { 
        return (
            <div>
                <button onClick={() => { handleFilterChange('make', 'Kai'); handleFilterChange('make'); fnSetData(); }}>Make</button>
                <button onClick={() => { handleFilterChange('modelGroup', 'Kai'); handleFilterChange('modelGroup'); fnSetData({data: { make: 'Kai' }}); }}>Modal Group</button>
                <button onClick={() => { handleFilterChange('Kai', 'Kai'); handleFilterChange('Kai'); fnSetData({data: { name: 'Kai' }}); }}>Default</button>
            </div>
        );
    };
    return {
        __esModule: true,
        AddEditForm,
    };
});


const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myMock = {
        ...form,
    };

    return <ExchangeVehiclesMaster form={myMock} {...props} />;
};

jest.mock('store/actions/data/otf/exchangeVehicle', () => ({
    schemeDataActions: {},
}));

const exchangeData = { exchange: 1 };

describe('Exchange vehicles master component render', () => {
    it('save button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    ExchangeVehicle: { isLoaded: true, data: exchangeData },
                },
            },
        });

        const exchangeDataPass={ make: 'MM', modelGroup: 'MG' };
        const saveData=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} resetData={jest.fn()} salesModuleType={"otf"} setButtonData={jest.fn()} exchangeDataPass={exchangeDataPass} selectedRecordId={106} fetchList={jest.fn()} saveData={saveData} handleButtonClick={jest.fn()} selectedOrder={{modelCode: 106}} formActionType={{viewMode: true}} />
            </Provider>
        );

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() });

        saveData.mock.calls[0][0].onSuccess();
    });

    it('filter change should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    ExchangeVehicle: { isLoaded: true, data: exchangeData },
                },
                ConfigurableParameterEditing: { filteredListData: { VEHCL_MFG: [{ key: 'Kai', value: 'Kai' }] } },
            },
        });

        const exchangeDataPass={ make: 'Kai', modelGroup: 'MG', exchange: 1 }

        customRender(
            <Provider store={mockStore}>
                <FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} resetData={jest.fn()} salesModuleType={"otf"} setButtonData={jest.fn()} exchangeDataPass={exchangeDataPass} handleFormValueChange={jest.fn()} />
            </Provider>
        );
        
        fireEvent.click(screen.getByRole('button', { name: 'Make' }));
        fireEvent.click(screen.getByRole('button', { name: 'Modal Group' }));
        fireEvent.click(screen.getByRole('button', { name: 'Default' }));

    });
});
