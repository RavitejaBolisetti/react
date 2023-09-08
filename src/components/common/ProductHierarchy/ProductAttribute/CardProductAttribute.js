/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, Fragment, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'assets/sass/app.module.scss';

import FormProductAttribute from './FormProductAttribute';

const { Text } = Typography;

const CardProductAttribute = (props) => {
    const { isVisible, finalFormdata, attributeForm, forceUpdate, skuAttributes, setSKUAttributes, productHierarchyAttributeData, setFormBtnActive, showGlobalNotification, setDisabledEdit } = props;
    const [editForm] = Form.useForm();
    const [formEdit, setFormEdit] = useState(false);

    const onAttributeEdit = (props) => {
        editForm.setFieldsValue({
            attributeName: props?.code,
            value: props?.value,
            id: props?.id,
            attributeId: props?.attributeId,
        });
        setFormEdit(true);
        setFormBtnActive(true);
    };

    const onAttributeSave = () => {
        let newFormData = editForm?.getFieldsValue();
        let status = editForm?.getFieldError('attributeName')?.length > 0 ? true : false;
        if (status) {
            return showGlobalNotification({ notificationType: 'error', title: 'Duplicate', message: 'Can not Save having same Attribute Name', placement: 'bottomRight' });
        }

        const upd_obj = skuAttributes?.map((obj) => {
            if ((obj?.attributeId && obj?.attributeId === newFormData?.attributeId) || (obj?.id && obj?.id === newFormData?.id)) {
                let isObj = false;
                if (typeof newFormData?.attributeName === 'object') {
                    isObj = true;
                }
                obj.id = newFormData?.id;
                obj.code = isObj ? newFormData?.attributeName?.label : newFormData?.attributeName;
                obj.attributeId = isObj ? newFormData?.attributeName?.key : newFormData?.attributeId;
                obj.value = newFormData?.value;
            }
            return obj;
        });

        setSKUAttributes([...upd_obj]);
        setFormEdit(false);
        forceUpdate();
    };

    const onAttributeDelete = (val) => {
        setSKUAttributes((prev) => {
            const indx = prev.findIndex((el) => el.attributeId === val?.attributeId);
            let updatedValue = prev;
            updatedValue?.splice(indx, 1);
            return updatedValue;
        });

        setFormEdit(false);
        // attributeForm?.resetFields();
        forceUpdate();
    };

    const onAttributeCancel = () => {
        setFormEdit(false);
    };

    const colLeft = !isVisible ? 24 : 18;
    const colRight = !isVisible ? 24 : 6;

    const FormProductAttributeProp = {
        productHierarchyAttributeData,
        editForm,
        finalFormdata,
        formEdit,
        skuAttributes,
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
        <Card>
            <Row align="middle" className={styles.marB20}>
                <Col xs={colLeft} sm={colLeft} md={colLeft} lg={colLeft} xl={colLeft} xxl={colLeft}>
                    <div>
                        <Text data-testid="code" strong>
                            {props?.code}
                        </Text>
                    </div>
                    <div>
                        <Text type="secondary" data-testid="secondary">
                            {props?.value}
                        </Text>
                    </div>
                </Col>

                {isVisible && (
                    <Col xs={colRight} sm={colRight} md={colRight} lg={colRight} xl={colRight} xxl={colRight} className={styles.buttonsGroupRight}>
                        {!formEdit ? (
                            <>
                                <Button
                                    type="link"
                                    data-testid="edit-button"
                                    icon={<FiEdit />}
                                    onClick={() => {
                                        onAttributeEdit(props);
                                    }}
                                    disabled={props?.disabledEdit}
                                />
                                <Button data-testid="delete-button" onClick={() => onAttributeDelete(props)} type="link" icon={<FiTrash />} disabled={props?.disabledEdit || (props?.id ? true : false)} />
                            </>
                        ) : (
                            <>
                                <Button type="link" data-testid="save" onClick={onAttributeSave}>
                                    Save
                                </Button>
                                <Button type="link" data-testid="cancel" onClick={onAttributeCancel}>
                                    Cancel
                                </Button>
                            </>
                        )}
                    </Col>
                )}
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
