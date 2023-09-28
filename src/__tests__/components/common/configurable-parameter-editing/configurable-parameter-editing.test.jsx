/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act, waitFor } from '@testing-library/react';
import { ConfigurableParameterEditing } from '@components/common/ConfigurableParameterEditing/ConfigurableParameterEditing';
import { Form } from 'antd';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

const FormWrapper = (props) => {
    const [ConfigForm] = Form.useForm();

    const myFormMock = {
        ...ConfigForm,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
    };
    return <ConfigurableParameterEditing ConfigForm={myFormMock} {...props} />;
};

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/configurableParamterEditing', () => ({
    configParamEditActions: {},
}));

const mockStore = createMockStore({
    auth: { userId: 123 },
    data: {
        ConfigurableParameterEditing: {
            isLoaded: true,
            data: [{ configurableParameterType: 'B' }],
        },
    },
});

describe('Render ConfigurableParameterEditing Component', () => {
    it('search image click should work', () => {
        const props = {
            onSearchHandle: jest.fn(),
            setFilterString: jest.fn(),
            setSearchdata: jest.fn(),
        };

        customRender(<ConfigurableParameterEditing {...props} fetchList={jest.fn()} />);

        const searchImg = screen.getByRole('img', { name: 'search' });
        act(() => {
            fireEvent.click(searchImg);
        });
    });

    it('plus Add button click should work', () => {
        const props = {
            handleAdd: jest.fn(),
            setShowSaveAndAddNewBtn: jest.fn(),
            setFooterEdit: jest.fn(),
            setIsFormVisible: jest.fn(),
            setIsReadOnly: jest.fn(),
            setFormData: jest.fn(),
            setParameterType: jest.fn(),
            setSaveAndAddNewBtnClicked: jest.fn(true),
        };

        customRender(<FormWrapper {...props} fetchList={jest.fn()} />);

        const plusAddBtn = screen.getByRole('button', { name: 'plus Add' });
        act(() => {
            fireEvent.click(plusAddBtn);
        });

        const saveAddBtn = screen.getByRole('button', { name: 'Save & Add New' });
        act(() => {
            fireEvent.click(saveAddBtn);
        });
    });

    it('should render table', () => {
        customRender(<ConfigurableParameterEditing isVisible={true} fetchList={jest.fn()} />);

        const srl = screen.getByRole('columnheader', { name: 'Srl.' });
        expect(srl).toBeTruthy();

        const controlID = screen.getByRole('columnheader', { name: 'Control ID' });
        expect(controlID).toBeTruthy();

        const controlDescription = screen.getByRole('columnheader', { name: 'Control Description' });
        expect(controlDescription).toBeTruthy();

        const configPara = screen.getByRole('columnheader', { name: 'Configurable Parameter Type' });

        expect(configPara).toBeTruthy();

        const configValues = screen.getByRole('columnheader', { name: 'Configurable Parameter Values' });
        expect(configValues).toBeTruthy();

        const controlGroup = screen.getByRole('columnheader', { name: 'Control Group' });
        expect(controlGroup).toBeTruthy();

        const action = screen.getByRole('columnheader', { name: 'Action' });
        expect(action).toBeTruthy();
    });

    it('renderTableColumnName funtion should work', () => {
        const props = {
            renderTableColumnName: jest.fn(),
            record: {
                controlGroup: 'SM',
            },
            typeData: {
                CTRL_GRP: [{ parentKey: 'CTRL_GRP' }],
            },
        };
        customRender(<ConfigurableParameterEditing {...props} fetchList={jest.fn()} />);
    });
});

