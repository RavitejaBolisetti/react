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

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [editForm] = Form.useForm();
    const myFormMock = {
        ...editForm,
        getFieldsValue: jest.fn(),
        resetFields: jest.fn(),
    };
    return <CardNotificationDetail editForm={myFormMock} {...props} />;
};

describe('card notification detail component', () => {
    it('should render card notification detail component', () => {
        const docTypeHeadMappingList = [{ internalId: '123', roleCode: '125', designationCode: '124' }];

        customRender(<FormWrapper setFormEdit={jest.fn()} forceUpdate={jest.fn()} setDropdownItems={jest.fn()} setDocTypeHeadMappingList={jest.fn()} isVisbile={true} formEdit={true} setButtonData={jest.fn()} docTypeHeadMappingList={docTypeHeadMappingList} />);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('should render card notification delete button', () => {
        const docTypeHeadMappingList = [{ internalId: '123', roleCode: '125', designationCode: '124' }];
        customRender(<FormWrapper formEdit={false} setFormEdit={jest.fn()} forceUpdate={jest.fn()} setDropdownItems={jest.fn()} setDocTypeHeadMappingList={jest.fn()} isVisbile={true} setButtonData={jest.fn()} docTypeHeadMappingList={docTypeHeadMappingList} />);

        const deleteBtn = screen.getByRole('button', { name: '' });
        fireEvent.click(deleteBtn);
    });
});
