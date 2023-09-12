import '@testing-library/jest-dom/extend-expect';
import { AdvancedSearch } from '@components/Sales/RSMApproval/AdvancedSearch';
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

describe('RSM Advance Search components', () => {
    it('should abe to select date without error', async () => {
        customRender(<FormWrapper isVisible={true} />);

        const fromDate = screen.getByRole('textbox', { name: 'From Date' });

        fireEvent.click(fromDate);

        const todayForFromDate = await screen.findByText('Today');

        fireEvent.click(todayForFromDate);


        const toDate = screen.getByRole('textbox', { name: 'To Date' });

        fireEvent.click(toDate);

        const todayToFromDate = await screen.findAllByText('Today');

        fireEvent.click(todayToFromDate[1]);

    });
});
