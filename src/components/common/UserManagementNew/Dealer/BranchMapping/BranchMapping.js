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
    const { currentSection, formData, userId, selectedDealerCode, dealerDataList, setButtonData, showGlobalNotification, handleButtonClick } = props;
    const { fetchUsrDlrBranchLocationsList, resetUsrDlrBranchLocationsList, userUsrDlrBrLoactionShowLoading, usrdlrBranchLocationDataList, isUsrDlrBrLocationLoding, isUsrdlrBrLocationsLoaded } = props;
    const { fetchDlrBranchLocationsList, saveUsrDlrBrLoactionRoleDataList, resetDlrBranchLocationsList, userDlrBrLoactionShowLoading, dlrBranchLocationDataList, isDlrBrLocationLoding, isdlrBrLocationsLoaded } = props;
    const [form] = Form.useForm();
    const [dealerBranches, setDealerBranches] = useState([]);
    const [parentDealerCode, setParentDealerCode] = useState('');

    useEffect(() => {
        setButtonData((prev) => ({ ...prev, nextBtn: false, nextBtnWthPopMag: false, saveBtn: true }));

        return () => {
            resetUsrDlrBranchLocationsList();
            resetDlrBranchLocationsList();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const parentGroupId = dealerDataList?.find((el) => el?.dealerCode === selectedDealerCode || el?.dealerCode === formData?.dealerCode)?.dealerParentGroupCode;
        setParentDealerCode(parentGroupId);

        if (dlrBranchLocationDataList?.length && isUsrdlrBrLocationsLoaded) {
            console.log("🚀 ~ file: BranchMapping.js:35 ~ useEffect ~ dlrBranchLocationDataList:", dlrBranchLocationDataList)
            const defaultBranches = [];
            dlrBranchLocationDataList?.forEach((branch) => {
                let matchMapdata = usrdlrBranchLocationDataList?.find((el) => el?.locationCode === branch?.id);
                if (matchMapdata) {
                    defaultBranches.push({ ...matchMapdata, locationName: branch?.dealerLocationName });
                } else {
                    let unMapdata = { id: '', locationCode: branch?.id, locationName: branch?.dealerLocationName, parentGroupId: branch?.parentGroupCode || parentGroupId, defaultBranchIndicator: false, status: false, userId: formData?.userName };

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
        if (userId && parentDealerCode && !isdlrBrLocationsLoaded) {
            const extraParams = [
                {
                    key: 'dealerParentCode',
                    title: 'dealerParentCode',
                    value: parentDealerCode,
                    name: 'dealerParentCode',
                },
            ];
            fetchDlrBranchLocationsList({ setIsLoading: userDlrBrLoactionShowLoading, extraParams, userId });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, parentDealerCode]);

    const onFinish = (data) => {
        const onErrorAction = (res) => {
            console.error(res);
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
            onErrorAction,
            onSuccess,
        };

        saveUsrDlrBrLoactionRoleDataList(requestData);
    };

    const handleFormValueChange = () => {
        setButtonData((prev) => ({ ...prev, nextBtn: false, saveBtn: true, formBtnActive: true }));
    };
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const formProps = { ...props, currentSection, dealerBranches, setDealerBranches, isUsrDlrBrLocationLoding, isDlrBrLocationLoding };
    const buttonProps = { ...props };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <AddEditForm {...formProps} />
                <UserManagementFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export default BranchMapping;
