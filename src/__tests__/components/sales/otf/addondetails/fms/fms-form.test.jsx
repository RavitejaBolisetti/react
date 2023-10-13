import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import FMSForm from 'components/Sales/OTF/AddOnDetails/FMS/FMSForm';
import { Form } from 'antd';
afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [fmsForm] = Form.useForm();
    return <FMSForm fmsForm={fmsForm} {...props} />;
};

describe('FMS Form Component', () => {
    it('should render fms form component', () => {
        customRender(<FMSForm />);
    });

    it('fms form input should work', () => {
        customRender(<FormWrapper setformDataSetter={jest.fn} setFormDataSetter={jest.fn()} />);
        const fmsInput = screen.getByRole('textbox', { name: 'FMS' });
        fireEvent.change(fmsInput, { target: { value: 'Test' } });
    });

    it('fields can be editable', () => {
        const formData = { id: 106 };
        const formActionType = { viewMode: true };
        customRender(<FormWrapper formData={formData} formActionType={formActionType} />);
    });
});
