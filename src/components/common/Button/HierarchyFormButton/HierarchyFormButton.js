/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from 'components/common/Common.module.css';

export const HierarchyFormButton = ({ buttonData, handleButtonClick }) => {
    return (
        <>
            <div className={styles.formFooter}>
                <Row gutter={20}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6} className={styles.footerBtnLeft}>
                        {buttonData?.editBtn && (
                            <Button
                                danger
                                onClick={() => {
                                    handleButtonClick(FROM_ACTION_TYPE.EDIT);
                                }}
                            >
                                Edit
                            </Button>
                        )}
                    </Col>

                    <Col xs={24} sm={18} md={18} lg={18} xl={18} className={styles.footerBtnRight}>
                        {buttonData?.childBtn && (
                            <Button type="primary" onClick={() => handleButtonClick(FROM_ACTION_TYPE.CHILD)}>
                                Add Child
                            </Button>
                        )}

                        {buttonData?.siblingBtn && (
                            <Button type="primary" onClick={() => handleButtonClick(FROM_ACTION_TYPE.SIBLING)}>
                                Add Sibling
                            </Button>
                        )}

                        {buttonData?.save && (
                            <Button type="primary" onClick={() => handleButtonClick(FROM_ACTION_TYPE.SIBLING)}>
                                Save
                            </Button>
                        )}
                    </Col>
                </Row>
            </div>
        </>
    );
};
