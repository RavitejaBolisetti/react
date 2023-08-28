import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act } from '@testing-library/react';
import { AddEditForm } from 'components/common/ConfigurableParameterEditing/AddEditForm';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldValue: jest.fn(),
        setFieldsValue: jest.fn(),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render AddEditForm Component', () => {
    const props = {
        isViewModeVisible: false,
        isVisible: true,
        isReadOnly: false,
        isLoadingOnSave: false,
        isFormBtnActive: false,
        saveAndAddNewBtnClicked: false,
        showSaveBtn: true,
        titleOverride: 'Edit Configurable Parameter Editing',
        typeData: [],
        setParameterType: jest.fn(),
        handleFormValueChange: jest.fn(),
        handleFormFieldChange: jest.fn(),
        onFinish: jest.fn(),
        onFinishFailed: jest.fn(),
        setFormBtnActive: jest.fn(),
    };

    it('Save Button click should work', () => {
        customRender(<FormWrapper {...props} setSaveAndAddNewBtnClicked={jest.fn(false)} onCloseAction={jest.fn()} footerEdit={false} />);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        act(() => {
            fireEvent.click(saveBtn);
        });

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        act(() => {
            fireEvent.click(cancelBtn);
        });
    });

    it('should render input fields', () => {
        const formData = {
            controlDescription: 'Days after which password needs to be updated',
            controlGroup: 'CMN',
            controlId: 'PWDUPD',
        };
        customRender(<FormWrapper {...props} handleControlChange={jest.fn()} formData={formData} />);

        const controlId = screen.getByRole('combobox', { name: 'Control ID', exact: false });
        fireEvent.change(controlId, { target: { value: 1 } });


        const controlGrp = screen.getByRole('combobox', { name: 'Control Group', exact: false });
        fireEvent.change(controlGrp, { target: { value: 2 } });


        const controlDesc = screen.getByRole('textbox', { name: 'Control Description', exact: false });
        fireEvent.change(controlDesc, { target: { value: 3 } });

    });

    it('Save & Add New Button click should work', () => {
        customRender(<FormWrapper {...props} setSaveAndAddNewBtnClicked={jest.fn(true)} formData={[]} />);

        const saveAddNewBtn = screen.getByRole('button', { name: 'Save & Add New' });
        act(() => {
            fireEvent.click(saveAddNewBtn);
        });
    });

    it('Edit Button click should work', () => {
        customRender(<FormWrapper {...props} footerEdit={true} hanndleEditData={jest.fn()} />);

        const editBtn = screen.getByRole('button', { name: 'Edit' });
        act(() => {
            fireEvent.click(editBtn);
        });
    });
});
