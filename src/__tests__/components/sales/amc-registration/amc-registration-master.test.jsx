/* eslint-disable jest/no-mocks-import */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import AMCRegistrationMaster from '@components/Sales/AMCRegistration/AMCRegistrationMaster';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/amcRegistration/amcRegistration', () => ({
    amcRegistrationDataAction: {},
}));

const FormWrapper = (props) => {
    const [registrationForm, schemeForm] = Form.useForm();
    const myForm = {
        ...registrationForm,
        ...schemeForm,
        getFieldValue: jest.fn(),
        resetFields: jest.fn(),
        setFieldsValue: jest.fn().mockReturnValue('saleType'),
    };
    return <AMCRegistrationMaster registrationForm={myForm} schemeForm={myForm} {...props} />;
};

describe('AMC Registration Master Components', () => {
    it('Should render AMC registration master basic render', () => {
        customRender(<AMCRegistrationMaster setFilterString={jest.fn()} />);
    });

    it('Should render AMC registration master search render', () => {
        customRender(<AMCRegistrationMaster setFilterString={jest.fn()} />);

        const searchText = screen.getByPlaceholderText('Search');
        fireEvent.change(searchText, { target: { value: 'testing' } });

        const closeCircleBtn = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeCircleBtn);
    });

    it('Should render AMC registration master Registration Filter apply render', () => {
        customRender(<FormWrapper setFilterString={jest.fn()} />);

        const advancedFiltersBtn = screen.getByRole('button', { name: 'Advance Filters' });
        fireEvent.click(advancedFiltersBtn);

        const aMCRegistrationFromDate = screen.getByRole('textbox', { name: 'AMC Registration From Date' });
        fireEvent.change(aMCRegistrationFromDate, { target: { value: '12-03-1999' } });

        const aMCRegistrationToDate = screen.getByRole('textbox', { name: 'AMC Registration To Date' });
        fireEvent.change(aMCRegistrationToDate, { target: { value: '12-03-2000' } });

        const applyBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);
    });

    it('Should render AMC registration master Registration Filter reset render', () => {
        customRender(<FormWrapper setFilterString={jest.fn()} />);

        const advancedFiltersBtn = screen.getByRole('button', { name: 'Advance Filters' });
        fireEvent.click(advancedFiltersBtn);

        const aMCRegistrationFromDate = screen.getByRole('textbox', { name: 'AMC Registration From Date' });
        fireEvent.change(aMCRegistrationFromDate, { target: { value: '12-03-1999' } });

        const aMCRegistrationToDate = screen.getByRole('textbox', { name: 'AMC Registration To Date' });
        fireEvent.change(aMCRegistrationToDate, { target: { value: '12-03-2000' } });

        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    });

    it('Should render AMC registration master Registration Filter close render', () => {
        customRender(<FormWrapper setFilterString={jest.fn()} />);

        const advancedFiltersBtn = screen.getByRole('button', { name: 'Advance Filters' });
        fireEvent.click(advancedFiltersBtn);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    });

    it('refresh button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                AMCRegistration: {
                    AMCRegistrationSearch: {
                        filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '06/07/2022', key: 'searchParam', searchType: 'test' },
                    },
                },
            },
        });
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <AMCRegistrationMaster setFilterString={jest.fn()} fetchList={fetchList} showAddButton={true} />
            </Provider>
        );

        const searchText = screen.getByPlaceholderText('Search');
        fireEvent.change(searchText, { target: { value: 'testing' } });

        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
    });

    it('Should render AMC registration master component', async() => {
        const loginUserData = {
            userType: 'DLR',
        };
        const buttonAction = {
            ADD_ACTION: 'add',
            EDIT_ACTION: 'edit',
            VIEW_ACTION: 'view',
            NEXT_ACTION: 'next',
        };

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                AMCRegistration: {
                    AMCRegistrationSearch: {
                        isLoaded: true,
                        data: [
                            {
                                id: 'c3bc4c10-be25-461c-a6ed-ed54c4c09fb0',
                                schemeAmount: 21500,
                                schemeCode: 'AM006',
                                schemeDescription: 'Alturas G4 Retail Service Plan  3Yrs 50000 KMS',
                                schemeEndDate: null,
                                schemeStartDate: null,
                                schemeTaxAmount: null,
                                schemeType: 'SCHM',
                            },
                        ],
                    },
                },
            },
        });

        const saveData = jest.fn();
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <AMCRegistrationMaster saveData={saveData} AMConFinish={jest.fn()} fetchList={fetchList} setButtonData={jest.fn()} setFilterString={jest.fn()} loginUserData={loginUserData} buttonAction={buttonAction} />
            </Provider>
        );

        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);

        const plusImg = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusImg[0]);
        fireEvent.click(plusImg[1]);

        const saleType = screen.getByRole('combobox', { name: 'Sale Type' });
        fireEvent.change(saleType, { target: { value: 'Sale Type' } });

        const employeeName = screen.getByRole('combobox', { name: 'Employee Name' });
        fireEvent.change(employeeName, { target: { value: 'Sale Type test' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const managerName = screen.getByRole('combobox', { name: 'Manager Name' });
        fireEvent.change(managerName, { target: { value: 'testing' } });

        const remarks = screen.getByRole('textbox', { name: 'Remarks' });
        fireEvent.change(remarks, { target: { value: 'testing' } });
        fireEvent.click(plusImg[2]);

        const aMCType = screen.getByRole('combobox', { name: 'AMC Type' });
        fireEvent.change(aMCType, { target: { value: 'AMC Type' } });

        const schemeDescription = screen.getByRole('combobox', { name: 'Scheme Description' });
        fireEvent.change(schemeDescription, { target: { value: 'AMC Type' } });

        const schemeCode = screen.getByRole('textbox', { name: 'Scheme Code' });
        fireEvent.change(schemeCode, { target: { value: 'testing' } });

        const schemeBasicAmount = screen.getByRole('textbox', { name: 'Scheme Basic Amount' });
        fireEvent.change(schemeBasicAmount, { target: { value: 'testing' } });

        const schemeDiscount = screen.getByRole('textbox', { name: 'Scheme Discount' });
        fireEvent.change(schemeDiscount, { target: { value: 'testing' } });

        const saveandNext = screen.getByRole('button', { name: 'Save and Next' });
        fireEvent.click(saveandNext);       
    });

    it('Should render AMC registration master cancel component', () => {
        customRender(<AMCRegistrationMaster setFilterString={jest.fn()} />);

        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);

        const cancel = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancel);
    });

    it('Should render AMC registration master close component', () => {
        customRender(<AMCRegistrationMaster setFilterString={jest.fn()} />);

        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);

        const cancel = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(cancel);
    });   
});
