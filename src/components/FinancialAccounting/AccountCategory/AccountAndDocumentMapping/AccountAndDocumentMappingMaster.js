/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState, useEffect } from 'react';
import CardAccountAndDocumentMapping from './CardAccountAndDocumentMapping';
import FormAccountAndDocumentMapping from './FormAccountAndDocumentMapping';

export const AccountAndDocumentMappingMaster = (props) => {
    const { isVisible, showGlobalNotification, handleCodeFunction, form, editForm, accDocMapForm, formEdit, setFormEdit, buttonData, setButtonData, viewMode, dropdownItems, setDropdownItems, accountDocumentMaps, setAccountDocumentMaps, accountCategory, applicationMenuData, financialAccountData, documentDescriptionData, setUserApplicationId, selectedTreeSelectKey, setSelectedTreeSelectKey, formActionType } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [changeValue, setChangeValue] = useState(null);
    const [uniqueCardEdit, setuniqueCardEdit] = useState(null);
    const [mainFomEdit, setMainFormEdit] = useState(false);
    const [mainSelectedKey, setMainSelectedKey] = useState(null);
    const [appSelectName, setAppSelectName] = useState(null);

    const addDocAndMapp = (val) => {
        accDocMapForm
            .validateFields()
            .then(() => {
                let data = accDocMapForm.getFieldsValue();
                let updateData = { ...data, internalId: Math.floor(Math.random() * 100000000 + 1), accountDocumentMapId: '', financialAccountHead: financialAccountData?.find((e) => e?.key === data?.financialAccountHeadCode)?.value, documentDescription: documentDescriptionData?.find((e) => e?.key === data?.documentTypeCode)?.value };
                setAccountDocumentMaps((item) => [updateData, ...item]);
                accDocMapForm.resetFields();
                setMainSelectedKey(null);
                setButtonData({ ...buttonData, formBtnActive: true });
            })
            .catch((error) => console.log(error));
    };

    const handleSelectTreeClick = (value, treeObj) => {
        setUserApplicationId(value);
        setAppSelectName(treeObj?.[0]);

        let obj = {
            applicationId: value,
            applicationName: treeObj?.[0],
            documentTypeCode: null,
        };

        if (formEdit) {
            editForm.setFieldsValue(obj);
            setSelectedTreeSelectKey(value);
        } else {
            accDocMapForm.setFieldsValue(obj);
            setMainSelectedKey(value);
        }
    };

    const cardAttributeProps = {
        accDocMapForm,
        addDocAndMapp,
        forceUpdate,
        isVisible,
        disableSaveButton,
        setDisableSaveButton,
        showGlobalNotification,
        accountDocumentMaps,
        setAccountDocumentMaps,
        handleCodeFunction,
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
        accountCategory,
        applicationMenuData,
        financialAccountData,
        setSelectedTreeSelectKey,
        setUserApplicationId,
        documentDescriptionData,
        handleSelectTreeClick,
        appSelectName,
        formActionType,
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
    };

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
            <FormAccountAndDocumentMapping {...formProductAttributeProps} mainFomEdit={mainFomEdit} selectedTreeSelectKey={mainSelectedKey} />
            {accountDocumentMaps?.length > 0 &&
                accountDocumentMaps?.map((action) => {
                    return <CardAccountAndDocumentMapping {...cardAttributeProps} internalId={action?.internalId} accountDocumentMapId={action?.accountDocumentMapId} applicationId={action?.applicationId} applicationMenu={action?.applicationMenu} documentTypeCode={action?.documentTypeCode} documentDescription={action?.documentDescription} financialAccountHeadCode={action?.financialAccountHeadCode} financialAccountHead={action?.financialAccountHead} selectedTreeSelectKey={selectedTreeSelectKey} applicationName={action?.applicationName} />;
                })}
        </>
    );
};
