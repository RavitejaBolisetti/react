/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { Fragment, useEffect } from 'react';
import { Card, Row, Button, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import FormProductAttribute from './FormTaxAndChargeCal';

const { Text } = Typography;

const CardProductAttribute = (props) => {
    const { isVisible, finalFormdata, taxChargeCalForm, forceUpdate, taxCharges, productHierarchyAttributeData, taxChargeCategoryCodeData, setDisabledEdit, taxChargeCalList, setTaxChargeCalList, objTaxCharge, setOpenAccordian, changeValue, setChangeValue, handleCodeFunction, editForm, formEdit, setFormEdit, uniqueCardEdit, setuniqueCardEdit, setTaxMasterId,handleDescriptionChange } = props;
    const taxChargeDesc = taxCharges?.find((e) => e?.taxType === props?.chargeType)?.taxDescription;
    const taxChargeCalEdit = (props) => {
        setuniqueCardEdit(props?.internalId);
        setFormEdit(true);
        editForm.setFieldsValue({
            chargeCode: props?.chargeCode,
            chargeType: props?.chargeType,
            chargeDescription: props?.chargeDescription,
            internalId: props?.internalId,
        });

        //setFormBtnActive(true);
    };

    const taxChargeCalSave = () => {
        let newFormData = editForm?.getFieldsValue();

        const upd_obj = taxChargeCalList?.map((obj) => {
            if (obj?.internalId === newFormData?.internalId) {
                obj.chargeCode = typeof newFormData?.chargeCode === 'object' ? newFormData?.chargeCode?.title : newFormData?.chargeCode;
                obj.chargeType = typeof newFormData?.chargeType === 'object' ? newFormData?.chargeType?.title : newFormData?.chargeType;
                obj.chargeDescription = newFormData?.chargeDescription;
                obj.internalId = newFormData?.internalId;
            }
            return obj;
        });

        setTaxChargeCalList([...upd_obj]);
        setFormEdit(false);
        forceUpdate();
    };

    const onTaxChargeCalculationDelete = (val) => {
        console.log(val, 'VAL____');
        setTaxChargeCalList((prev) => {
            const indx = prev.findIndex((el) => el.internalId === val?.internalId);
            let updatedValue = prev;
            updatedValue?.splice(indx, 1);
            return updatedValue;
        });

        setTaxMasterId((prev) => {
            const indx = prev.findIndex((el) => el.internalId === val?.internalId);
            let updatedValue = prev;
            updatedValue?.splice(indx, 1);
            return updatedValue;
        });

        setFormEdit(false);
        taxChargeCalForm.resetFields();
        forceUpdate();
    };

    const onTaxChargeCalculationCancel = () => {
        setFormEdit(false);
    };

    const FormProductAttributeProp = {
        productHierarchyAttributeData,
        editForm,
        finalFormdata,
        formEdit,
        taxChargeCalList,
        taxCharges,
        taxCharge: objTaxCharge,
        taxChargeCategoryCodeData,
        setOpenAccordian,
        changeValue,
        setChangeValue,
        handleCodeFunction,
        taxChargeCalForm,
        setTaxMasterId,
        handleDescriptionChange,
    };

    useEffect(() => {
        if (formEdit) {
            setDisabledEdit(true);
        } else {
            setDisabledEdit(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formEdit]);

    return (
        <Card
            style={{
                backgroundColor: '#BEBEBE1A',
                marginTop: '12px',
            }}
        >
            <Row align="middle" justify="space-between">
                <Row align="center">
                    <div>
                        {/* <Text>{taxChargeDesc}</Text> */}
                        <Text>{taxChargeDesc}</Text>
                    </div>
                    <Divider type="vertical" />
                    <div>
                        <Text>{props?.chargeCode}</Text>
                    </div>
                </Row>

                {isVisible && (
                    <Row>
                        {!formEdit ? (
                            <div className={styles.cardItemBtn}>
                                <>
                                    <Button
                                        type="link"
                                        icon={<FiEdit />}
                                        onClick={() => {
                                            taxChargeCalEdit(props);
                                        }}
                                        disabled={props?.disabledEdit}
                                    />
                                    <Button onClick={() => onTaxChargeCalculationDelete(props)} type="link" icon={<FiTrash />} disabled={props?.disabledEdit || (props?.id ? true : false)} />
                                </>
                            </div>
                        ) : (
                            props?.internalId === uniqueCardEdit && (
                                <div className={styles.cardItemBtn}>
                                    <Button type="link" onClick={onTaxChargeCalculationCancel}>
                                        Cancel
                                    </Button>
                                    <Button type="link" onClick={taxChargeCalSave}>
                                        Save
                                    </Button>
                                </div>
                            )
                        )}
                    </Row>
                )}
            </Row>

            {formEdit && props?.internalId === uniqueCardEdit && (
                <>
                    <Divider />
                    <FormProductAttribute {...FormProductAttributeProp} />
                </>
            )}
        </Card>
    );
};

export default CardProductAttribute;
