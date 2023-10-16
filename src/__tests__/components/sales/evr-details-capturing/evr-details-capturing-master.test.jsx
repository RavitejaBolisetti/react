/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { EvrDetailsCapturingMaster } from '@components/Sales/EvrDetailsCapturing/EvrDetailsCapturingMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('@components/Sales/EvrDetailsCapturing/AddEditForm', () => {
    const AddEditForm = ({ onFinish }) => (
        <div>
            <button onClick={onFinish}>Save</button>
        </div>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('store/actions/data/evrDetailsCapturing/evrDetailsCapturing', () => ({
    evrDetailsCapturingDataActions: {},
}));

jest.mock('store/actions/data/productHierarchy', () => ({
    productHierarchyDataActions: {},
}));

const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    return <EvrDetailsCapturingMaster advanceFilterForm={advanceFilterForm} {...props} />;
};

const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

describe('Evr details capturing master render', () => {
    it('Should render Evr details capturing master components', () => {
        customRender(<EvrDetailsCapturingMaster fetchProductList={jest.fn()} />);
    });

    it('reset button should work', () => {
        customRender(<FormWrapper setFilterString={jest.fn()} fetchProductList={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<FormWrapper fetchProductList={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('test for onfinish failed', async () => {
        customRender(<FormWrapper isVisible={true} fetchProductList={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const searchBtn = screen.getByRole('button', { name: /Apply/i });
        fireEvent.click(searchBtn);
    });

    it('advance filter Clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ProductHierarchy: [{ active: null, attributeKey: null, attributeType: 'PD', disabled: true, id: 'IG', mfgOrgSk: null, parntProdctCode: null, parntProdctId: null, prodctCode: 'IG', prodctLongName: 'Xylo', prodctShrtName: 'Xylo' }],
                EvrDetailsCapturing: {
                    EvrDetailsCapturingSearchList: [
                        {
                            data: [{ chargingStatus: 'DUE FOR CHARGING', id: '81b5f880-7a07-4a5e-aa34-629c9eeedeb8', modelCode: 'ALFLMM8585890582', modelDescription: 'MAHINDRA ALFA LC PLUS DSL BSVI WARM RED', modelGroupCode: 'LOGN' }],
                            evrDetailData: [{ ageInDays: '279', chargeIndicator: false, chargingDueDate: '2023-07-18T10:04:31.076+00:00', chargingStatus: 'DUE FOR CHARGING', grnDate: '2022-12-31T00:00:00.000+00:00', grnId: 'GRN23A000425', grnStatus: 'RCV', id: '81b5f880-7a07-4a5e-aa34-629c9eeedeb8', lastChargeDate: '2023-07-03T10:04:31.076+00:00', modelCode: 'ALFLMM8585890582', modelDescription: 'MAHINDRA ALFA LC PLUS DSL BSVI WARM RED', modelGroupCode: 'LOGN', remarks: 'charged vehicle', vehicleStatus: null, vin: 'MA1LV2NR9N3A15434' }],
                            filter: [{ advanceFilter: true, dueFromDate: '2023-10-01', dueToDate: '2023-10-05', model: 'LOGN' }],
                        },
                    ],
                },
            },
        });
        const saveData = jest.fn();
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <EvrDetailsCapturingMaster setFilterString={jest.fn()} fetchProductList={jest.fn()} saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const advanceFilter = screen.getByPlaceholderText(/Search Model Description/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(clearBtn);
    });

    it('onFinish should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ProductHierarchy: [{ active: null, attributeKey: null, attributeType: 'PD', disabled: true, id: 'IG', mfgOrgSk: null, parntProdctCode: null, parntProdctId: null, prodctCode: 'IG', prodctLongName: 'Xylo', prodctShrtName: 'Xylo' }],
                EvrDetailsCapturing: {
                    EvrDetailsCapturingSearchList: [
                        {
                            data: [{ chargingStatus: 'DUE FOR CHARGING', id: '81b5f880-7a07-4a5e-aa34-629c9eeedeb8', modelCode: 'ALFLMM8585890582', modelDescription: 'MAHINDRA ALFA LC PLUS DSL BSVI WARM RED', modelGroupCode: 'LOGN' }],
                            evrDetailData: [{ ageInDays: '279', chargeIndicator: false, chargingDueDate: '2023-07-18T10:04:31.076+00:00', chargingStatus: 'DUE FOR CHARGING', grnDate: '2022-12-31T00:00:00.000+00:00', grnId: 'GRN23A000425', grnStatus: 'RCV', id: '81b5f880-7a07-4a5e-aa34-629c9eeedeb8', lastChargeDate: '2023-07-03T10:04:31.076+00:00', modelCode: 'ALFLMM8585890582', modelDescription: 'MAHINDRA ALFA LC PLUS DSL BSVI WARM RED', modelGroupCode: 'LOGN', remarks: 'charged vehicle', vehicleStatus: null, vin: 'MA1LV2NR9N3A15434' }],
                            filter: [{ advanceFilter: true, dueFromDate: '2023-10-01', dueToDate: '2023-10-05', model: 'LOGN' }],
                        },
                    ],
                },
            },
        });

        const res = {
            data: [{ chargingStatus: 'DUE FOR CHARGING', id: '81b5f880-7a07-4a5e-aa34-629c9eeedeb8', modelCode: 'ALFLMM8585890582', modelDescription: 'MAHINDRA ALFA LC PLUS DSL BSVI WARM RED', modelGroupCode: 'LOGN' }],
        };

        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <EvrDetailsCapturingMaster fetchProductList={jest.fn()} fetchDetailList={fetchDetailList} saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });

        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();
    });

    it('save button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                EvrDetailsCapturing: {
                    EvrDetailsCapturingSearchList: { isLoaded: true, filter: { advanceFilter: true, modelDescription: 'modeltest', model: 'testing', dueFromDate: '01/01/2000', dueToDate: '01/01/2002' }, key: 'searchParam' },
                },
            },
        });
        const fetchList = jest.fn();
        const fetchProductList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <EvrDetailsCapturingMaster fetchList={fetchList} fetchProductList={fetchProductList} setFilterString={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search Model Description/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();
        fetchProductList.mock.calls[0][0].onCloseAction();
    });

    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                EvrDetailsCapturing: {
                    EvrDetailsCapturingSearchList: { isLoaded: true, filter: { advanceFilter: true, modelDescription: 'modeltest', model: 'testing', dueFromDate: '01/01/2000', dueToDate: '01/01/2002' }, key: 'searchParam' },
                },
            },
        });
        const fetchList = jest.fn();
        customRender(
            <Provider store={mockStore}>
                <EvrDetailsCapturingMaster fetchProductList={jest.fn()} fetchList={fetchList} setFilterString={jest.fn()} />
            </Provider>
        );
        const approved = screen.getByRole('button', { name: 'Charged' });
        fireEvent.click(approved);
        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });
        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
        const advanceFilter = screen.getByPlaceholderText(/Search Model Description/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
        const clearBtn = screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });
});
