import React, { useState, Fragment, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import FormProductAttribute from './FormProductAttribute';

const { Text } = Typography;

const CardProductAttribute = (props) => {
    const [productAttributeEdit, setProductAttributeEdit] = useState(false);
    const { isVisible, finalFormdata, setFinalFormdata, attributeForm, forceUpdate, setFormDecider, formDecider, view, setSKUAttributes, productHierarchyAttributeData, setFormBtnActive, showGlobalNotification } = props;
    const [editedAttributeValue, setEditedAttributeValue] = useState(null);
    const [editForm] = Form.useForm();

    const onAttributeEdit = (props) => {
        setEditedAttributeValue({ attributeName: props?.attributeName, attributeValue: props?.attributeValue, fromApi: props?.fromApi, adPhProductAttributeMstId: props?.adPhProductAttributeMstId, id: props?.id });
        setFormDecider(true);
        setFormBtnActive(true);
    };

    let formatData = [];

    const onAttributeSave = (val) => {
        setFormDecider(false);
        const newFormData = editForm?.getFieldsValue();

        let status = editForm?.getFieldError('attributeName').length > 0 ? true : false;
        if (status) {
            return showGlobalNotification({ notificationType: 'error', title: 'Duplicate', message: 'Can not Save having same Attribute Name', placement: 'bottomRight' });
        }

        setFinalFormdata((prev) => {
            const updatedValue = prev;
            const indx = prev.findIndex((el) => el.attributeName?.key === val?.attributeId && el.attributeValue === val?.attributeValue);
            const formatData = {
                attributeName: { label: typeof newFormData?.attributeName === 'object' ? newFormData?.attributeName?.label : newFormData?.attributeName },
                attributeValue: newFormData?.attributeValue,
                fromApi: newFormData?.fromApi,
                id: props?.id,
                adPhProductAttributeMstId: props?.adPhProductAttributeMstId,
            };
            updatedValue?.splice(indx, 1, { ...formatData });
            return updatedValue;
        });

        setSKUAttributes(formatData);
        setProductAttributeEdit(false);
        forceUpdate();
    };

    const onAttributeDelete = (val) => {
        setFinalFormdata((prev) => {
            const indx = prev.findIndex((el) => el.attributeName?.key === val?.attributeId && el.attributeValue === val?.attributeValue);
            let updatedValue = prev;
            updatedValue?.splice(indx, 1);
            return updatedValue;
        });

        setSKUAttributes(formatData);
        attributeForm.resetFields();
        setProductAttributeEdit(false);
        forceUpdate();
    };

    const onAttributeCancel = () => {
        setFormDecider(false);
        setProductAttributeEdit(false);
    };

    useEffect(() => {
        return () => {
            setProductAttributeEdit(false);
            !view && setFormDecider(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setFormDecider, view]);

    const colLeft = !isVisible ? 24 : 18;
    const colRight = !isVisible ? 24 : 6;

    const FormProductAttributeProp = {
        productHierarchyAttributeData,
        editForm,
        formDecider,
        finalFormdata,
    };

    return (
        <Card
            style={{
                backgroundColor: '#BEBEBE1A',
                marginTop: '12px',
            }}
        >
            <Row align="middle">
                <Col xs={colLeft} sm={colLeft} md={colLeft} lg={colLeft} xl={colLeft} xxl={colLeft}>
                    <div>
                        <Text strong>{props.attributeName}</Text>
                    </div>
                    <div>
                        <Text type="secondary">{props.attributeValue}</Text>
                    </div>
                </Col>

                {isVisible && (
                    <Col xs={colRight} sm={colRight} md={colRight} lg={colRight} xl={colRight} xxl={colRight}>
                        {!productAttributeEdit ? (
                            <div className={styles.cardItemBtn}>
                                <>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} style={{ margin: '0 8px 0 0' }}>
                                        <Button
                                            type="link"
                                            icon={<FiEdit />}
                                            onClick={() => {
                                                onAttributeEdit(props);
                                                setProductAttributeEdit(true);
                                            }}
                                        />
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                        <Button onClick={() => onAttributeDelete(props)} type="link" icon={<FiTrash />} disabled={props.fromApi} />
                                    </Col>
                                </>
                            </div>
                        ) : (
                            <div className={styles.cardItemBtn}>
                                <Button type="link" onClick={onAttributeCancel}>
                                    Cancel
                                </Button>
                                <Button type="link" onClick={onAttributeSave}>
                                    Save
                                </Button>
                            </div>
                        )}
                    </Col>
                )}
            </Row>

            {productAttributeEdit && (
                <>
                    <Divider />
                    <FormProductAttribute {...editedAttributeValue} {...FormProductAttributeProp} />
                </>
            )}
        </Card>
    );
};

export default CardProductAttribute;
