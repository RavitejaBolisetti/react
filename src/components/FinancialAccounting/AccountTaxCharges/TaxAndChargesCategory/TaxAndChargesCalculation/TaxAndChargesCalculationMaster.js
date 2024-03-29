/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState, useEffect } from 'react';
import CardProductAttribute from './CardTaxAndChargeCal';
import FormProductAttribute from './FormTaxAndChargeCal';

export const TaxAndChargesCalculationMaster = (props) => {
    const { isVisible, selectedTreeData, taxChargeCategoryTypeData, taxCategory, taxChargeCategoryCodeData, handleCodeFunction, form, editForm, taxChargeCalForm, formEdit, setFormEdit, taxChargeCalList, setTaxChargeCalList, buttonData, setButtonData, viewMode, dropdownItems, setDropdownItems, stateData, saleData, isTaxCategoryCodeLoading, showGlobalNotification } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [changeValue, setChangeValue] = useState(null);
    const [uniqueCardEdit, setuniqueCardEdit] = useState(null);
    const [mainFomEdit, setMainFormEdit] = useState(false);

    const commonFun = () => {
        taxChargeCalForm.resetFields();
        setButtonData({ ...buttonData, formBtnActive: true });
        handleCodeFunction();
    };

    const addTaxChargeCal = () => {
        taxChargeCalForm
            .validateFields()
            .then(() => {
                let data = taxChargeCalForm.getFieldsValue();
                let updateData = { ...data, internalId: Math.floor(Math.random() * 100000000 + 1), id: '' };
                if (taxChargeCalList?.length > 0) {
                    let insertFlag = false;
                    for (let i = 0; i < taxChargeCalList?.length; i++) {
                        if (taxChargeCalList[i]?.stateCode === data?.stateCode && taxChargeCalList[i]?.saleType === data?.saleType && taxChargeCalList[i]?.chargeType === data?.chargeType && taxChargeCalList[i]?.chargeCode === data?.chargeCode) {
                            insertFlag = true;
                            break;
                        }
                    }
                    if (insertFlag) {
                        showGlobalNotification({ message: 'record with this combination already exists' });
                    } else {
                        setTaxChargeCalList((item) => [updateData, ...item]);
                        commonFun();
                    }
                } else {
                    setTaxChargeCalList([updateData]);
                    commonFun();
                }
            })
            .catch((err) => console.error(err));
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
