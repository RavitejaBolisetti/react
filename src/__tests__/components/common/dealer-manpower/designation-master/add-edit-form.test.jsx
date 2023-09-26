/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/DealerManpower/DesignationMaster/AddEditForm';
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
        const applicableToData = [{ key: 1, name: 'test', parentKey: "kai" }, { key: 2, name: 'test', parentKey: "kai1" }]
        const typeData = [{
            PARAM_MASTER: { id: 'DESG_TYP_ASGN_TO', }
        }]


        customRender(<FormWrapper {...props}
            isVisible={true}
            filteredDepartmentData={applicableToData}
            divisionData={applicableToData}
            filteredRoleData={applicableToData}
            roleData={applicableToData}
            typeData={typeData}
            handleDivisionChange={jest.fn()}
        />)

        const divisionName = screen.getByRole('combobox', { name: 'Division Name' });
        fireEvent.click(divisionName);

        const departmentName = screen.getByRole('combobox', { name: 'Department Name' });
        fireEvent.click(departmentName);

    })

});