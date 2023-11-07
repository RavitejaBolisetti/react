import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { InstallationAddressDetailsMaster } from 'components/Sales/ChargerInstallationProcess/InstallationAddressDetails/InstallationAddressDetails';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <InstallationAddressDetailsMaster form={myFormMock} {...props} />;
};

const StatusBar = () => <div>No Status Bar</div>;
const FormActionButton = () => <div><button htmlType="submit" type="primary">Submit</button></div>;

describe('Installation Address Details Component', () => {

    it('should render installation address details component', () => {
        customRender(<InstallationAddressDetailsMaster StatusBar={StatusBar} setOptions={jest.fn()} FormActionButton={FormActionButton} />);
    });

    it('submit button should work', async () => {
        const formActionType={ viewMode: true };
        const setRequestPayload=jest.fn();

        customRender(<FormWrapper StatusBar={StatusBar} formActionType={formActionType} FormActionButton={FormActionButton} setRequestPayload={setRequestPayload} handleFormValueChange={jest.fn()} onChargerInstallationFinish={jest.fn()} />);

        const submitBtn=screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitBtn);

        await waitFor(() => { expect(setRequestPayload).toHaveBeenCalled() });

        setRequestPayload.mock.calls[0][0]('Kai');
    });

});