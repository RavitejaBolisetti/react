/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect } from 'react';
import { Col, Input, Form, Row } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { translateContent } from 'utils/translateContent';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { formData, revisedModelInformation } = props;
    const { form } = props;

    useEffect(() => {
        if (formData?.revisedModel) {
            form.setFieldsValue({ revisedModelDescription: formData?.revisedModelDescription, revisedOemModelCode: formData?.revisedOemModelCode });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <div className={styles.cardInnerBox}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                    <Form.Item label={translateContent('bookingManagement.modelVariant.label.model')} name="revisedModelDescription" rules={[validateRequiredSelectField(translateContent('bookingManagement.modelVariant.validation.model'))]}>
                        {customSelectBox({ data: [], disabled: true })}
                    </Form.Item>
                    {revisedModelInformation && <div className={styles.modelTooltip}>{addToolTip(revisedModelInformation, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                </Col>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <Form.Item label={translateContent('bookingManagement.modelVariant.label.oemModelCode')} name="revisedOemModelCode" rules={[validateRequiredInputField(translateContent('bookingManagement.modelVariant.validation.oemModelCode'))]}>
                        <Input disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );
};

export const AddEditForm = AddEditFormMain;
