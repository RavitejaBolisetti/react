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

const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, cancelOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelVPOBtn: true, cancelOtfBtn: true, nextBtn: true, saveBtn: true };

const FormWrapper = (props) => {
    const [notificationDetailForm] = Form.useForm();
    const myFormMock = {
        ...notificationDetailForm,
        validateFields: jest.fn(),
        setFieldsValue: jest.fn(),
    };
    return <NotificationDetailMaster notificationDetailForm={myFormMock} {...props} />;
};

describe('Notification Detail Master component', () => {
    it('should render notification detail master component', () => {
        customRender(<NotificationDetailMaster isLoading={true} buttonData={buttonData} setButtonData={jest.fn()} validateFields={jest.fn()} />);
    });
    it('it should click when user click on button', () => {
        customRender(<FormWrapper buttonData={buttonData} setButtonData={jest.fn()} validateFields={jest.fn()} />);
        const addBtn = screen.getByRole('button', { name: 'Add' });
        fireEvent.click(addBtn);
        const roleName = screen.getByRole('combobox', { name: 'Role Name' });
        fireEvent.click(roleName);
        const designationName = screen.getByRole('combobox', { name: 'Designation Name' });
        fireEvent.click(designationName);
    });

    // it('should render notification detail master text', () => {
    //     customRender(<NotificationDetailMaster isLoading={true} />);
    //     const roleName = screen.getAllByText(/Role Name/i);
    //     fireEvent.click(roleName[0]);
    //     const selectRoleName = screen.getByText(/Select role name/i);
    //     fireEvent.click(selectRoleName);
    //     const selectDesignationName = screen.getByText(/Select designation name/i);
    //     fireEvent.click(selectDesignationName);
    //     const designationName = screen.getAllByText(/Designation Name/i);
    //     fireEvent.click(designationName[0]);
    //     const internalId = screen.getByText('Internal Id');
    //     fireEvent.click(internalId);
    //     const id = screen.getByText('Id');
    //     fireEvent.click(id);
    //     const add = screen.getByText(/Add/i);
    //     fireEvent.click(add);
    // });
});
