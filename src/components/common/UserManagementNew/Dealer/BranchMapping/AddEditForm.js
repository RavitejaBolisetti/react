/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Card, Divider, Empty, Checkbox, Typography } from 'antd';
import { LANGUAGE_EN } from 'language/en';

import styles from 'components/common/Common.module.css';
const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;

const { Text } = Typography;

const AddEditForm = (props) => {
    const { section, dealerBranches, setDealerBranches, setButtonData, formActionType } = props;

    const onChanges = (values, checkedValues, index) => {
        if (formActionType?.viewMode) return;
        
        setButtonData((prev) => ({ ...prev, nextBtn: false, saveBtn: true, formBtnActive: true }));
        const isCheckedDefault = checkedValues?.includes('defaultBranchIndicator');
        const isaccessible = checkedValues?.includes('status');

        const newVal = {
            ...values,
            locationName: values?.locationName,
            status: isaccessible,
            defaultBranchIndicator: isCheckedDefault && !isaccessible ? false : isCheckedDefault,
        };
        setDealerBranches((prev) => {
            const updatedValues = isCheckedDefault ? [...prev?.map((el) => ({ ...el, defaultBranchIndicator: false }))] : [...prev.map((el) => ({ ...el }))];
            updatedValues.splice(index, 1, newVal);
            return updatedValues;
        });
    };

    return (
        <div>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title}</h2>
                    <Card>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB10}>
                                <Text strong>{section?.title}</Text>
                            </Col>
                        </Row>
                        <Divider />
                        {dealerBranches?.length ? (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB10}>
                                    {dealerBranches?.map((el, i) => {
                                        return (
                                            <Row gutter={20}>
                                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={styles.marB10}>
                                                    {el?.locationName}
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={styles.marB10}>
                                                    <Checkbox.Group onChange={(checkedValues) => onChanges(el, checkedValues, i)} value={[el?.status && 'status', el?.defaultBranchIndicator && 'defaultBranchIndicator']} defaultValue={[el?.status && 'status', el?.defaultBranchIndicator && 'defaultBranchIndicator']}>
                                                        <Row gutter={20}>
                                                            <Col span={12}>
                                                                <Checkbox value={'status'} defaultChecked={el?.status} checked={el?.status}>
                                                                    Accessible
                                                                </Checkbox>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Checkbox value={'defaultBranchIndicator'} defaultChecked={el?.defaultBranchIndicator} checked={el?.defaultBranchIndicator} disabled={!el?.status}>
                                                                    Default
                                                                </Checkbox>
                                                            </Col>
                                                        </Row>
                                                    </Checkbox.Group>
                                                </Col>
                                            </Row>
                                        );
                                    })}
                                </Col>
                            </Row>
                        ) : (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        {noDataTitle} <br />
                                    </span>
                                }
                            ></Empty>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AddEditForm;
