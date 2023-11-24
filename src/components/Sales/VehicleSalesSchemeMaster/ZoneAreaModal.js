/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Button, Select } from 'antd';
import { withModal } from 'components/withModal';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;

export const ZoneAreaModalForm = (props) => {
    const { onCloseAction, formData, zoneMasterData, areaOfficeData, addZoneAreaForm, onFinishAddZoneDetails, handleZoneChange } = props;

    return (
        <Form autoComplete="off" layout="vertical" form={addZoneAreaForm} onFinish={onFinishAddZoneDetails}>
            <Row gutter={24}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('vehicleSalesSchemeMaster.label.zone')} name="zone" initialValue={formData?.zone}>
                        <Select placeholder={translateContent('global.placeholder.select')} onChange={handleZoneChange} allowClear>
                            {zoneMasterData?.map((item) => (
                                <Option value={item?.zoneCode}>{item?.zoneDescription}</Option>
                            ))}
                        </Select>
                        {/* {customSelectBox({ data: zoneMasterData, placeholder: preparePlaceholderSelect(translateContent('orderDeliveryVehicleAllotment.label.vehicleStatus')) })} */}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('vehicleSalesSchemeMaster.label.area')} name="area" initialValue={formData?.area}>
                        <Select placeholder={translateContent('global.placeholder.select')} allowClear>
                            {areaOfficeData?.map((item) => (
                                <Option value={item?.areaCode}>{item?.areaDescription}</Option>
                            ))}
                        </Select>
                        {/* {customSelectBox({ placeholder: preparePlaceholderSelect(translateContent('orderDeliveryVehicleAllotment.label.vehicleStatus')) })} */}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={onCloseAction} danger>
                        {translateContent('global.buttons.cancel')}
                    </Button>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        {translateContent('global.buttons.submit')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const ZoneAreaModal = withModal(ZoneAreaModalForm, { width: 500 });
