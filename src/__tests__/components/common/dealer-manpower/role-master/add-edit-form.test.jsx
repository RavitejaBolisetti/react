/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/DealerManpower/RoleMaster/AddEditForm';
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

describe('List Role Master add edit form components', () => {
    it('Should render role master view components', () => {
        const props = {
            formActionType: { viewMode: true, editMode: false }
        }
        customRender(<FormWrapper {...props} isVisible={true} />)

        const closeBtn = screen.getByRole('button', { name: 'Close', exact: false })
        fireEvent.click(closeBtn)

    })

});