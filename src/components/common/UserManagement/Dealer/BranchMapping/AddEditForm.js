/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Row, Card, Divider, Empty, Checkbox, Typography } from 'antd';
import { LANGUAGE_EN } from 'language/en';

import styles from 'assets/sass/app.module.scss';

import { CardSkeleton } from 'components/common/Skeleton';
const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;

const { Text } = Typography;

const AddEditForm = (props) => {
    const { section, dealerBranches, setDealerBranches, setButtonData, formActionType, isUsrDlrBrLocationLoding, isDlrBrLocationLoding } = props;
    useEffect(() => {
        if (!dealerBranches?.filter((el) => el?.id || el?.status)?.length) {
            setButtonData((prev) => ({ ...prev, nextBtn: true, saveBtn: !formActionType.viewMode, formBtnActive: false }));
        } else setButtonData((prev) => ({ ...prev, nextBtn: false, saveBtn: !formActionType.viewMode, formBtnActive: true }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dealerBranches]);
    const onChanges = (values, checkedValues, index) => {
        if (formActionType?.viewMode) return;

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

    const formSkeleton = (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <CardSkeleton />
            </Col>
        </Row>
    );

    return (
        <div>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title}</h2>
                    {isUsrDlrBrLocationLoding || isDlrBrLocationLoding ? (
                        formSkeleton
                    ) : (
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
                                                <Row key={el?.locationCode} gutter={20} className={styles.marB10}>
                                                    <Col xs={14} sm={14} md={14} lg={14} xl={14} xxl={14}>
                                                        {el?.locationName}
                                                    </Col>
                                                    <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                        <Checkbox.Group onChange={(checkedValues) => onChanges(el, checkedValues, i)} value={[el?.status && 'status', el?.defaultBranchIndicator && 'defaultBranchIndicator']} defaultValue={[el?.status && 'status', el?.defaultBranchIndicator && 'defaultBranchIndicator']}>
                                                            <Row gutter={20} justify="space-between">
                                                                <Checkbox value={'status'} className={styles.marR20} defaultChecked={el?.status} checked={el?.status}>
                                                                    Accessible
                                                                </Checkbox>
                                                                <Checkbox value={'defaultBranchIndicator'} defaultChecked={el?.defaultBranchIndicator} checked={el?.defaultBranchIndicator} disabled={!el?.status}>
                                                                    Default
                                                                </Checkbox>
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
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default AddEditForm;
