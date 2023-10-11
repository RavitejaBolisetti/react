/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/DealerManpower/DealerEmployeeDepartmentMaster/AddEditForm';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm form={form} {...props} />;
}

describe('List Employee Department Master add edit form components', () => {
    it('Should render List Employee Department Master edit components', async () => {
        const props = {
            formActionType: { viewMode: false, editMode: true },
            formData: {
                status: 'Active'
            }
        }
        const divisionData=[{ key: 106, value: 'Kai' }];
        customRender(<FormWrapper {...props} isVisible={true} divisionData={divisionData} setButtonData={jest.fn()}  />)

        const divisionName=screen.getByRole('combobox', { name: 'Division Name' });
        fireEvent.change(divisionName, { target: { value: 'Kai' } });
        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });
        fireEvent.click(screen.getByText('Kai'));

        const closeBtn = screen.getByRole('button', { name: 'Close', exact: false })
        fireEvent.click(closeBtn)

    })

    it('Should render List Employee Department Master view components', async () => {
        const props = {
            formActionType: { viewMode: true, editMode: false },
        }
        customRender(<FormWrapper {...props} isVisible={true} />)

    })

});