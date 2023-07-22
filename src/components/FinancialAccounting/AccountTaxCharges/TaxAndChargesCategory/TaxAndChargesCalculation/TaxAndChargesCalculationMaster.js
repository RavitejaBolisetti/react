/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState, useEffect } from 'react';
import CardProductAttribute from './CardTaxAndChargeCal';
import FormProductAttribute from './FormTaxAndChargeCal';

export const TaxAndChargesCalculationMaster = (props) => {
    const { isVisible, selectedTreeData, showGlobalNotification, taxChargeCategoryTypeData, taxCategory, taxChargeCategoryCodeData, handleCodeFunction, form, editForm, taxChargeCalForm, formEdit, setFormEdit, taxChargeCalList, setTaxChargeCalList } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [disableSaveButton, setDisableSaveButton] = useState(false);

    const [disabledEdit, setDisabledEdit] = useState(false);
    const [changeValue, setChangeValue] = useState(null);
    const [uniqueCardEdit, setuniqueCardEdit] = useState(null);

    const addTaxChargeCal = (val) => {
        taxChargeCalForm
            .validateFields()
            .then(() => {
                let data = taxChargeCalForm.getFieldsValue();
                let updateData = { ...data, internalId: Math.floor(Math.random() * 100000000 + 1) };
                setTaxChargeCalList((item) => [updateData, ...item]);
                taxChargeCalForm.resetFields();
                forceUpdate();
                // setFormBtnActive(true);
            })
            .catch((error) => console.log(error));
    };

    const taxCode = [
        { key: 1, title: 'AOP' },
        { key: 2, title: 'BOB' },
        { key: 3, title: 'C_C' },
    ];
    const cardAttributeProps = {
        taxChargeCalForm,
        addTaxChargeCal,
        forceUpdate,
        isVisible,
        selectedTreeData,
        taxCharges: taxChargeCategoryTypeData,
        taxCode,
        objTaxCharge: taxCategory,
        objTaxCode: taxCode,
        //setFormBtnActive,
        disableSaveButton,
        setDisableSaveButton,
        showGlobalNotification,
        disabledEdit,
        setDisabledEdit,
        taxChargeCalList,
        setTaxChargeCalList,
        taxChargeCategoryCodeData,
        handleCodeFunction,
        form,
        changeValue,
        setChangeValue,
        editForm,
        formEdit,
        setFormEdit,
        uniqueCardEdit,
        setuniqueCardEdit,
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
    };

    useEffect(() => {
        setTaxChargeCalList(() => []);
        let updateData = { ...taxCategory?.taxCategoryDetail, internalId: Math.floor(Math.random() * 100000000 + 1) };
        setTaxChargeCalList((item) => [updateData, ...item]);
    }, [taxCategory])

    console.log(taxCategory, 'taxCategoryGUGU')

    return (
        <>
            <FormProductAttribute {...formProductAttributeProps} />

            {taxChargeCalList?.length > 0 &&
                taxChargeCalList?.map((action) => {
                    return <CardProductAttribute {...cardAttributeProps} chargeType={action?.chargeType} chargeCode={action?.chargeCode} chargeDescription={action?.chargeDescription} internalId={action?.internalId} />;
                })}
        </>
    );
};
