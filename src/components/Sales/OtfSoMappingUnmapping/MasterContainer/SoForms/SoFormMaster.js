/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useMemo } from 'react';
import { Card, Row, Col, Space, Typography, Button, Form, Select } from 'antd';
import styles from 'assets/sass/app.module.scss';
import SoStyles from 'assets/sass/Somapping.module.scss';
import { AddEditForm } from './AddEditForm';
import { PARAM_MASTER } from 'constants/paramMaster';
import { validateRequiredSelectField } from 'utils/validation';
import { FORM_TYPE_CONSTANSTS, OTF_SO_MAPPING_UNMAPPING_CONSTANTS, CARD_TITLE_CONSTANT, HEADER_CONSTANTS } from 'components/Sales/OtfSoMappingUnmapping/Constants';
import { translateContent } from 'utils/translateContent';

const { Text } = Typography;

const SoFormMasterMain = (props) => {
    const { selectedKey, isReadOnly = true, status, SoForm, handleFormChange, onFinish, handleCancel, typeData, DealerParentData, handleDealerParent, LocationData, handleClear } = props;
    const { isLocationLoading = false, loginUserData } = props;
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
                        colon={false}
                        layout="horizontal"
                    >
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Card className={`${styles.fullWidth} ${styles.whiteBG}`}>
                                    <Row gutter={20}>
                                        <Col span={11}>
                                            <Form.Item label={translateContent('bookingSoMappUnmapp.label.dealerParent')} name="parentGroupCode" rules={[validateRequiredSelectField(translateContent('bookingSoMappUnmapp.label.dealerParent'))]}>
                                                <Select disabled={loginUserData?.userType === HEADER_CONSTANTS?.DLR?.key} options={DealerParentData} placeholder={translateContent('global.placeholder.select')} fieldNames={{ label: 'value', value: 'key' }} allowClear showSearch optionFilterProp="value" onChange={handleDealerParent} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={11} offset={2}>
                                            <Form.Item label={translateContent('bookingSoMappUnmapp.label.dealerLocation')} name="locationCode" rules={[validateRequiredSelectField(translateContent('bookingSoMappUnmapp.label.dealerLocation'))]}>
                                                <Select loading={isLocationLoading} options={LocationData} fieldNames={{ label: 'dealerLocationName', value: 'locationCode' }} placeholder={translateContent('global.placeholder.select')} allowClear showSearch optionFilterProp="dealerLocationName" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Space direction="vertical" size="small" className={SoStyles.otfMappingContaner}>
                                                <Text className={SoStyles.headerBg}> {handleTitle?.title1} </Text>
                                                <Card className={SoStyles.fullHeight}>
                                                    <AddEditForm {...props} disabledProps={disabledProps} formType={FORM_TYPE_CONSTANSTS?.FORM_1?.id} status={status} />
                                                </Card>
                                            </Space>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Space direction="vertical" size="small" className={SoStyles.otfMappingContaner}>
                                                <Text className={SoStyles.headerBg}> {handleTitle?.title2} </Text>
                                                <Card className={SoStyles.fullHeight}>
                                                    <AddEditForm {...props} disabledProps={disabledProps} formType={FORM_TYPE_CONSTANSTS?.FORM_2?.id} status={status} />
                                                </Card>
                                            </Space>
                                        </Col>
                                    </Row>
                                    <Row gutter={20} className={SoStyles.descriptionSection}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={translateContent('bookingSoMappUnmapp.label.resonCategoryCode')} name="resonCategoryCode" rules={[validateRequiredSelectField(translateContent('bookingSoMappUnmapp.label.resonCategoryCode'))]}>
                                                <Select options={typeData[PARAM_MASTER?.SO_RC?.id]} fieldNames={{ label: 'value', value: 'key' }} placeholder={translateContent('global.placeholder.select')} allowClear showSearch optionFilterProp="value" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item label={translateContent('bookingSoMappUnmapp.label.reasonDescriptionCode')} name="reasonDescriptionCode" rules={[validateRequiredSelectField(translateContent('bookingSoMappUnmapp.label.reasonDescriptionCode'))]}>
                                                <Select options={typeData[PARAM_MASTER?.SO_RD?.id]} fieldNames={{ label: 'value', value: 'key' }} placeholder={translateContent('global.placeholder.select')} allowClear showSearch optionFilterProp="value" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20} className={styles.marB20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonsGroupRight}>
                                            <Button onClick={handleCancel}>{translateContent('global.buttons.cancel')}</Button>
                                            <Button onClick={handleClear}>{translateContent('global.buttons.clear')}</Button>
                                            <Button htmlType="submit" type="primary">
                                                {translateContent('global.buttons.submit')}
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
