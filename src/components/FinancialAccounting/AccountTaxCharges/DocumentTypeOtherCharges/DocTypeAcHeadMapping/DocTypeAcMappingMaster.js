/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState, useEffect } from 'react';
import CardDocTypeAcMapping from './CardDocTypeAcMapping';
import FormDocTypeAcMapping from './FormDocTypeAcMapping';

export const DocTypeAcMappingMaster = (props) => {
    const { isVisible, selectedTreeData, showGlobalNotification, taxChargeCategoryTypeData, docTypeLedger, form, editForm, docTypeHeadMappingForm, formEdit, setFormEdit, docTypeHeadMappingList, setDocTypeHeadMappingList, buttonData, setButtonData, viewMode, dropdownItems, setDropdownItems, typeData, financialAccount } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [changeValue, setChangeValue] = useState(null);
    const [uniqueCardEdit, setuniqueCardEdit] = useState(null);
    const [mainFomEdit, setMainFormEdit] = useState(false);

    const addDocHeadMapping = (val) => {
        docTypeHeadMappingForm
            .validateFields()
            .then(() => {
                let data = docTypeHeadMappingForm.getFieldsValue();

                let updateData = { ...data, internalId: Math.floor(Math.random() * 100000000 + 1), id: '' };
                setDocTypeHeadMappingList((item) => [updateData, ...item]);
                docTypeHeadMappingForm.resetFields();
                forceUpdate();
                setButtonData({ ...buttonData, formBtnActive: true });
                // handleCodeFunction();
            })
            .catch((error) => console.log(error));
    };

    const cardAttributeProps = {
        docTypeHeadMappingForm,
        addDocHeadMapping,
        forceUpdate,
        isVisible,
        selectedTreeData,
        taxCharges: taxChargeCategoryTypeData,
        objTaxCharge: docTypeLedger,
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
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
    };

    useEffect(() => {
        if (docTypeLedger?.accountLedgerMappingDtoList?.length > 0) {
            setDocTypeHeadMappingList(() => []);
            let len = docTypeLedger?.accountLedgerMappingDtoList?.length;
            for (let i = 0; i < len; i++) {
                let internalId = Math.floor(Math.random() * 100000000 + 1);
                setDocTypeHeadMappingList((item) => {
                    return [...item, { ...docTypeLedger?.accountLedgerMappingDtoList[i], internalId: internalId }];
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [docTypeLedger]);

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
            <FormDocTypeAcMapping {...formProductAttributeProps} mainFomEdit={mainFomEdit} />

            {docTypeHeadMappingList?.length > 0 &&
                docTypeHeadMappingList?.map((action) => {
                    return <CardDocTypeAcMapping {...cardAttributeProps} chargeCode={action?.chargeCode} internalId={action?.internalId} id={action?.id} financialAccountHeadId={action?.financialAccountHeadId} financialAccountHeadDesc={action?.financialAccountHeadDesc} chargeCodeDesc={action?.chargeCodeDesc} />;
                })}
        </>
    );
};
