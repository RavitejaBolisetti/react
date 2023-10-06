/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useMemo } from 'react';
import { Card, Row, Col, Space, Divider, Typography, Button, Form, Select } from 'antd';
import styles from 'assets/sass/app.module.scss';
//import SoStyles from 'components/Sales/OtfSoMappingUnmapping/Somapping.module.css';
import SoStyles from 'components/Sales/OtfSoMappingUnmapping/Somapping.module.scss';
import { AddEditForm } from './AddEditForm';
import { PARAM_MASTER } from 'constants/paramMaster';
import { validateRequiredSelectField } from 'utils/validation';
import { FORM_TYPE_CONSTANSTS, OTF_SO_MAPPING_UNMAPPING_CONSTANTS, CARD_TITLE_CONSTANT } from 'components/Sales/OtfSoMappingUnmapping/Constants';

const { Text } = Typography;

const SoFormMasterMain = (props) => {
    const { selectedKey, isReadOnly = true, status, SoForm, handleFormChange, onFinish, onFinishFailed, handleCancel, typeData, DealerParentData, handleDealerParent, LocationData, handleClear } = props;
    const { isLocationLoading = false } = props;
    const disabledProps = { disabled: isReadOnly };
    const handleTitle = useMemo(() => {
        switch (selectedKey) {
            case OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.RESERVE_QUOTA?.key: {
                return { title1: CARD_TITLE_CONSTANT?.SO?.key, title2: CARD_TITLE_CONSTANT?.OTF?.key };
            }
            default: {
                return { title1: CARD_TITLE_CONSTANT?.OTF_1?.key, title2: CARD_TITLE_CONSTANT?.OTF_2?.key };
            }
        }
    }, [selectedKey]);

    return (
        <>
            {selectedKey && (
                <>
                    <Form
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            offset: 1,
                            span: 12,
                        }}
                        autoComplete="off"
                        form={SoForm}
                        onFieldsChange={handleFormChange}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        colon={false}
                        layout="horizontal"
                    >
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Card className={`${styles.fullWidth} ${styles.whiteBG}`}>
                                    <Row gutter={20}>
                                        <Col span={11}>
                                            <Form.Item label="Dealer Parent" name="parentGroupCode" rules={[validateRequiredSelectField('dealer parent')]}>
                                                <Select options={DealerParentData} placeholder="Select" fieldNames={{ label: 'value', value: 'key' }} allowClear showSearch optionFilterProp="value" onChange={handleDealerParent} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={11} offset={2}>
                                            <Form.Item label="Dealer Location" name="locationCode" rules={[validateRequiredSelectField('dealer location')]}>
                                                <Select loading={isLocationLoading} options={LocationData} fieldNames={{ label: 'dealerLocationName', value: 'locationCode' }} placeholder="Select" allowClear showSearch optionFilterProp="dealerLocationName" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={11} sm={11} md={11} lg={11} xl={11} xxl={11}>
                                            <Space direction="vertical" size="small" className={SoStyles.flex}>
                                                <Text className={SoStyles.headerBg}> {handleTitle?.title1} </Text>
                                                <Card className={`${styles.fullWidth} ${styles.whiteBG} ${SoStyles.fullHeight}`}>
                                                    <AddEditForm {...props} disabledProps={disabledProps} formType={FORM_TYPE_CONSTANSTS?.FORM_1?.id} status={status} />
                                                </Card>
                                            </Space>
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} className={styles.textCenter}>
                                            <Divider type="vertical" />
                                        </Col>
                                        <Col xs={11} sm={11} md={11} lg={11} xl={11} xxl={11}>
                                            <Space direction="vertical" size="small" className={SoStyles.flex}>
                                                <Text className={SoStyles.headerBg}> {handleTitle?.title2} </Text>
                                                <Card className={`${styles.fullWidth} ${styles.whiteBG} ${SoStyles.fullHeight}`}>
                                                    <AddEditForm {...props} disabledProps={disabledProps} formType={FORM_TYPE_CONSTANSTS?.FORM_2?.id} status={status} />
                                                </Card>
                                            </Space>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={10} offset={8}>
                                            <Form.Item label="Reason Category" name="resonCategoryCode" rules={[validateRequiredSelectField('reason category')]}>
                                                <Select options={typeData[PARAM_MASTER?.SO_RC?.id]} fieldNames={{ label: 'value', value: 'key' }} placeholder="Select" allowClear showSearch optionFilterProp="value" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={10} offset={8}>
                                            <Form.Item label="Reason Description" name="reasonDescriptionCode" rules={[validateRequiredSelectField('reason description')]}>
                                                <Select options={typeData[PARAM_MASTER?.SO_RD?.id]} fieldNames={{ label: 'value', value: 'key' }} placeholder="Select" allowClear showSearch optionFilterProp="value" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20} className={styles.marB20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonsGroupRight}>
                                            <Button onClick={handleCancel}>Cancel</Button>
                                            <Button onClick={handleClear}>Clear</Button>
                                            <Button htmlType="submit" type="primary">
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </>
            )}
        </>
    );
};
export const SoFormMaster = SoFormMasterMain;
