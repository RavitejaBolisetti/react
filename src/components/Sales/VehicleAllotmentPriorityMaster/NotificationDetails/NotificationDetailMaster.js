/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState, useEffect } from 'react';
import CardNotificationDetail from './CardNotificationDetail';
import FormNotificationDetail from './FormNotificationDetail';

export const NotificationDetailMaster = (props) => {
    const { isVisible, selectedTreeData, showGlobalNotification, taxChargeCategoryTypeData, vehiclePriority, form, editForm, notificationDetailForm, formEdit, setFormEdit, docTypeHeadMappingList, setDocTypeHeadMappingList, buttonData, setButtonData, viewMode, dropdownItems, setDropdownItems, typeData, financialAccount } = props;
    const { roleData, handleRoleFunction, data, filterDesignationList, setFilterDesignationList, formData, filterDesignationDropdownList, setFilterDesignationDropdownList } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [changeValue, setChangeValue] = useState(null);
    const [uniqueCardEdit, setuniqueCardEdit] = useState(null);
    const [mainFomEdit, setMainFormEdit] = useState(false);
    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
    const addDocHeadMapping = () => {
        notificationDetailForm.validateFields().then(() => {
            let data = notificationDetailForm.getFieldsValue();
            let updateData = { ...data, id: '' };
            let flagExistValue = false;
            if (docTypeHeadMappingList?.length > 0) {
                for (let i = 0; i < docTypeHeadMappingList?.length; i++) {
                    if (updateData?.roleCode === docTypeHeadMappingList[i]?.roleCode && updateData?.designationCode === docTypeHeadMappingList[i]?.designationCode) {
                        flagExistValue = true;
                        break;
                    }
                }
                if (!flagExistValue) {
                    setDocTypeHeadMappingList((item) => [updateData, ...item]);
                    notificationDetailForm.resetFields();
                    forceUpdate();
                    setButtonData({ ...buttonData, formBtnActive: true });
                } else {
                    onErrorAction('Desigination has been already added.');
                }
            } else {
                setDocTypeHeadMappingList((item) => [updateData, ...item]);
                notificationDetailForm.resetFields();
                forceUpdate();

                notificationDetailForm.setFieldValue('designationCode', undefined);
                setFilterDesignationList();
                setButtonData({ ...buttonData, formBtnActive: true });
            }
        });
    };

    const cardAttributeProps = {
        notificationDetailForm,
        addDocHeadMapping,
        forceUpdate,
        isVisible,
        selectedTreeData,
        taxCharges: taxChargeCategoryTypeData,
        objTaxCharge: vehiclePriority,
        disableSaveButton,
        setDisableSaveButton,
        showGlobalNotification,
        docTypeHeadMappingList,
        setDocTypeHeadMappingList,
        typeData,
        form,
        changeValue,
        setChangeValue,
        editForm,
        formEdit,
        setFormEdit,
        uniqueCardEdit,
        setuniqueCardEdit,
        buttonData,
        setButtonData,
        viewMode,
        dropdownItems,
        setDropdownItems,
        financialAccount,
        handleRoleFunction,
        data,
        roleData,
        filterDesignationList,
        filterDesignationDropdownList,
        setFilterDesignationDropdownList,
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
        roleData,
        filterDesignationList,
        setFilterDesignationList,
        formData,
    };

    useEffect(() => {
        if (formData?.roleData?.length > 0) {
            setDocTypeHeadMappingList(() => []);
            let len = formData?.roleData?.length;
            for (let i = 0; i < len; i++) {
                let internalId = Math.floor(Math.random() * 100000000 + 1);
                setDocTypeHeadMappingList((item) => {
                    return [...item, { ...formData?.roleData[i], internalId: internalId }];
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        if (formEdit) {
            setMainFormEdit(true);
        } else {
            setMainFormEdit(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formEdit]);

    return (
        <>
            <FormNotificationDetail {...formProductAttributeProps} mainFomEdit={mainFomEdit} />

            {docTypeHeadMappingList?.length > 0 &&
                docTypeHeadMappingList?.map((action) => {
                    return <CardNotificationDetail {...cardAttributeProps} internalId={action?.internalId} id={action?.id} financialAccountHeadId={action?.financialAccountHeadId} roleCode={action?.roleCode} designationCode={action?.designationCode} />;
                })}
        </>
    );
};
