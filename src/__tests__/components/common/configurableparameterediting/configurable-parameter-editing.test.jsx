/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act } from '@testing-library/react';
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

describe('Render ConfigurableParameterEditing Component', () => {
    it('view button click should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: {
                    isLoaded: true,
                    data: [
                        {
                            booleanValue: false,
                            configurableParameterType: 'B',
                            controlDescription: 'Time (in minutes) for which OTP is valid',
                            controlGroup: 'CMN',
                            controlGroupName: 'Common',
                            controlId: 'OTPEX',
                            controlName: 'OTP Expiry',
                            fromDate: '2-12-2022',
                            fromNumber: 5,
                            id: 'f0a04454-0ad6-4d00-b0af-1f1360b22d05',
                            isActive: true,
                            textValue: 'testt',
                            toDate: '2-12-2024',
                            toNumber: 5,
                        },
                    ],
                },
            },
        });

        const props = {
            configData: [
                {
                    booleanValue: false,
                    configurableParameterType: 'B',
                    controlDescription: 'Time (in minutes) for which OTP is valid',
                    controlGroup: 'CMN',
                    controlGroupName: 'Common',
                    controlId: 'OTPEX',
                    controlName: 'OTP Expiry',
                    fromDate: null,
                    fromNumber: 5,
                    id: 'f0a04454-0ad6-4d00-b0af-1f1360b22d05',
                    isActive: true,
                    textValue: 'test',
                    toDate: null,
                    toNumber: 5,
                },
            ],
            handleView: jest.fn(),
            setFormActionType: jest.fn('view'),
            setIsViewModeVisible: jest.fn(true),
            setShowSaveAndAddNewBtn: jest.fn(false),
            setFooterEdit: jest.fn(true),
            setIsReadOnly: jest.fn(true),
        };

        customRender(
            <Provider store={mockStore}>
                <ConfigurableParameterEditing {...props} />
            </Provider>
        );

        const viewBtn = screen.getByRole('button', { name: 'ai-view' });
        act(() => {
            fireEvent.click(viewBtn);
        });
    });

    it('edit button click should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: {
                    isLoaded: true,
                    data: [
                        {
                            booleanValue: false,
                            configurableParameterType: 'B',
                            controlDescription: 'Time (in minutes) for which OTP is valid',
                            controlGroup: 'CMN',
                            controlGroupName: 'Common',
                            controlId: 'OTPEX',
                            controlName: 'OTP Expiry',
                            fromDate: '2-12-2022',
                            fromNumber: 5,
                            id: 'f0a04454-0ad6-4d00-b0af-1f1360b22d05',
                            isActive: true,
                            textValue: 'test',
                            toDate: '2-12-2024',
                            toNumber: 5,
                        },
                    ],
                },
            },
        });

        const props = {
            configData: [
                {
                    booleanValue: false,
                    configurableParameterType: 'B',
                    controlDescription: 'Time (in minutes) for which OTP is valid',
                    controlGroup: 'CMN',
                    controlGroupName: 'Common',
                    controlId: 'OTPEX',
                    controlName: 'OTP Expiry',
                    fromDate: null,
                    fromNumber: 5,
                    id: 'f0a04454-0ad6-4d00-b0af-1f1360b22d05',
                    isActive: true,
                    textValue: 'test',
                    toDate: null,
                    toNumber: 5,
                },
            ],
            handleEditBtn: jest.fn(),
            setFormActionType: jest.fn('update'),
            setShowSaveAndAddNewBtn: jest.fn(false),
            setIsViewModeVisible: jest.fn(false),
            setFooterEdit: jest.fn(false),
            setParameterType: jest.fn(),
            record: {
                booleanValue: 1,
                configurableParameterType: 'N',
                controlDescription: 'Number of days from where password update reminder to be shown',
                controlGroup: 'RS',
                controlGroupName: ' Password update reminder',
                controlId: 'PWDRMD',
                controlName: 'Update Password Reminder',
                fromDate: null,
                fromNumber: 45,
                id: 'b61efad7-f0b0-4d06-9fc7-284d6ed4c0b0',
                isActive: true,
                textValue: 'test',
                toDate: null,
                toNumber: 45,
            },
            isViewModeVisible: false,
            isVisible: true,
            isReadOnly: false,
            isLoadingOnSave: false,
            isFormBtnActive: false,
            saveAndAddNewBtnClicked: false,
            showSaveBtn: true,
        };

        customRender(
            <Provider store={mockStore}>
                <ConfigurableParameterEditing {...props} />
            </Provider>
        );

        const editBtn = screen.getByRole('button', { name: 'fa-edit' });
        act(() => {
            fireEvent.click(editBtn);
        });
    });

    it('mockStore data for isDataLoaded false', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: {
                    isDataLoaded: false,
                    configData: [],
                },
            },
        });

        const props = {
            onCloseAction: jest.fn(),
            setIsFormVisible: jest.fn(false),
            setFormBtnActive: jest.fn(false),
            setFormData: [],
        };

        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} />
            </Provider>
        );
    });

    it('search image click should work', () => {
        const props = {
            onSearchHandle: jest.fn(),
            setFilterString: jest.fn(),
            setSearchdata: jest.fn(),
        };

        customRender(<ConfigurableParameterEditing {...props} />);

        const searchImg = screen.getByRole('img', { name: 'search' });
        act(() => {
            fireEvent.click(searchImg);
        });
    });

    it('plus Add button click should work', () => {
        const configData = [
            {
                controlGroup: 'CMN',
                controlId: 'PWDUPD',
                controlDescription: 'Days after which password needs to be updated',
                configurableParameterType: 'N',
            },
        ];
        const props = {
            ...configData,
            handleAdd: jest.fn(),
            setFormActionType: jest.fn(),
            setShowSaveAndAddNewBtn: jest.fn(),
            setIsViewModeVisible: jest.fn(),
            setFooterEdit: jest.fn(),
            setIsFormVisible: jest.fn(),
            setIsReadOnly: jest.fn(),
            setFormData: jest.fn(),
            setParameterType: jest.fn(),
            setSaveAndAddNewBtnClicked: jest.fn(true),
        };

        customRender(<FormWrapper {...props} />);

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
        customRender(<ConfigurableParameterEditing isVisible={true} />);

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

    it('filterDataItem', () => {
        const props = {
            onSearchHandle: jest.fn(),
            setFilterString: jest.fn(),
            setSearchdata: jest.fn(),
            filterString: 'm',
            userId: '1234',
            isDataLoaded: true,
            configData: [
                {
                    booleanValue: false,
                    configurableParameterType: 'B',
                    controlDescription: 'Time (in minutes) for which OTP is valid',
                    controlGroup: 'CMN',
                    controlGroupName: 'Common',
                    controlId: 'OTPEX',
                    controlName: 'OTP Expiry',
                    fromDate: null,
                    fromNumber: 5,
                    id: 'f0a04454-0ad6-4d00-b0af-1f1360b22d05',
                    isActive: true,
                    textValue: null,
                    toDate: null,
                    toNumber: 5,
                },
            ],
            filterDataItem: [
                {
                    booleanValue: false,
                    configurableParameterType: 'B',
                    controlDescription: 'Time (in minutes) for which OTP is valid',
                    controlGroup: 'CMN',
                    controlGroupName: 'Common',
                    controlId: 'OTPEX',
                    controlName: 'OTP Expiry',
                    fromDate: null,
                    fromNumber: 5,
                    id: 'f0a04454-0ad6-4d00-b0af-1f1360b22d05',
                    isActive: true,
                    textValue: null,
                    toDate: null,
                    toNumber: 5,
                },
            ],
        };

        customRender(<ConfigurableParameterEditing {...props} />);

        const searchImg = screen.getByRole('img', { name: 'search' });
        act(() => {
            fireEvent.click(searchImg);
        });
    });

    it('renderTableColumnName', () => {
        const props = {
            renderTableColumnName: jest.fn(),
            record: {
                controlGroup: 'SM',
            },
            typeData: {
                CTRL_GRP: [
                    {
                        id: 'a34e1f35-a0ac-427c-930d-6fc56457d151',
                        key: 'SM',
                        parentKey: 'CTRL_GRP',
                        value: 'Invalid login Attempts',
                    },
                ],
            },
        };
        customRender(<ConfigurableParameterEditing {...props} />);
    });

    it('click should work on edit and close button', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: {
                    isLoaded: true,
                    data: [
                        {
                            booleanValue: false,
                            configurableParameterType: 'B',
                            controlDescription: 'Time (in minutes) for which OTP is valid',
                            controlGroup: 'CMN',
                            controlGroupName: 'Common',
                            controlId: 'OTPEX',
                            controlName: 'OTP Expiry',
                            fromDate: '2-12-2022',
                            fromNumber: 5,
                            id: 'f0a04454-0ad6-4d00-b0af-1f1360b22d05',
                            isActive: true,
                            textValue: 'testt',
                            toDate: '2-12-2024',
                            toNumber: 5,
                        },
                    ],
                },
            },
        });
        const props = {
            configData: [
                {
                    booleanValue: false,
                    configurableParameterType: 'B',
                    controlDescription: 'Time (in minutes) for which OTP is valid',
                    controlGroup: 'CMN',
                    controlGroupName: 'Common',
                    controlId: 'OTPEX',
                    controlName: 'OTP Expiry',
                    fromDate: null,
                    fromNumber: 5,
                    id: 'f0a04454-0ad6-4d00-b0af-1f1360b22d05',
                    isActive: true,
                    textValue: 'test',
                    toDate: null,
                    toNumber: 5,
                },
            ],
            footerEdit: true,
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
            record: {
                booleanValue: 1,
                configurableParameterType: 'N',
                controlDescription: 'Number of days from where password update reminder to be shown',
                controlGroup: 'RS',
                controlGroupName: ' Password update reminder',
                controlId: 'PWDRMD',
                controlName: 'Update Password Reminder',
                fromDate: null,
                fromNumber: 45,
                id: 'b61efad7-f0b0-4d06-9fc7-284d6ed4c0b0',
                isActive: true,
                textValue: 'test',
                toDate: null,
                toNumber: 45,
            },
        };
        customRender(
            <Provider store={mockStore}>
                <ConfigurableParameterEditing {...props} />
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
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: {
                    isLoaded: true,
                    data: [
                        {
                            booleanValue: false,
                            configurableParameterType: 'B',
                            controlDescription: 'Time (in minutes) for which OTP is valid',
                            controlGroup: 'CMN',
                            controlGroupName: 'Common',
                            controlId: 'OTPEX',
                            controlName: 'OTP Expiry',
                            fromDate: '2-12-2022',
                            fromNumber: 5,
                            id: 'f0a04454-0ad6-4d00-b0af-1f1360b22d05',
                            isActive: true,
                            textValue: 'test',
                            toDate: '2-12-2024',
                            toNumber: 5,
                        },
                    ],
                },
            },
        });

        const props = {
            configData: [
                {
                    booleanValue: false,
                    configurableParameterType: 'B',
                    controlDescription: 'Time (in minutes) for which OTP is valid',
                    controlGroup: 'CMN',
                    controlGroupName: 'Common',
                    controlId: 'OTPEX',
                    controlName: 'OTP Expiry',
                    fromDate: null,
                    fromNumber: 5,
                    id: 'f0a04454-0ad6-4d00-b0af-1f1360b22d05',
                    isActive: true,
                    textValue: 'test',
                    toDate: null,
                    toNumber: 5,
                },
            ],
            handleEditBtn: jest.fn(),
            setFormActionType: jest.fn('update'),
            setShowSaveAndAddNewBtn: jest.fn(false),
            setIsViewModeVisible: jest.fn(false),
            setFooterEdit: jest.fn(false),
            setParameterType: jest.fn(),
            record: {
                booleanValue: 1,
                configurableParameterType: 'N',
                controlDescription: 'Number of days from where password update reminder to be shown',
                controlGroup: 'RS',
                controlGroupName: ' Password update reminder',
                controlId: 'PWDRMD',
                controlName: 'Update Password Reminder',
                fromDate: null,
                fromNumber: 45,
                id: 'b61efad7-f0b0-4d06-9fc7-284d6ed4c0b0',
                isActive: true,
                textValue: 'test',
                toDate: null,
                toNumber: 45,
            },
            isViewModeVisible: false,
            isVisible: true,
            isReadOnly: false,
            isLoadingOnSave: false,
            isFormBtnActive: false,
            saveAndAddNewBtnClicked: false,
            showSaveBtn: true,
            setSaveAndAddNewBtnClicked: jest.fn(false),
            footerEdit: false,
        };

        customRender(
            <Provider store={mockStore}>
                <ConfigurableParameterEditing {...props} />
            </Provider>
        );

        const editBtn = screen.getByRole('button', { name: 'fa-edit' });
        act(() => {
            fireEvent.click(editBtn);
        });

        const saveBtn = screen.getByRole('button', { name: 'loading Save' });
        act(() => {
            fireEvent.click(saveBtn);
        });

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        act(() => {
            fireEvent.click(cancelBtn);
        });
    });
});

describe('renderConfigurableParemetarValue func should render', () => {
    it('booleanValue', () => {
        const props = {
            renderConfigurableParemetarValue: jest.fn(),
            tblPrepareColumns: jest.fn(),
            tableColumn: [],
            record: {
                configurableParameterType: 'CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY',
                booleanValue: true,
            },
            fieldType: 'yes',
        };

        customRender(<ConfigurableParameterEditing {...props} />);
    });

    it('textValue', () => {
        const props = {
            renderConfigurableParemetarValue: jest.fn(),
            tblPrepareColumns: jest.fn(),
            tableColumn: [],
            record: {
                configurableParameterType: 'CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY',
                textValue: 'test',
            },
            fieldType: 'test',
        };

        customRender(<ConfigurableParameterEditing {...props} />);
    });

    it('undefined', () => {
        const props = {
            renderConfigurableParemetarValue: jest.fn(),
            tblPrepareColumns: jest.fn(),
            tableColumn: [],
            fieldType: undefined,
            record: {
                configurableParameterType: 'UNKNOWN_ACTION',
            },
        };

        customRender(<ConfigurableParameterEditing {...props} />);
    });
});
