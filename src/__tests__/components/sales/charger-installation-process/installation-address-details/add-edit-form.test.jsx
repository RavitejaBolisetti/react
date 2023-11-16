import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { AddEditForm } from 'components/Sales/ChargerInstallationProcess/InstallationAddressDetails/AddEditForm';
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
    return <AddEditForm form={myFormMock} {...props} />;
};

describe('Add Edit Form Component', () => {
    it('should render add edit form component', () => {
        customRender(<AddEditForm isVisible={true} setOptions={jest.fn()} />);
    });

    it('checkbox should work in edit mode', () => {
        const formActionType = { editMode: true };

        customRender(<FormWrapper isVisible={true} setOptions={jest.fn()} setChecked={jest.fn()} formActionType={formActionType} />);

        const sameAddress = screen.getByRole('checkbox', { name: 'Same as Customer Address' });
        fireEvent.click(sameAddress);
        fireEvent.click(sameAddress);
    });

    it('checkbox should work in view mode', () => {
        customRender(<FormWrapper isVisible={true} setOptions={jest.fn()} setChecked={jest.fn()} />);

        const sameAddress = screen.getByRole('checkbox', { name: 'Same as Customer Address' });
        fireEvent.click(sameAddress);
        fireEvent.click(sameAddress);
    });

    it('search should work', () => {
        customRender(<FormWrapper isVisible={true} setOptions={jest.fn()} setChecked={jest.fn()} />);

        const searchBox = screen.getByTestId('installationAddress');
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    });

    it('pincode search should work', async () => {
        const pincodeData = [{ pinCode: 282001, localityName: 'Rajpur Chungi', cityName: 'Agra', districtName: 'Agra', stateName: 'Uttar Pradesh', id: 106 }];

        customRender(<FormWrapper isVisible={true} setOptions={jest.fn()} setChecked={jest.fn()} pincodeData={pincodeData} />);

        const pinCode = screen.getByTestId('pinCode');
        fireEvent.change(pinCode, { target: { value: 282001 } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    });
});
