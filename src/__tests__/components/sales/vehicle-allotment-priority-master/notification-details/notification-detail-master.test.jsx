/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { NotificationDetailMaster } from '@components/Sales/VehicleAllotmentPriorityMaster/NotificationDetails/NotificationDetailMaster';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, cancelOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, nextBtn: true, saveBtn: true };

const FormWrapper = (props) => {
    const [notificationDetailForm] = Form.useForm();

    const myFormMock = {
        ...notificationDetailForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <NotificationDetailMaster notificationDetailForm={myFormMock} {...props} />;
};

const formData = {
    roleData: {
        key: 'RL0007',
        parentKey: 'DE08',
        value: 'Dealer role',
    },
};

describe('Notification Detail Master component', () => {
    it('should render notification detail master component', () => {
        customRender(<NotificationDetailMaster formData={formData} setButtonData={jest.fn()} isLoading={true} buttonData={buttonData} validateFields={jest.fn()} />);
    });
    it('it should click when user click on button', () => {
        const docTypeHeadMappingList = [{ internalId: '123', roleCode: '12', id: '66', designationCode: '124', financialAccountHeadId: '2345' }];

        customRender(<FormWrapper buttonData={buttonData} setFilterDesignationList={jest.fn()} formData={formData} setDocTypeHeadMappingList={jest.fn()} docTypeHeadMappingList={docTypeHeadMappingList} isLoading={true} setButtonData={jest.fn()} validateFields={jest.fn()} />);
        const addBtn = screen.getByRole('button', { name: 'Add' });
        fireEvent.click(addBtn);
        const iconBtn = screen.getByRole('button', { name: '' });
        fireEvent.click(iconBtn);
        const roleName = screen.getByRole('combobox', { name: 'Role Name' });
        fireEvent.click(roleName);
        const designationName = screen.getByRole('combobox', { name: 'Designation Name' });
        fireEvent.click(designationName);
    });
});
