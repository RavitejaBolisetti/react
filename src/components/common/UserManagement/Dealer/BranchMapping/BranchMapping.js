/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { UserManagementFormButton } from '../../UserManagementFormButton/UserManagementFormButton';
import AddEditForm from './AddEditForm';
import { NEXT_ACTION } from 'utils/btnVisiblity';

const BranchMapping = (props) => {
    const { currentSection, formData, userId, setButtonData, showGlobalNotification, handleButtonClick, loginUserData } = props;
    const { fetchUsrDlrBranchLocationsList, resetUsrDlrBranchLocationsList, userUsrDlrBrLoactionShowLoading, usrdlrBranchLocationDataList, isUsrDlrBrLocationLoding, isUsrdlrBrLocationsLoaded } = props;
    const { fetchDlrBranchLocationsList, saveUsrDlrBrLoactionRoleDataList, resetDlrBranchLocationsList, userDlrBrLoactionShowLoading, dlrBranchLocationDataList, isDlrBrLocationLoding } = props;
    const [form] = Form.useForm();
    const [dealerBranches, setDealerBranches] = useState([]);

    useEffect(() => {
        return () => {
            resetUsrDlrBranchLocationsList();
            resetDlrBranchLocationsList();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (dlrBranchLocationDataList?.length && isUsrdlrBrLocationsLoaded) {
            const defaultBranches = [];
            dlrBranchLocationDataList?.forEach((branch) => {
                let matchMapdata = usrdlrBranchLocationDataList?.find((el) => el?.locationCode === branch?.id);
                if (matchMapdata) {
                    defaultBranches.push({ ...matchMapdata, locationName: branch?.dealerLocationName });
                } else {
                    let unMapdata = { id: '', locationCode: branch?.id, locationName: branch?.dealerLocationName, parentGroupId: loginUserData?.parentGroupCode, defaultBranchIndicator: false, status: false, userId: formData?.employeeCode };

                    defaultBranches.push(unMapdata);
                }
            });
            setDealerBranches([...defaultBranches]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dlrBranchLocationDataList, usrdlrBranchLocationDataList, isUsrdlrBrLocationsLoaded]);

    useEffect(() => {
        if (userId && formData?.employeeCode && !isUsrdlrBrLocationsLoaded) {
            const extraParams = [
                {
                    key: 'employeeCode',
                    title: 'employeeCode',
                    value: formData?.employeeCode,
                    name: 'employeeCode',
                },
            ];
            fetchUsrDlrBranchLocationsList({ setIsLoading: userUsrDlrBrLoactionShowLoading, extraParams, userId });
        }
        if (userId) {
            fetchDlrBranchLocationsList({ setIsLoading: userDlrBrLoactionShowLoading, userId });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onFinish = () => {
        if (!dealerBranches?.length) {
            return;
        }
        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const onSuccess = (res) => {
            form.resetFields();
            handleButtonClick({ buttonAction: NEXT_ACTION });
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };

        const requestData = {
            data: dealerBranches?.filter((el) => el?.id || el?.status),
            setIsLoading: userUsrDlrBrLoactionShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveUsrDlrBrLoactionRoleDataList(requestData);
    };

    const handleFormValueChange = () => {
        setButtonData((prev) => ({ ...prev, nextBtn: false, saveBtn: true, formBtnActive: true }));
    };

    const formProps = { ...props, currentSection, dealerBranches, setDealerBranches, isUsrDlrBrLocationLoding, isDlrBrLocationLoding };
    const buttonProps = { ...props };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
                <AddEditForm {...formProps} />
                <UserManagementFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export default BranchMapping;
