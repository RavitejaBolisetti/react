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

        const close = screen.getByRole('button', { name: "Close", exact: false });
        act(() => {
            fireEvent.click(close)
        })

        const cancelBtn = screen.getByRole('button', { name: "Cancel", exact: false });
        act(() => {
            fireEvent.click(cancelBtn)
        })

        const saveBtn = screen.getByRole('button', { name: "Save", exact: false });
        act(() => {
            fireEvent.click(saveBtn)
        })

        const authorityBtn = screen.getByRole('button', { name: "Authority Details", exact: false });
        act(() => {
            fireEvent.click(authorityBtn)
        })

        const searchBtn = screen.getByRole('button', { name: "search", exact: false });
        act(() => {
            fireEvent.click(searchBtn)
        })

        const plusAddBtn = screen.getByRole('button', { name: "plus Add", exact: false });
        act(() => {
            fireEvent.click(plusAddBtn)
        })

        const closeImg = screen.getByRole('img', { name: "close", exact: false });
        act(() => {
            fireEvent.click(closeImg)
        })

        const searchImg = screen.getByRole('img', { name: "search", exact: false });
        act(() => {
            fireEvent.click(searchImg)
        })

        const plusImg = screen.getByRole('img', { name: "plus", exact: false });
        act(() => {
            fireEvent.click(plusImg)
        })

        const status = screen.getByRole('switch', { name: "Status", exact: false });
        act(() => {
            fireEvent.click(status)
        })

        const code = screen.getByRole('textbox', { name: "Code", exact: false });
        fireEvent.change(code, { target: { value: 'test' } })

    })

    it('Should render add edit form action type child', () => {
        customRender(<FormWrapper
            isVisible={true}
            formActionType={"child"}
            selectedTreeKey={"test"}
            setSelectedTreeSelectKey={jest.fn()}
        />)
    })

    it('Should render add edit form action type sibling', () => {
        const flatternData = [{ id: 1, value: 'test', key: 1 }, { id: 2, value: 'test', key: 2 }]
        const selectedTreeKey = [1]
        customRender(<FormWrapper
            isVisible={true}
            formActionType={"sibling"}
            flatternData={flatternData}
            selectedTreeKey={selectedTreeKey}
            setSelectedTreeSelectKey={jest.fn()}
            treeCodeId={null}
        />)
    })
})