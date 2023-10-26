/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, waitFor, getByRole } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { CrmScreenEnrolmentMaster } from '@components/Sales/crmSchemeEnrolment/CrmScreenEnrolmentMaster';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        getFieldValue: jest.fn(),
        setFieldsValue: jest.fn(),
        isLoaded: jest.fn(),
    };
    return <CrmScreenEnrolmentMaster form={myFormMock} {...props} />;
};

const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };
const defaultBtnVisiblity = { cancelBtn: true, printDownloadBtn: true, closeBtn: true };

jest.mock('@components/Sales/crmSchemeEnrolment/addViewForm/AddViewFormMaster', () => {
    const AddViewFormMaster = ({ onFinish, onCloseAction }) => (
        <div>
            <button onClick={onCloseAction}>Print/Download</button>
            <button onClick={onFinish}>Save & Next</button>
            <button onClick={onFinish}>Cancel</button>
            <button onClick={onFinish}>Next</button>
        </div>
    );
    return {
        __esModule: true,
        AddViewFormMaster,
    };
});

jest.mock('store/actions/data/crmSchemeEnrollment', () => ({
    crmSchemeEnrollmentDataActions: {},
}));

describe('crm screen enrolment master component', () => {
    it('should render crm screen enrolment master component', () => {
        customRender(<CrmScreenEnrolmentMaster />);
    });

    it('reset button should work', () => {
        customRender(<FormWrapper setFilterString={jest.fn()} fetchProductList={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<FormWrapper setFilterString={jest.fn()} fetchProductList={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('Apply button should work', async () => {
        customRender(<FormWrapper setFilterString={jest.fn()} fetchProductList={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const searchBtn = screen.getByRole('button', { name: /Apply/i });
        fireEvent.click(searchBtn);
    });

    it('reset filter should work', () => {
        customRender(<FormWrapper setFilterString={jest.fn()} fetchProductList={jest.fn()} />);
        const advanceFilter = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
        const closeCircle = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeCircle);
    });

    it('onFinish should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CRMSchemeEnrollmentList: {
                    isLoaded: true,
                    filter: { advanceFilter: true, searchType: 'datatype', searchParam: 'searchdata', schemeType: 'dataScheme', schemeTypeName: 'datatest12', fromDate: '2023-10-11', toDate: '2023-11-12' },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const saveData = jest.fn();
        customRender(
            <Provider store={mockStore}>
                <CrmScreenEnrolmentMaster fetchDetail={jest.fn()} fetchDetailList={fetchDetailList} saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const plusAddScheme = screen.getByRole('button', { name: 'plus Add Scheme' });
        fireEvent.click(plusAddScheme);
        const save = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(save);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });
        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });

    it('remove Filter should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CRMSchemeEnrollmentList: {
                    isLoaded: true,
                    filter: { advanceFilter: true, searchType: 'datatype', searchParam: 'searchdata', schemeType: 'dataScheme', schemeTypeName: 'datatest12', fromDate: '2023-10-11', toDate: '2023-11-12' },
                    key: 'searchParam',
                },
            },
        });
        const fetchList = jest.fn();
        customRender(
            <Provider store={mockStore}>
                <CrmScreenEnrolmentMaster fetchList={fetchList} setFilterString={jest.fn()} fetchDetail={jest.fn()} setButtonData={jest.fn()} buttonData={buttonData} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();
    });

    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CRMSchemeEnrollmentList: {
                    isLoaded: true,
                    filter: { advanceFilter: true, searchType: 'datatype', searchParam: 'searchdata', schemeType: 'dataScheme', schemeTypeName: 'datatest12', fromDate: '2023-10-11', toDate: '2023-11-12' },
                    key: 'searchParam',
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <CrmScreenEnrolmentMaster saveData={jest.fn()} fetchList={jest.fn()} fetchDetail={jest.fn()} setButtonData={jest.fn()} buttonData={buttonData} />
            </Provider>
        );
        const plusAddScheme = screen.getByRole('button', { name: 'plus Add Scheme' });
        fireEvent.click(plusAddScheme);
        const btnClick = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(btnClick);
    });

    it('Clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CRMSchemeEnrollmentList: {
                    isLoaded: true,
                    filter: { advanceFilter: true, searchType: 'datatype', searchParam: 'searchdata', schemeType: 'dataScheme', schemeTypeName: 'datatest12', fromDate: '2023-10-11', toDate: '2023-11-12' },
                    key: 'searchParam',
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <CrmScreenEnrolmentMaster fetchList={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );
        const searchText = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(searchText, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

    it('Next and Print/Download button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CRMSchemeEnrollmentList: {
                    isLoaded: true,
                    filter: { advanceFilter: true, searchType: 'datatype', searchParam: 'searchdata', schemeType: 'dataScheme', schemeTypeName: 'datatest12', fromDate: '2023-10-11', toDate: '2023-11-12' },
                    key: 'searchParam',
                },
            },
        });
        const formActionType = { addMode: false };
        customRender(
            <Provider store={mockStore}>
                <CrmScreenEnrolmentMaster formActionType={formActionType} fetchList={jest.fn()} onChange={jest.fn()} setFilterString={jest.fn()} defaultBtnVisiblity={defaultBtnVisiblity} />
            </Provider>
        );
        const nextBtn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);

        const printDownloadBtn = screen.getByRole('button', { name: 'Print/Download' });
        fireEvent.click(printDownloadBtn);
    });
});
