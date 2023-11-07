/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const HierarchyFormButton = ({ buttonData, handleButtonClick }) => {
    return (
        <>
            <div className={styles.formFooter}>
                <Row gutter={20}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6} className={styles.buttonsGroupLeft}>
                        {buttonData?.editBtn && (
                            <Button
                                danger
                                onClick={() => {
                                    handleButtonClick(FROM_ACTION_TYPE.EDIT);
                                }}
                            >
                                {translateContent('global.buttons.edit')}
                            </Button>
                        )}
                    </Col>

                    <Col xs={24} sm={18} md={18} lg={18} xl={18} className={styles.buttonsGroupRight}>
                        {buttonData?.childBtn && (
                            <Button type="primary" onClick={() => handleButtonClick(FROM_ACTION_TYPE.CHILD)}>
                                {translateContent('global.buttons.addChild')}
                            </Button>
                        )}

                        {buttonData?.siblingBtn && (
                            <Button type="primary" onClick={() => handleButtonClick(FROM_ACTION_TYPE.SIBLING)}>
                                {translateContent('global.buttons.addSibling')}
                            </Button>
                        )}

                        {buttonData?.save && (
                            <Button type="primary" onClick={() => handleButtonClick(FROM_ACTION_TYPE.SIBLING)}>
                                {translateContent('global.buttons.save')}
                            </Button>
                        )}
                    </Col>
                </Row>
            </div>
        </>
    );
};