describe('ConfigurableParameterEditing component button should work', () => {
    const props = {
        hanndleEditData: jest.fn(),
        setShowSaveAndAddNewBtn: jest.fn(false),
        setIsViewModeVisible: jest.fn(false),
        setFormActionType: jest.fn('update'),
        setFooterEdit: jest.fn(false),
        setIsReadOnly: jest.fn(false),
        setShowSaveBtn: jest.fn(true),
        onCloseAction: jest.fn(),
        setIsFormVisible: jest.fn(false),
        setFormBtnActive: jest.fn(false),
        setFormData: jest.fn([]),
        record: { id: '123' },
    };

    it('click should work on edit and close button', () => {
        customRender(
            <Provider store={mockStore}>
                <ConfigurableParameterEditing {...props} fetchList={jest.fn()} fetchDataList={jest.fn()} />
            </Provider>
        );

        const viewBtn = screen.getByRole('button', { name: 'ai-view' });
        act(() => {
            fireEvent.click(viewBtn);
        });

        const editBtn = screen.getByRole('button', { name: 'Edit' });
        act(() => {
            fireEvent.click(editBtn);
        });

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        act(() => {
            fireEvent.click(closeBtn);
        });
    });

    it('click should work on cancel and save button', () => {
        customRender(
            <Provider store={mockStore}>
                <ConfigurableParameterEditing {...props} fetchDataList={jest.fn()} fetchList={jest.fn()} handleEditBtn={jest.fn()} setSaveAndAddNewBtnClicked={jest.fn(false)} />
            </Provider>
        );

        const editBtn = screen.getByRole('button', { name: 'fa-edit' });
        act(() => {
            fireEvent.click(editBtn);
        });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        act(() => {
            fireEvent.click(saveBtn);
        });

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        act(() => {
            fireEvent.click(cancelBtn);
        });
    });

    it('test for refresh button and onFinishFailed', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: {
                    isLoaded: true,
                    data: [
                        { key: '1', value: 'kai' },
                        { key: '2', value: 'kai' },
                    ],
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ConfigurableParameterEditing fetchList={jest.fn()} fetchDataList={jest.fn()} />
            </Provider>
        );

        const refreshBtn = screen.getByTestId('refresh');
        act(() => {
            fireEvent.click(refreshBtn);
        });

        const addBtn = screen.getByRole('button', { name: /Add/i });
        fireEvent.click(addBtn);

        const controlDes = screen.getByRole('textbox', { name: /control description/i });
        fireEvent.change(controlDes, { target: { value: 'Kai' } });

        const saveBtn = screen.getByRole('button', { name: /save & add new/i });
        fireEvent.click(saveBtn);
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { isLoaded: true, data: [{ booleanValue: false, configurableParameterType: 'B', controlDescription: 'Time (in minutes) for which OTP is valid', controlGroup: 'CMN', controlGroupName: 'Common', controlId: 'OTPEX', fromDate: '12/12/2000', fromNumber: 5, id: '106', isActive: true, textValue: null, toDate: '12/12/2000', toNumber: 5 }] },
            },
        });

        const saveData = jest.fn();
        const fetchList = jest.fn();

        const res = { data: [{ configurableParameterType: 'B', fromDate: '12/12/2000', fromNumber: 5, id: '106', isActive: true, toDate: '12/12/2000' }] };

        customRender(
            <Provider store={mockStore}>
                <ConfigurableParameterEditing footerEdit={true} hanndleEditData={jest.fn()} saveData={saveData} fetchList={fetchList} fetchDataList={jest.fn()} />
            </Provider>
        );

        const editBtn = screen.getByRole('button', { name: 'fa-edit' });
        act(() => {
            fireEvent.click(editBtn);
        });

        const control = screen.getByRole('combobox', { name: 'Control ID' });
        fireEvent.change(control, { target: { value: 'Kai' } });

        const values = screen.getByRole('combobox', { name: 'Configurable Parameter Values' });
        fireEvent.change(values, { target: { value: 'Yes' } });

        const controlDes = screen.getByRole('textbox', { name: 'Control Description' });
        fireEvent.change(controlDes, { target: { value: 'Kai' } });

        const controlGrp = screen.getByRole('combobox', { name: 'Control Group' });
        fireEvent.change(controlGrp, { target: { value: 'Kai' } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        await waitFor(() => expect(saveData).toHaveBeenCalled());
        saveData.mock.calls[0][0].onSuccess(res);
    });
});
