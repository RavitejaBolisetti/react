/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/DealerManpower/DealerEmployeeDepartmentMaster/AddEditForm';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm form={form} {...props} />;
}

describe('List Employee Department Master add edit form components', () => {
    it('Should render List Employee Department Master view components', () => {
        const props = {
            formActionType: { viewMode: true, editMode: false }
        }
        customRender(<FormWrapper {...props} isVisible={true} />)

        const closeBtn = screen.getByRole('button', { name: 'Close', exact: false })
        fireEvent.click(closeBtn)

    })

});