import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { AdvancedSearch } from '@components/Sales/AMCRegistration/AdvancedSearch';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';


afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    const myForm = {
        ...advanceFilterForm,
        getFieldValue: jest.fn(),
        resetFields: jest.fn(),
        setFieldsValue: jest.fn().mockReturnValue('12-03-2000'),
    };
    return <AdvancedSearch advanceFilterForm={myForm} {...props} />;
};


describe('Advanced search Components', () => {
    it('Should render advanced search apply components', () => {
        customRender(<FormWrapper isVisible={true} userType={"MNM"} />);

        const dealerParent = screen.getByRole('combobox', { name: 'Dealer Parent' })
        fireEvent.change(dealerParent, { target: { value: "testing" } })

        const dealerLocation = screen.getByRole('combobox', { name: 'Dealer Location' })
        fireEvent.change(dealerLocation, { target: { value: "testing" } })

        const aMCRegistrationFromDate = screen.getByRole('textbox', { name: 'AMC Registration From Date' });
        fireEvent.change(aMCRegistrationFromDate, { target: { value: '12-03-1999' } });
        expect(aMCRegistrationFromDate).toBeInTheDocument()

        const aMCRegistrationToDate = screen.getByRole('textbox', { name: 'AMC Registration To Date' });
        fireEvent.change(aMCRegistrationToDate, { target: { value: '12-03-2000' } });

        const calendar = screen.getAllByRole('img', { name: 'calendar' })
        fireEvent.click(calendar[0])
        fireEvent.click(calendar[1])

        const applyBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);
    });

    it('Should render advanced search reset components', () => {
        customRender(<FormWrapper isVisible={true}/>);

        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    });
});
