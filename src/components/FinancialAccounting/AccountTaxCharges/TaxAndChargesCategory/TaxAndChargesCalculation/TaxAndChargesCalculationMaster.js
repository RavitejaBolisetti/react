/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState, useEffect } from 'react';
import CardProductAttribute from './CardTaxAndChargeCal';
import FormProductAttribute from './FormTaxAndChargeCal';

export const TaxAndChargesCalculationMaster = (props) => {
    const { isVisible, selectedTreeData, showGlobalNotification, taxChargeCategoryTypeData, taxCategory, taxChargeCategoryCodeData, handleCodeFunction, form, editForm, taxChargeCalForm, formEdit, setFormEdit, taxChargeCalList, setTaxChargeCalList, buttonData, setButtonData, viewMode, dropdownItems, setDropdownItems, stateData, saleData, isTaxCategoryCodeLoading } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [changeValue, setChangeValue] = useState(null);
    const [uniqueCardEdit, setuniqueCardEdit] = useState(null);
    const [mainFomEdit, setMainFormEdit] = useState(false);

    const addTaxChargeCal = (val) => {
        taxChargeCalForm.validateFields().then(() => {
            let data = taxChargeCalForm.getFieldsValue();

            let updateData = { ...data, internalId: Math.floor(Math.random() * 100000000 + 1), id: '' };
            setTaxChargeCalList((item) => [updateData, ...item]);
            taxChargeCalForm.resetFields();
            forceUpdate();
            setButtonData({ ...buttonData, formBtnActive: true });
            handleCodeFunction();
        }).catch(err => console.error(err));
    };

    const handleDescriptionChange = (taxCode) => {
        setChangeValue(taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription);
        formEdit ? editForm.setFieldValue('chargeDescription', taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription) : taxChargeCalForm.setFieldValue('chargeDescription', taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription);

        let codeFind = {
            taxMasterId: taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.id,
        };
        if (formEdit) {
            editForm.setFieldsValue(codeFind);
        } else {
            taxChargeCalForm.setFieldsValue(codeFind);
        }
    };

    const cardAttributeProps = {
        taxChargeCalForm,
        addTaxChargeCal,
        forceUpdate,
        isVisible,
        selectedTreeData,
        taxCharges: taxChargeCategoryTypeData,
        objTaxCharge: taxCategory,
        disableSaveButton,
        setDisableSaveButton,
        showGlobalNotification,
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
        handleDescriptionChange,
        buttonData,
        setButtonData,
        viewMode,
        dropdownItems,
        setDropdownItems,
        stateData,
        saleData,
        taxCategory,
        isTaxCategoryCodeLoading,
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
    };

    useEffect(() => {
        if (taxCategory?.taxCategoryDetail?.length > 0) {
            setTaxChargeCalList(() => []);
            let len = taxCategory?.taxCategoryDetail?.length;
            for (let i = 0; i < len; i++) {
                let internalId = Math.floor(Math.random() * 100000000 + 1);
                setTaxChargeCalList((item) => [...item, { ...taxCategory?.taxCategoryDetail[i], internalId: internalId }]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taxCategory]);

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
            <FormProductAttribute {...formProductAttributeProps} mainFomEdit={mainFomEdit} />

            {taxChargeCalList?.length > 0 &&
                taxChargeCalList?.map((action) => {
                    return <CardProductAttribute {...cardAttributeProps} chargeType={action?.chargeType} chargeCode={action?.chargeCode} chargeDescription={action?.chargeDescription} internalId={action?.internalId} id={action?.id} taxMasterId={action?.taxMasterId} stateCode={action?.stateCode} saleType={action?.saleType} />;
                })}
        </>
    );
};
