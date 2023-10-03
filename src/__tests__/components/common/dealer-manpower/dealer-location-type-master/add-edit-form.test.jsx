/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/DealerManpower/DealerLocationTypeMaster/AddEditForm';
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

describe('Dealer location type master add edit form components', () => {
    it('Should render dealer location type master view details components', () => {
        const props = {
            formActionType: { viewMode: true, editMode: false }
        }
        customRender(<FormWrapper {...props} isVisible={true} />)

        const closeBtn = screen.getByRole('button', { name: 'Close', exact: false })
        fireEvent.click(closeBtn)

    })

    it('Should render dealer location type master add components', () => {
        const props = {
            formActionType: { viewMode: false, editMode: false }
        }
        const applicableToData = [{ key: 1, name: 'test' }, { key: 2, name: 'test' }]
        customRender(<FormWrapper {...props} isVisible={true} applicableToData={applicableToData} />)      

    })

});