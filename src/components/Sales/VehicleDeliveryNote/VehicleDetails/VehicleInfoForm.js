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

const VehicleInfoForm = (props) => {
    const { formData, toolTipContent } = props;
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.vinNumber} label="VIN No." name="vinNumber">
                        <Input placeholder={preparePlaceholderText('VIN No.')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.engineNumber} label="Engine Number" name="engineNumber">
                        <Input placeholder={preparePlaceholderText('Engine Number')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.keyNumber} label="Key Number" name="keyNumber">
                        <Input placeholder={preparePlaceholderText('Key Number')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.modelCode} label="Model Code" name="modelCode">
                        <Input placeholder={preparePlaceholderText('Model Code')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.modelDescription} label="Model Description" name="modelDescription">
                        <Input placeholder={preparePlaceholderText('Modal Description')} disabled={true} />
                    </Form.Item>
                    {toolTipContent && <div className={styles.modelTooltip}>{addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                </Col>
            </Row>
        </>
    );
};

export default VehicleInfoForm;
