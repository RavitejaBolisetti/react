/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col } from 'antd';
import styles from 'components/common/Common.module.css';
import { TfiReload } from 'react-icons/tfi';
import { PlusOutlined } from '@ant-design/icons';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';

const ContentHeader = (props) => {
    const { isProductHierarchyDataLoading, Form, onFinishFailed, onFinish, handleAdd, titleHierarchy, VehicleModelTaxChargesCategoryData, ModelOptions, handleReferesh, handleChange } = props;
    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    <Form autoComplete="off" colon={false} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item label={`${titleHierarchy}`} name="code">
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                    {customSelectBox({ data: ModelOptions, placeholder: preparePlaceholderSelect('Model Group'), fieldNames: { key: 'id', value: 'value' }, onChange: handleChange, loading: isProductHierarchyDataLoading })}
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
                {VehicleModelTaxChargesCategoryData?.length > 0 && (
                    <Col className={styles.buttonsGroupRight} xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Button icon={<TfiReload />} onClick={handleReferesh} danger />
                        <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
                            Add
                        </Button>
                    </Col>
                )}
            </Row>
        </div>
    );
};
export default ContentHeader;
