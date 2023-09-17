import '@testing-library/jest-dom/extend-expect';
import { AdvancedSearch } from '@components/Sales/VehicleDeliveryNote/AdvancedSearch';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    const myFormMock = {
        ...advanceFilterForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AdvancedSearch advanceFilterForm={myFormMock} {...props} />;
};

describe(' Advance Search components', () => {
    it('should abe to select InvoiceDate without error', async () => {
        customRender(<FormWrapper isVisible={true} />);

        const fromDate = screen.getByRole('textbox', { name: 'Invoice From Date' });

        fireEvent.click(fromDate);

        const todayForFromDate = await screen.findByText('Today');

        fireEvent.click(todayForFromDate);

        const toDate = screen.getByRole('textbox', { name: 'Invoice To Date' });

        fireEvent.click(toDate);

        const todayToFromDate = await screen.findAllByText('Today');

        fireEvent.click(todayToFromDate[1]);

        const searchBtn = screen.getByRole('button', { name: /Apply/i });
        fireEvent.click(searchBtn);
    });

    it('should abe to select DeliveryNoteDate without error', async () => {
        customRender(<FormWrapper isVisible={true} />);

        const fromDate = screen.getByRole('textbox', { name: 'Invoice From Date' });

        fireEvent.click(fromDate);

        const todayForFromDate = await screen.findByText('Today');

        fireEvent.click(todayForFromDate);

        const toDate = screen.getByRole('textbox', { name: 'Invoice To Date' });

        fireEvent.click(toDate);

        const todayToFromDate = await screen.findAllByText('Today');

        fireEvent.click(todayToFromDate[1]);

        const searchBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(searchBtn);
    });

    it('test for onfinish failed', async () => {
        customRender(<FormWrapper isVisible={true} />);

        const searchBtn = screen.getByRole('button', { name: /Apply/i });
        fireEvent.click(searchBtn);
    });
});
