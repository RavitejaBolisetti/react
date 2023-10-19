import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import AMCRegistrationMaster from '@components/Sales/AMCRegistration/AMCRegistrationMaster';
import { screen, fireEvent } from '@testing-library/react';
import { Form, Button } from 'antd';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

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
        customRender(<AMCRegistrationMaster />);
    });

    it('Should render AMC registration master search render', () => {
        customRender(<AMCRegistrationMaster />);

        const searchText = screen.getByPlaceholderText('Search');
        fireEvent.change(searchText, { target: { value: 'testing' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const closeCircleBtn = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeCircleBtn);
    });

    it('Should render AMC registration master Registration Filter apply render', () => {
        customRender(<FormWrapper />);

        const advancedFiltersBtn = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advancedFiltersBtn);

        const aMCRegistrationFromDate = screen.getByRole('textbox', { name: 'AMC Registration From Date' });
        fireEvent.change(aMCRegistrationFromDate, { target: { value: '12-03-1999' } });

        const aMCRegistrationToDate = screen.getByRole('textbox', { name: 'AMC Registration To Date' });
        fireEvent.change(aMCRegistrationToDate, { target: { value: '12-03-2000' } });

        const applyBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);
    });

    it('Should render AMC registration master Registration Filter reset render', () => {
        customRender(<FormWrapper />);

        const advancedFiltersBtn = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advancedFiltersBtn);

        const aMCRegistrationFromDate = screen.getByRole('textbox', { name: 'AMC Registration From Date' });
        fireEvent.change(aMCRegistrationFromDate, { target: { value: '12-03-1999' } });

        const aMCRegistrationToDate = screen.getByRole('textbox', { name: 'AMC Registration To Date' });
        fireEvent.change(aMCRegistrationToDate, { target: { value: '12-03-2000' } });

        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    });

    it('Should render AMC registration master Registration Filter close render', () => {
        customRender(<FormWrapper />);

        const advancedFiltersBtn = screen.getByRole('button', { name: 'Advanced Filters' });
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
                        filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '06/07/2022', key: 'searchParam' },
                    },
                },
            },
        });
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <AMCRegistrationMaster fetchList={fetchList} showAddButton={true} />
            </Provider>
        );

        const searchText = screen.getByPlaceholderText('Search');
        fireEvent.change(searchText, { target: { value: 'testing' } });

        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
    });
});
