import { Form } from 'antd';
import { fireEvent, screen } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { OptionServicesForm } from '@components/Sales/OTF/VehicleDetails/optionServicesForm';
afterEach(() => {
    jest.restoreAllMocks();
  }); 
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

describe('OTF Vehicle optional Component render', () => {
    it('should render optional service form', async () => {
        customRender(<FormWrapper typeData={'OPT_SRV'} />);
    });

    it('should render all text', async () => {
        customRender(<FormWrapper typeData={'OPT_SRV'} />);

        const serviceName = screen.getByRole('combobox', { name: /service name/i });
        expect(serviceName).toBeTruthy();

        const amount = screen.getByRole('textbox', { name: /amount/i });
        expect(amount).toBeTruthy();

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
        expect(saveBtn).toBeTruthy();

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        expect(cancelBtn).toBeTruthy();
    });
});
