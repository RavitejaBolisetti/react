/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, Fragment, useEffect } from 'react';
import { Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import FormProductAttribute from './FormTaxAndChargeCal';

const { Text } = Typography;

const CardProductAttribute = (props) => {
    const { isVisible, finalFormdata, taxChargeCalForm, forceUpdate, productHierarchyAttributeData, showGlobalNotification, setDisabledEdit, taxChargeCalList, setTaxChargeCalList, objTaxCharge, objTaxCode, setOpenAccordian } = props;

    console.log(props, 'taxChargeCodetaxChargeCodetaxChargeCodetaxChargeCodetaxChargeCodetaxChargeCodetaxChargeCodetaxChargeCodetaxChargeCode');

    const [editForm] = Form.useForm();
    const [formEdit, setFormEdit] = useState(false);

    const taxChargeCalEdit = (props) => {
        setFormEdit(true);
        editForm.setFieldsValue({
            taxChargeTypeCode: props?.taxChargeTypeCode,
            taxChargeCode: props?.taxChargeCode,
            chargeDesc: props?.chargeDesc,
            internalId: props?.internalId,
        });

        //setFormBtnActive(true);
    };

    const taxChargeCalSave = () => {
        let newFormData = editForm?.getFieldsValue();
        //let status = editForm?.getFieldError('attributeName')?.length > 0 ? true : false;
        // if (status) {
        //     return showGlobalNotification({ notificationType: 'error', title: 'Duplicate', message: 'Can not Save having same Attribute Name', placement: 'bottomRight' });
        // }

        const upd_obj = taxChargeCalList?.map((obj) => {
            if (obj?.internalId === newFormData?.internalId) {
                obj.taxChargeTypeCode = typeof newFormData?.taxChargeTypeCode === 'object' ? newFormData?.taxChargeTypeCode?.title : newFormData?.taxChargeTypeCode;
                obj.taxChargeCode = typeof newFormData?.taxChargeCode === 'object' ? newFormData?.taxChargeCode?.title : newFormData?.taxChargeCode;
                obj.chargeDesc = newFormData?.chargeDesc;
                obj.internalId = newFormData?.internalId;
            }
            return obj;
        });

        setTaxChargeCalList([...upd_obj]);
        setFormEdit(false);
        forceUpdate();
    };

    const onAttributeDelete = (val) => {
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

    const onAttributeCancel = () => {
        setFormEdit(false);
    };

    const FormProductAttributeProp = {
        productHierarchyAttributeData,
        editForm,
        finalFormdata,
        formEdit,
        taxChargeCalList,
        taxCharge: objTaxCharge,
        taxCode: objTaxCode,
        setOpenAccordian,
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
            }}
        >
            <Row align="middle" justify="space-between">
                <Row className={styles.marB20} align="center">
                    <div>
                        <Text>{props?.taxChargeTypeCode}</Text>
                    </div>
                    <Divider type="vertical" />
                    <div>
                        <Text>{props?.taxChargeCode}</Text>
                    </div>
                </Row>

                {/* {isVisible && ( */}
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
                                <Button onClick={() => onAttributeDelete(props)} type="link" icon={<FiTrash />} disabled={props?.disabledEdit || (props?.id ? true : false)} />
                            </>
                        </div>
                    ) : (
                        <div className={styles.cardItemBtn}>
                            <Button type="link" onClick={onAttributeCancel}>
                                Cancel
                            </Button>
                            <Button type="link" onClick={taxChargeCalSave}>
                                Save
                            </Button>
                        </div>
                    )}
                </Row>
                {/* )} */}
            </Row>

            {formEdit && (
                <>
                    <Divider />
                    <FormProductAttribute {...FormProductAttributeProp} />
                </>
            )}
        </Card>
    );
};

export default CardProductAttribute;
