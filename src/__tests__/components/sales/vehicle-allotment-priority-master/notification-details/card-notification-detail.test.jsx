/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import CardNotificationDetail from '@components/Sales/VehicleAllotmentPriorityMaster/NotificationDetails/CardNotificationDetail';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [editForm] = Form.useForm();
    const myFormMock = {
        ...editForm,
        getFieldsValue: jest.fn(),
    };
    return <CardNotificationDetail editForm={myFormMock} {...props} />;
};

afterEach(() => {
    jest.restoreAllMocks();
});

const props = {
    formEdit: true,
    ADD_ACTION: 'add',
    EDIT_ACTION: 'edit',
    VIEW_ACTION: 'view',
    formActionType: { addMode: false, editMode: false, viewMode: false },
};

describe('card notification detail component', () => {
    it('should card notification detail component', () => {
        const docTypeHeadMappingList = [{ internalId: '123', roleCode: '12', designationCode: '124' }];

        customRender(<FormWrapper docTypeHeadMappingList={docTypeHeadMappingList} forceUpdate={jest.fn()} setDropdownItems={jest.fn()} setDocTypeHeadMappingList={jest.fn()} setFormEdit={jest.fn()} {...props} setButtonData={jest.fn()} onDocTypeHeadMappingDelete={jest.fn()} />);

        const cancelBtn = screen.getAllByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn[0]);
        fireEvent.click(cancelBtn[1]);

        const saveBtn = screen.getAllByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn[0]);
        fireEvent.click(saveBtn[1]);
    });

    it('should render combobox component', () => {
        const docTypeHeadMappingList = [{ internalId: '123', roleCode: '12', designationCode: '124' }];

        customRender(<FormWrapper docTypeHeadMappingList={docTypeHeadMappingList} forceUpdate={jest.fn()} setDropdownItems={jest.fn()} setDocTypeHeadMappingList={jest.fn()} setFormEdit={jest.fn()} setButtonData={jest.fn()} onDocTypeHeadMappingDelete={jest.fn()} formEdit={false} />);

        const roleName = screen.getAllByRole('combobox', { name: 'Role Name' });
        fireEvent.click(roleName);

        const designationName = screen.getAllByRole('combobox', { name: 'Designation Name' });
        fireEvent.click(designationName);
    });
});
