/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Form } from 'antd';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PlusOutlined } from '@ant-design/icons';
import { SELECT_BOX_NAME_CONSTANTS } from './fameSubsidryConstants';

export const CentralFameSubsidyFilter = (props) => {
    const { modelData, modelVariantForm, variantData, handleButtonClick, handleModelVariantSelect, isVariantLoading, isModelLoading, isVariantAndModelPresent } = props;

    return (
        <div className={styles.contentHeaderBackground}>
            <Form form={modelVariantForm}>
                <Row gutter={20}>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item style={{ marginBottom: '0px' }} name="modelGroupCode">
                            {customSelectBox({ data: modelData, loading: isModelLoading, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.exchangeDetails.modelGroup')), onChange: (value) => handleModelVariantSelect(SELECT_BOX_NAME_CONSTANTS?.MODEL?.key)(value), fieldNames: { key: 'modelGroupCode', value: 'modelGroupDescription' } })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item style={{ marginBottom: '0px' }} name="variantCode">
                            {customSelectBox({ data: variantData, loading: isVariantLoading, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.exchangeDetails.variant')), onChange: (value) => handleModelVariantSelect(SELECT_BOX_NAME_CONSTANTS?.VARIANT?.key)(value), fieldNames: { key: 'variantCode', value: 'variantDescription' } })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Button icon={<PlusOutlined />} data-testid="add" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.ADD, record: {} })} type="primary" className={styles.floatRight}>
                            {translateContent('global.buttons.add')}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
