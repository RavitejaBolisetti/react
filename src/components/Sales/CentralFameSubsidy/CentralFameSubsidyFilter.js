/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Form } from 'antd';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PlusOutlined } from '@ant-design/icons';
import ModelVariantDropDown from './ModelVariantDropDown';

export const CentralFameSubsidyFilter = (props) => {
    const { modelVariantForm, handleButtonClick } = props;
    return (
        <div className={styles.contentHeaderBackground}>
            <Form form={modelVariantForm}>
                <Row gutter={20}>
                    <ModelVariantDropDown variantStyle={{ style: { marginBottom: '0px' } }} modelStyle={{ style: { marginBottom: '0px' } }} colSize={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 }} {...props} modelGroupLabel="" variantLabel="" modelGroupRules={[]} variantRules={[]} />
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button icon={<PlusOutlined />} data-testid="add" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.ADD, record: {} })} type="primary" className={styles.floatRight}>
                            {translateContent('global.buttons.add')}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
