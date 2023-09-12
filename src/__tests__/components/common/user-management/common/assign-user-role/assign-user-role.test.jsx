import '@testing-library/jest-dom/extend-expect';
import AssignUserRole, { chackedKeysMapData } from 'components/common/UserManagement/common/AssignUserRole/AssignUserRoleMain';
import { fireEvent, render, screen } from "@testing-library/react";
import customRender from '@utils/test-utils';
import React from 'react';

afterEach(() => {
    jest.restoreAllMocks();
});

const userRoleDataList=[{"id":"106","roleId":"106","roleName":"SDE","roleDescription":"Software Developer Engineer","status":true,"accessProvided":3}]

describe('AssignUser Role components', () => {

    it('should render AssignUser Role components', () => {
        customRender(<AssignUserRole resetMnmUserRoleAppDataList={jest.fn()} resetUsrDlrRoleAppDataList={jest.fn()}/>)
    });

    it('save button should work', () => {
        const buttonData={
            formBtnActive: true,
            saveBtn: true
        };
        customRender(<AssignUserRole setButtonData={jest.fn()} resetMnmUserRoleAppDataList={jest.fn()} resetUsrDlrRoleAppDataList={jest.fn()} buttonData={buttonData} />);

        const saveBtn=screen.getByRole('button', { name: 'Save & Close' });
        fireEvent.click(saveBtn);
    });

    it('save button should work for last section', () => {
        const buttonData={
            formBtnActive: true,
            saveBtn: true
        };
        customRender(<AssignUserRole isLastSection={true} setButtonData={jest.fn()} resetMnmUserRoleAppDataList={jest.fn()} resetUsrDlrRoleAppDataList={jest.fn()} buttonData={buttonData} />);

        const saveBtn=screen.getByRole('button', { name: 'Save & Close' });
        fireEvent.click(saveBtn);
    });

    it('chackedKeysMapData function should work', () => {
        const treeData=[{value: 'Kai', checked: true, children: [{value: 'Kai1', checked:true, children: [{value: 'Kai2'}]}]}];
        chackedKeysMapData(treeData);
    });

    it('should return error action function and button data should set', () => {
        const formData={
            employeeCode: 106
        };
        const fetchUserRoleList=jest.fn();
        const setButtonData=jest.fn();
        render(<AssignUserRole resetMnmUserRoleAppDataList={jest.fn()} resetUsrDlrRoleAppDataList={jest.fn()} userType={'MNM'} setButtonData={setButtonData} userId={106} formData={formData} fetchUserRoleList={fetchUserRoleList} />);
        fetchUserRoleList.mock.calls[0][0].onErrorAction('Kai');
        const callback=setButtonData.mock.calls[0][0];
        callback('hello');
    });

    it('should render component with data', () => {
        const dlrAppList={
            employeeCode: 106
        };
        const setButtonData=jest.fn();
        render(<AssignUserRole resetMnmUserRoleAppDataList={jest.fn()} resetUsrDlrRoleAppDataList={jest.fn()} userType={'DLR'} setButtonData={setButtonData} isDlrAppLoaded={true} dlrAppList={dlrAppList} />);
        const callback=setButtonData.mock.calls[0][0];
        callback('hello');
    });

    it('edit and save button should work', () => {
        const mnmAppList={
            employeeCode: 106
        };
        const formData={
            employeeCode: 106
        };
        const formActionType={
            viewMode: false,
            formBtnActive: true
        };
        render(<AssignUserRole formActionType={formActionType} fetchMNMUserRoleAppDataList={jest.fn()} fetchUserRoleList={jest.fn()} formData={formData} userId={106} resetMnmUserRoleAppDataList={jest.fn()} resetUsrDlrRoleAppDataList={jest.fn()} userType={'MNM'} setButtonData={jest.fn()} isMnmAppLoaded={true} mnmAppList={mnmAppList} userRoleDataList={userRoleDataList} />);
        const editBtn=screen.getByTestId('edit');
        fireEvent.click(editBtn);
        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('edit and cancel button should work', () => {
        const formActionType={
            viewMode: false
        };
        const formData={
            employeeCode: 106
        };
        customRender(<AssignUserRole fetchDLRUserRoleDataList={jest.fn()} setButtonData={jest.fn()} fetchMNMUserRoleAppDataList={jest.fn()} fetchUserRoleList={jest.fn()} formActionType={formActionType} formData={formData} userId={106} resetMnmUserRoleAppDataList={jest.fn()} userType={'DLR'} resetUsrDlrRoleAppDataList={jest.fn()} userRoleDataList={userRoleDataList} />);
        const editBtn=screen.getByTestId('edit');
        fireEvent.click(editBtn);
        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('add button should work', () => {
        const formActionType={
            viewMode: false
        };
        const formData={
            employeeCode: 106
        };
        customRender(<AssignUserRole  setButtonData={jest.fn()}  fetchUserRoleList={jest.fn()} formActionType={formActionType} formData={formData} userId={106} resetMnmUserRoleAppDataList={jest.fn()} userType={'DLR'} resetUsrDlrRoleAppDataList={jest.fn()} userRoleDataList={userRoleDataList} />);
        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
    });

});