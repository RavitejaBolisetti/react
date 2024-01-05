/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Form, Select } from 'antd';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PlusOutlined } from '@ant-design/icons';
import { SELECT_BOX_NAME_CONSTANTS } from './fameSubsidryConstants';
import ModelVariantDropDown from './ModelVariantDropDown';

export const CentralFameSubsidyFilter = (props) => {
    const { modelData, modelVariantForm, variantData, handleButtonClick, handleModelVariantSelect, isVariantLoading, isModelLoading, isVariantAndModelPresent } = props;

    return (
        <div className={styles.contentHeaderBackground}>
            <Form form={modelVariantForm}>
                <Row gutter={20}>
                    {/* <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item style={{ marginBottom: '0px' }} name="modelGroupCode">
                            {customSelectBox({ data: modelData, loading: isModelLoading, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.exchangeDetails.modelGroup')), onChange: (value) => handleModelVariantSelect(SELECT_BOX_NAME_CONSTANTS?.MODEL?.key)(value)(false), fieldNames: { key: 'modelGroupCode', value: 'modelGroupDescription' } })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item style={{ marginBottom: '0px' }} name="variantCode">
                            <Select showSearch placeholder={preparePlaceholderSelect(translateContent('commonModules.label.exchangeDetails.variant'))} filterOption={(input, option) => (option?.variantCode?.trim()?.toLowerCase() ?? '').includes(input?.trim()?.toLowerCase()) || (option?.variantDescription?.trim()?.toLowerCase() ?? '').includes(input?.trim()?.toLowerCase())} onChange={(value) => handleModelVariantSelect(SELECT_BOX_NAME_CONSTANTS?.VARIANT?.key)(value)(false)} options={variantData} loading={isVariantLoading} fieldNames={{ label: 'variantDescription', value: 'variantCode' }} />
                        </Form.Item>
                    </Col> */}
                    <ModelVariantDropDown variantStyle={{ style: { marginBottom: '0px' } }} modelStyle={{ style: { marginBottom: '0px' } }} colSize={{ xs: 8, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 }} {...props} modelGroupLabel="" variantLabel="" modelGroupRules={[]} variantRules={[]} />
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
