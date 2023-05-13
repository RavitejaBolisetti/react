import React, { useState, Fragment, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import FormProductAttribute from './FormProductAttribute';

const { Text } = Typography;

const CardProductAttribute = (props) => {
    const [productAttributeEdit, setProductAttributeEdit] = useState(false);

    const viewMode = false;

    const { isVisible } = props;

    const colLeft = viewMode ? 24 : 18;
    const colRight = viewMode ? 24 : 6;

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
                {!isVisible && (
                    <Col xs={colRight} sm={colRight} md={colRight} lg={colRight} xl={colRight} xxl={colRight}>
                        {productAttributeEdit ? (
                            <div className={styles.cardItemBtn}>
                                <>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                        <Button
                                            type="link"
                                            icon={<FiEdit />}
                                            //onClick={() => onEdit(id,status,  termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode)}
                                        />
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                        <Button
                                            //onClick={() => handleDeleteDocType({ termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode })}
                                            type="link"
                                            icon={<FiTrash />}
                                        />
                                    </Col>
                                </>
                            </div>
                        ) : (
                            <div className={styles.cardItemBtn}>
                                <Button type="link" 
                               // onClick={() => onCancel()}
                                >
                                    Cancel
                                </Button>
                                <Button type="link" 
                                //onClick={onUpdate}
                                >
                                    Save
                                </Button>
                            </div>
                        )}
                    </Col>
                )}
            </Row>

            {/* {isEditing && (
                <>
                    <Divider />
                    <ProductAttributeAddEditForm {...productActionFormsProps} />
                </>
            )} */}
        </Card>
    );
};

export default CardProductAttribute;
