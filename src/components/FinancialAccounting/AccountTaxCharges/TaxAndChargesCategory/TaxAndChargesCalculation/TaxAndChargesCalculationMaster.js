/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState } from 'react';
import { Form } from 'antd';
import CardProductAttribute from './CardTaxAndChargeCal';
import FormProductAttribute from './FormTaxAndChargeCal';

export const TaxAndChargesCalculationMaster = (props) => {
    const { isVisible, selectedTreeData, showGlobalNotification, taxChargeCategoryTypeData ,taxChargeCategoryCodeData ,handleCodeFunction,form} = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [taxChargeCalForm] = Form.useForm();
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [taxChargeCalList, setTaxChargeCalList] = useState([]);
    const [disabledEdit, setDisabledEdit] = useState(false);
    const [changeValue, setChangeValue] = useState(null);

    const addTaxChargeCal = (val) => {
        taxChargeCalForm
            .validateFields()
            .then(() => {
                let data = taxChargeCalForm.getFieldsValue();
                //internalId: Math.floor(Math.random() * 100000000 + 1)
                setTaxChargeCalList((item) => [data, ...item]);
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
        taxCharge: taxChargeCategoryTypeData,
        taxCode,
        objTaxCharge: taxChargeCategoryTypeData,
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
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
    };


    return (
        <>
            <FormProductAttribute {...formProductAttributeProps} />

            {taxChargeCalList?.length > 0 &&
                taxChargeCalList?.map((action) => {
                    return <CardProductAttribute {...cardAttributeProps} taxChargeTypeCode={action?.taxChargeTypeCode} taxChargeCode={action?.taxChargeCode} chargeDesc={action?.chargeDesc} internalId={action?.internalId} />;
                })}
        </>
    );
};
