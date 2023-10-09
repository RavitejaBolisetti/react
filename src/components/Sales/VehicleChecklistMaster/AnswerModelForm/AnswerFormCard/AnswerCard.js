/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Card, Row, Col, Button, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'assets/sass/app.module.scss';

import AnswerForm from './AnswerForm';

const { Text } = Typography;

const AnswerCard = (props) => {
    const { finalFormdata, taxChargeCalForm, forceUpdate, taxCharges, productHierarchyAttributeData, taxChargeCategoryCodeData, answerData, setTaxChargeCalList, objTaxCharge, setOpenAccordian, changeValue, setChangeValue, handleCodeFunction, editForm, formEdit, setFormEdit, uniqueCardEdit, setuniqueCardEdit, handleDescriptionChange, buttonData, setButtonData, dropdownItems, setDropdownItems, viewMode, internalId } = props;
    const taxChargeDesc = taxCharges?.find((e) => e?.taxType === props?.chargeType)?.taxDescription;

    const answerEdit = (props) => {
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

    const answerSave = () => {
        let newFormData = editForm?.getFieldsValue();

        const upd_obj = answerData?.map((obj) => {
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

    const answerDelete = (val) => {
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

    const answerCancel = () => {
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
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.buttonsGroupRight}>
                    {viewMode === false ? (
                        <>
                            {!formEdit && (
                                <>
                                    <Button
                                        type="link"
                                        icon={<FiEdit />}
                                        onClick={() => {
                                            answerEdit(props);
                                        }}
                                    />
                                    <Button onClick={() => answerDelete(props)} type="link" icon={<FiTrash />} disabled={props?.id ? true : false} />
                                </>
                            )}
                            {formEdit && props?.internalId === uniqueCardEdit && (
                                <>
                                    <Button type="link" onClick={answerSave}>
                                        Save
                                    </Button>
                                    <Button type="link" onClick={answerCancel}>
                                        Cancel
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
                    <AnswerForm {...FormProductAttributeProp} />
                </>
            )}
        </Card>
    );
};

export default AnswerCard;
