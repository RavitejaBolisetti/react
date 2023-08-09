/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { Fragment, useEffect } from 'react';
import { Card, Row, Button, Divider, Typography, Space } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import FormProductAttribute from './FormTaxAndChargeCal';

const { Text } = Typography;

const CardProductAttribute = (props) => {
    const { finalFormdata, taxChargeCalForm, forceUpdate, taxCharges, productHierarchyAttributeData, taxChargeCategoryCodeData, taxChargeCalList, setTaxChargeCalList, objTaxCharge, setOpenAccordian, changeValue, setChangeValue, handleCodeFunction, editForm, formEdit, setFormEdit, uniqueCardEdit, setuniqueCardEdit, handleDescriptionChange, buttonData, setButtonData, dropdownItems, setDropdownItems, viewMode } = props;
    const taxChargeDesc = taxCharges?.find((e) => e?.taxType === props?.chargeType)?.taxDescription;

    const taxChargeCalEdit = (props) => {
        setuniqueCardEdit(props?.internalId);
        setFormEdit(true);
        setButtonData({ ...buttonData, formBtnActive: true });

        editForm.setFieldsValue({
            chargeCode: props?.chargeCode,
            chargeType: props?.chargeType,
            chargeDescription: props?.chargeDescription,
            internalId: props?.internalId,
            taxMasterId: props?.taxMasterId,
        });

        handleCodeFunction(props?.chargeType);
    };

    const taxChargeCalSave = () => {
        let newFormData = editForm?.getFieldsValue();

        const upd_obj = taxChargeCalList?.map((obj) => {
            if (obj?.internalId === newFormData?.internalId) {
                obj.chargeCode = newFormData?.chargeCode;
                obj.chargeType = newFormData?.chargeType;
                obj.chargeDescription = newFormData?.chargeDescription;
                obj.internalId = newFormData?.internalId;
                obj.taxMasterId = newFormData?.taxMasterId;
            }
            return obj;
        });

        setTaxChargeCalList([...upd_obj]);
        setDropdownItems(() => []);
        setFormEdit(false);
        forceUpdate();
    };

    const onTaxChargeCalculationDelete = (val) => {
        setTaxChargeCalList((prev) => {
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
        setDropdownItems(() => []);
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
        handleDescriptionChange,
        dropdownItems,
    };

    useEffect(() => {
        if (formEdit) {
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formEdit]);

    return (
        <Card
            style={{
                backgroundColor: '#BEBEBE1A',
            }}
        >
            <Row align="middle" justify="space-between" className={styles.marB20}>
                <Space>
                    <Text>{taxChargeDesc}</Text>

                    <Divider type="vertical" />

                    <Text>{props?.chargeCode}</Text>
                </Space>

                {viewMode === false ? (
                    <Row>
                        <div className={styles.cardItemBtn}>
                            {!formEdit && (
                                <>
                                    <Button
                                        type="link"
                                        icon={<FiEdit />}
                                        onClick={() => {
                                            taxChargeCalEdit(props);
                                        }}
                                        //disabled={props?.disabledEdit}
                                    />
                                    <Button onClick={() => onTaxChargeCalculationDelete(props)} type="link" icon={<FiTrash />} disabled={props?.id ? true : false} />
                                </>
                            )}
                        </div>
                        {formEdit && props?.internalId === uniqueCardEdit && (
                            <div className={styles.cardItemBtn}>
                                <Button type="link" onClick={onTaxChargeCalculationCancel}>
                                    Cancel
                                </Button>
                                <Button type="link" onClick={taxChargeCalSave}>
                                    Save
                                </Button>
                            </div>
                        )}
                    </Row>
                ) : null}
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
