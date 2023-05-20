import React, { useState, Fragment, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import FormProductAttribute from './FormProductAttribute';

const { Text } = Typography;

const CardProductAttribute = (props) => {
    const [productAttributeEdit, setProductAttributeEdit] = useState(false);
    const { isVisible, finalFormdata, setFinalFormdata, attributeForm, forceUpdate, setFormDecider, formDecider, view, setSKUAttributes,setFormBtnActive } = props;
    const [editedAAttributeValue, setEditedAttributeValue] = useState(null);
    const [editForm] = Form.useForm();

    const onAttributeEdit = (props) => {
        setEditedAttributeValue({ attributeName: props.attributeName, attributeValue: props.attributeValue });
        setFormBtnActive(true);
    };

    const onAttributeSave = (val) => {
        setFormDecider(true);
        const newFormData = editForm.getFieldsValue();

        setFinalFormdata((prev) => {
            const updatedValue = prev;
            const indx = prev.findIndex((el) => el.attributeName?.key === val?.attributeId && el.attributeValue === val?.attributeValue);
            const formatData = {
                attributeName: { label: newFormData?.attributeName },
                attributeValue: newFormData?.attributeValue,
            };
            updatedValue?.splice(indx, 1, { ...formatData });
            return updatedValue;
        });

        const formatData = [];
        finalFormdata.map((item) => formatData.push({ code: item?.attributeName?.label, value: item?.attributeValue, adPhProductAttributeMstId: item?.attributeName?.key }));
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

        const formatData = [];
        finalFormdata.map((item) => formatData.push({ code: item?.attributeName?.label, value: item?.attributeValue, adPhProductAttributeMstId: item?.attributeName?.key }));
        setSKUAttributes(formatData);

        attributeForm.resetFields();
        forceUpdate();
    };

    const onAttributeCancel = () => {
        setProductAttributeEdit(false);
    };

    useEffect(() => {
        return () => {
            setProductAttributeEdit(false);
            {
                !view && setFormDecider(true);
            }
        };
    }, []);

    const colLeft = !isVisible ? 24 : 18;
    const colRight = !isVisible ? 24 : 6;

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
                                        <Button onClick={() => onAttributeDelete(props)} type="link" icon={<FiTrash />} />
                                    </Col>
                                </>
                            </div>
                        ) : (
                            <div className={styles.cardItemBtn}>
                                <Button type="link" onClick={onAttributeCancel}>
                                    Cancel
                                </Button>
                                <Button type="link" onClick={() => onAttributeSave(props)}>
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
                    <FormProductAttribute {...editedAAttributeValue} editForm={editForm} formDecider={formDecider} />
                </>
            )}
        </Card>
    );
};

export default CardProductAttribute;
