import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
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

    it('load AddEditForm component', () => {
        customRender(<FormWrapper {...props} onCloseAction={jest.fn()} setIsFormVisible={jest.fn()} setFormBtnActive={jest.fn()} setFormData={jest.fn()} setSaveAndAddNewBtnClicked={jest.fn()} />);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        const saveAddNewBtn = screen.getByRole('button', { name: 'Save & Add New' });
        fireEvent.click(saveAddNewBtn);
    });

    it('load form', () => {
        const formData = {
            booleanValue: null,
            configurableParameterType: 'N',
            controlDescription: 'Days after which password needs to be updated',
            controlGroup: 'CMN',
            controlGroupName: 'Common',
            controlId: 'PWDUPD',
            controlName: 'Update Password',
            fromDate: null,
            fromNumber: 90,
            id: '470b3361-7b92-4cb3-8582-d4bf0800ef2e',
            isActive: true,
            textValue: null,
            toDate: null,
            toNumber: 90,
        };
        customRender(<FormWrapper {...props} handleControlChange={jest.fn()} formData={formData} />);

        const controlId = screen.getByRole('combobox', { name: 'Control ID', exact: false });
        fireEvent.change(controlId, { target: { value: 1 } });
        expect(controlId.value).toHaveValue(1);

        const controlGrp = screen.getByRole('combobox', { name: 'Control Group', exact: false });
        fireEvent.change(controlGrp, { target: { value: 2 } });
        expect(controlGrp.value).toHaveValue(2);

        const controlDesc = screen.getByRole('textbox', { name: 'Control Description', exact: false });
        fireEvent.change(controlDesc, { target: { value: 3 } });
        expect(controlDesc.value).toHaveValue(3);
    });

    it('footerEdit false', () => {
        customRender(<FormWrapper {...props} footerEdit={false} setSaveAndAddNewBtnClicked={jest.fn()} />);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('footerEdit true', () => {
        customRender(<FormWrapper {...props} footerEdit={true} hanndleEditData={jest.fn()} />);

        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);
    });
});
