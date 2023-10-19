import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import AMCRegistrationDetailsMaster from '@components/Sales/AMCRegistration/AMCRegistrationDetails/AMCRegistrationDetailsMaster';
import { screen, fireEvent } from '@testing-library/react';
import { Form, Button } from 'antd';

const FormWrapper = (props) => {
    const [registrationForm, schemeForm] = Form.useForm();
    const myForm = {
        ...registrationForm,
        ...schemeForm,
        getFieldValue: jest.fn(),
        resetFields: jest.fn(),
        setFieldsValue: jest.fn().mockReturnValue('saleType'),
    };
    return <AMCRegistrationDetailsMaster registrationForm={myForm} schemeForm={myForm} {...props} />;
};

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

describe('AMC Registration Details Master Components', () => {
    it('should render AMC Registration Details Master Page components', () => {
        const fetchSchemeList = jest.fn();
        const fetchEmployeeList = jest.fn();
        const employeeData = [
            {
                employeeName: 'testing',
                employeeCode: 'test',
            },
            {
                employeeName: 'testing1',
                employeeCode: 'test1',
            },
        ];

        const activeKey = [{ key: 1, value: 'test' }];

        customRender(<FormWrapper employeeData={employeeData} activeKey={activeKey} requestPayload={true} FormActionButton={FormActionButton} setButtonData={jest.fn()} handleButtonClick={jest.fn()} fetchEmployeeList={fetchEmployeeList} fetchSchemeList={fetchSchemeList} />);

        const plus = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plus[0]);

        const saleType = screen.getByRole('combobox', { name: 'Sale Type' });
        fireEvent.change(saleType, { target: { value: 'testing' } });

        const employeeName = screen.getByRole('combobox', { name: 'Employee Name' });
        fireEvent.change(employeeName, { target: { value: 'testing' } });

        const managerName = screen.getByRole('textbox', { name: 'Manager Name' });
        fireEvent.change(managerName, { target: { value: 'testing' } });

        const remarks = screen.getByRole('textbox', { name: 'Remarks' });
        fireEvent.change(remarks, { target: { value: 'testing' } });

        fireEvent.click(plus[1]);

        const amcType = screen.getByRole('combobox', { name: 'AMC Type' });
        fireEvent.change(amcType, { target: { value: 'testing' } });

        const schemeDescription = screen.getByRole('combobox', { name: 'Scheme Description' });
        fireEvent.change(schemeDescription, { target: { value: 'testing' } });

        const schemeCode = screen.getByRole('textbox', { name: 'Scheme Code' });
        fireEvent.change(schemeCode, { target: { value: 'testing' } });

        const schemeBasicAmount = screen.getByRole('textbox', { name: 'Scheme Basic Amount' });
        fireEvent.change(schemeBasicAmount, { target: { value: 'testing' } });

        const schemeDiscount = screen.getByRole('textbox', { name: 'Scheme Discount' });
        fireEvent.change(schemeDiscount, { target: { value: 'testing' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('should render AMC Registration Details Master Page on finish errors components', () => {
        const fetchSchemeList = jest.fn();
        const fetchEmployeeList = jest.fn();

        customRender(<FormWrapper FormActionButton={FormActionButton} setButtonData={jest.fn()} handleButtonClick={jest.fn()} fetchEmployeeList={fetchEmployeeList} fetchSchemeList={fetchSchemeList} />);

        const plus = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plus[0]);
        fireEvent.click(plus[1]);

        const saleType = screen.getByRole('combobox', { name: 'Sale Type' });
        fireEvent.change(saleType, { target: { value: 'testing' } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('should render AMC Registration Details Master Page view components', () => {
        const formActionType = {
            viewMode: true,
        };
        const fetchSchemeList = jest.fn();
        const fetchEmployeeList = jest.fn();
        customRender(<FormWrapper requestPayload={true} FormActionButton={FormActionButton} formActionType={formActionType} fetchEmployeeList={fetchEmployeeList} fetchSchemeList={fetchSchemeList} />);
    });
});
