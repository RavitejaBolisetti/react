/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';

import { Row, Col, Form, Input } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const VehicleInfoForm = (props) => {
    const { formData, toolTipContent } = props;
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.vinNumber} label={translateContent('vehicleDeliveryNote.vehicleDetails.label.vinNumber')} name="vinNumber">
                        <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.vehicleDetails.label.vinNumber'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.engineNumber} label={translateContent('vehicleDeliveryNote.vehicleDetails.label.engineNumber')} name="engineNumber">
                        <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.vehicleDetails.label.engineNumber'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.keyNumber} label={translateContent('vehicleDeliveryNote.vehicleDetails.label.keyNumber')} name="keyNumber">
                        <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.vehicleDetails.label.keyNumber'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.oemModelCode} label={translateContent('vehicleDeliveryNote.vehicleDetails.label.modelCode')} name="oemModelCode">
                        <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.vehicleDetails.label.modelCode'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <Form.Item initialValue={formData?.modelDescription} label={translateContent('vehicleDeliveryNote.vehicleDetails.label.modelDescription')} name="modelDescription">
                        <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.vehicleDetails.label.modelDescription'))} disabled={true} />
                    </Form.Item>
                    {toolTipContent && <div className={styles.modelTooltip}>{addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                </Col>
                <Form.Item initialValue={formData?.modelCode} name="modelCode" hidden />
            </Row>
        </>
    );
};

export default VehicleInfoForm;
