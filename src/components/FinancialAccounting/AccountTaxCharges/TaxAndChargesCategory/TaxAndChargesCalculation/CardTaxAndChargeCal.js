/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Card, Row, Col, Button, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

import FormProductAttribute from './FormTaxAndChargeCal';

const { Text } = Typography;

const CardProductAttribute = (props) => {
    const { finalFormdata, taxChargeCalForm, forceUpdate, taxCharges, productHierarchyAttributeData, taxChargeCategoryCodeData, taxChargeCalList, setTaxChargeCalList, objTaxCharge, setOpenAccordian, changeValue, setChangeValue, handleCodeFunction, editForm, formEdit, setFormEdit, uniqueCardEdit, setuniqueCardEdit, handleDescriptionChange, buttonData, setButtonData, dropdownItems, setDropdownItems, viewMode, internalId, stateData, saleData, taxCategory } = props;
    const taxChargeDesc = taxCharges?.find((e) => e?.taxType === props?.chargeType)?.taxDescription;
    const stateName = stateData?.find((e) => e?.gstStateCode === props?.gstStateCode)?.name;
    const saleTypeName = saleData?.find((e) => e?.key === props?.saleType)?.value;

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
            gstStateCode: props?.gstStateCode,
            saleType: props?.saleType,
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
                obj.gstStateCode = newFormData?.gstStateCode;
                obj.saleType = newFormData?.saleType;
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
        internalId,
        stateData,
        saleData,
        taxCategory,
    };

    useEffect(() => {
        if (formEdit) {
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formEdit]);

    return (
        <Card>
            <Row align="middle" justify="space-between" className={styles.marB20}>
                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <Text>{taxChargeDesc}</Text>
                    <Divider type="vertical" />
                    <Text>{props?.chargeCode}</Text>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <Text style={{ fontSize: '12px', color: 'grey' }}>{stateName}</Text>
                    <Divider type="vertical" />
                    <Text style={{ fontSize: '12px', color: 'grey' }}>{saleTypeName}</Text>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.buttonsGroupRight}>
                    {viewMode === false ? (
                        <>
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
                            {formEdit && props?.internalId === uniqueCardEdit && (
                                <>
                                    <Button type="link" onClick={taxChargeCalSave}>
                                        {translateContent('global.buttons.save')}
                                    </Button>
                                    <Button type="link" onClick={onTaxChargeCalculationCancel}>
                                        {translateContent('global.buttons.cancel')}
                                    </Button>
                                </>
                            )}
                        </>
                    ) : null}
                </Col>
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
