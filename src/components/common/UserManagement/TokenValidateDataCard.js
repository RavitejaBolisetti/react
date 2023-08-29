/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Col, Row, Space } from 'antd';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { PlusOutlined } from '@ant-design/icons';
import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';

const TokenValidateDataCard = ({ tokenData, selectedDealer, handleButtonClick, userType }) => {
    return (
        <div className={styles.dataDisplay}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                    <Space size="large">
                        {userType === USER_TYPE_USER?.DEALER?.id ? (
                            <>
                                <Space size="large">
                                    <div>
                                        <div className={styles.contentHeading}>Employee Code</div>
                                        <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{tokenData?.employeeCode || tokenData?.tokenNumber}</div>
                                    </div>
                                    <div>
                                        <div className={styles.contentHeading}>Dealer Name</div>
                                        <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{tokenData?.dealerName}</div>
                                    </div>
                                    <div>
                                        <div className={styles.contentHeading}>User Name</div>
                                        <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{tokenData?.userName}</div>
                                    </div>
                                </Space>
                            </>
                        ) : (
                            <>
                                <Space size="large">
                                    <div>
                                        <div className={styles.contentHeading}>User Name</div>
                                        <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{tokenData?.userName}</div>
                                    </div>
                                    <div>
                                        <div className={styles.contentHeading}>Token No</div>
                                        <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{tokenData?.userName}</div>
                                    </div>
                                </Space>
                            </>
                        )}
                        <div>
                            <div className={styles.contentHeading}>Designation</div>
                            <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{tokenData?.designation}</div>
                        </div>
                        <div>
                            <div className={styles.contentHeading}>Mobile Number</div>
                            <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{tokenData?.employeeMobileNumber}</div>
                        </div>
                        <div>
                            <div className={styles.contentHeading}>Email ID</div>
                            <div className={`${styles.contentData} ${styles.txtEllipsis}`}>{tokenData?.employeeEmail}</div>
                        </div>
                    </Space>
                </Col>
                <Col xs={24} sm={24} md={4} lg={4} xl={4} className={`${styles.verticallyCentered} ${styles.addGroup}`}>
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD, record: tokenData })}>
                        Manage Access
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default TokenValidateDataCard;
