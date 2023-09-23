import { Form } from 'antd';
import { fireEvent, screen } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { OptionServicesForm } from '@components/Sales/Common/VehicleDetails/optionServicesForm';

const typeDataMock = {
    OPT_SRV: [
        { key: 'FSTG', value: 'FasT Tag' },
        { key: 'HRSP', value: 'HRSP' },
        { key: 'OCHRG', value: 'Other charges' },
        { key: 'REGST', value: 'Registration' },
    ],
};

const FormWrapper = (props) => {
    const [optionForm] = Form.useForm();
    return <OptionServicesForm optionForm={optionForm} {...props} />;
};

describe('Booking Vehicle optional Component render', () => {
    it('should render optional service form', async () => {
        customRender(<FormWrapper typeData={'OPT_SRV'} />);
    });

    it('should render all text', async () => {
        customRender(<FormWrapper typeData={'OPT_SRV'} serviceOptions={true} />);

        const serviceName = screen.getByRole('combobox', { name: /service name/i });
        fireEvent.change(serviceName, { target: { value: 'FasT Tag' } });

        const amount = screen.getByRole('textbox', { name: /amount/i });
        fireEvent.change(serviceName, { amount: { value: '12' } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });
});
