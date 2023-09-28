import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/ManufacturerAdminstrativeHierarchy/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { screen, fireEvent, act } from '@testing-library/react';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm form={form} {...props} />;
};

describe('Manufacturer Adminstrative Hierarchy add edit form components', () => {
    const formData = {
        id: 1,
        status: true,
    }
    const attributeData = [{ id: 1, status: true }, { id: 2, status: false }];
    const formActionType = "edit"

    it('Should render add edit form', async () => {
        customRender(<FormWrapper isVisible={true}
            setattributeDataOptions={jest.fn()}
            attributeDataOptions={attributeData}
            setSelectedTreeSelectKey={jest.fn()}
            formData={formData}
            attributeData={attributeData}
            handleFormValueChange={jest.fn()}
            handleFormFieldChange={jest.fn()}
            onFinish={jest.fn()}
            onFinishFailed={jest.fn()}
            formActionType={formActionType}
            setFormBtnActive={jest.fn()}
        />)

        const attributeLevel = screen.getByRole("combobox", { name: 'Attribute Level', exact: false })
        fireEvent.change(attributeLevel, { target: { value: "Attribute level" } })

        const code = screen.getByRole("textbox", { name: 'Code', exact: false })
        fireEvent.change(code, { target: { value: "Attribute level" } })

        const shortDesc = screen.getByRole("textbox", { name: 'Short Description', exact: false })
        fireEvent.change(shortDesc, { target: { value: "test4342552" } })

        const longDesc = screen.getByRole("textbox", { name: 'Long Description', exact: false })
        fireEvent.change(longDesc, { target: { value: "test4342552" } })

        const status = screen.getByRole("switch", { name: 'Status', exact: false })
        fireEvent.click(status)

        const saveBtn = screen.getByRole('button', { name: "Save", exact: false });
        fireEvent.click(saveBtn)
    })

    it('Should render close components', async () => {
        const flatternData = [{ id: 1, value: 'test', key: 1 }, { id: 2, value: 'test', key: 2 }]
        customRender(<FormWrapper isVisible={true}
            setattributeDataOptions={jest.fn()}
            attributeDataOptions={attributeData}
            setSelectedTreeSelectKey={jest.fn()}
            formData={formData}
            attributeData={attributeData}
            handleFormValueChange={jest.fn()}
            handleFormFieldChange={jest.fn()}
            onFinish={jest.fn()}
            onFinishFailed={jest.fn()}
            formActionType={"sibling"}
            flatternData={flatternData}
            selectedTreeKey={flatternData}
            setFormBtnActive={jest.fn()}
        />)

        const attributeLevel = screen.getByRole("combobox", { name: 'Attribute Level', exact: false })
        fireEvent.change(attributeLevel, { target: { value: "Attribute level" } })

        const close = screen.getByRole('button', { name: "Close", exact: false });
        fireEvent.click(close)

    })

    it('Should render close components', async () => {
        customRender(<FormWrapper isVisible={true}
            setattributeDataOptions={jest.fn()}
            attributeDataOptions={attributeData}
            setSelectedTreeSelectKey={jest.fn()}
            formData={formData}
            attributeData={attributeData}
            handleFormValueChange={jest.fn()}
            handleFormFieldChange={jest.fn()}
            onFinish={jest.fn()}
            formActionType={"child"}
            setFormBtnActive={jest.fn()}
        />)

        const cancelBtn = screen.getByRole('button', { name: "Cancel", exact: false });
        fireEvent.click(cancelBtn)
    })
})