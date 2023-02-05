import React from 'react';
import { Row, Col, Space, Button } from 'antd';
import { FaHeart, FaHistory, FaLongArrowAltLeft, FaRegHeart } from 'react-icons/fa';

import styles from './PageHeader.module.css';
import { addToolTip } from 'utils/customMenuLink';

export const PageHeader = ({ pageTitle, isFavourite, handleFavouriteClick, handleBack, visibleChangeHistory = true, handleChangeHistoryClick = undefined, isChangeHistoryVisible = false }) => {
    return (
        <>
            <Row gutter={20}>
                <Col xs={16} sm={24} md={12} lg={18} xl={18} xxl={18} className={styles.padRight0}>
                    <Space>
                        <div>
                            <span className={styles.headingGradient}>{pageTitle}</span>
                        </div>
                        <div className={styles.favIconHeading}>{isFavourite ? addToolTip('Mark as unfavourite')(<FaHeart color="#ff3e5b" size={18} onClick={handleFavouriteClick} />) : addToolTip('Mark as favourite')(<FaRegHeart size={18} onClick={handleFavouriteClick} />)}</div>
                    </Space>
                </Col>
                <Col xs={8} sm={24} md={12} lg={6} xl={6} xxl={6} className={styles.padRight0}>
                    <div className={styles.buttonContainer}>
                        {visibleChangeHistory &&
                            (isChangeHistoryVisible ? (
                                <Button type="primary" onClick={handleChangeHistoryClick}>
                                    <FaHistory className={styles.buttonIcon} />
                                    Change History
                                </Button>
                            ) : (
                                <Button danger onClick={handleChangeHistoryClick}>
                                    <FaHistory className={styles.buttonIcon} />
                                    Change History
                                </Button>
                            ))}

                        <Button danger onClick={handleBack}>
                            <FaLongArrowAltLeft className={styles.buttonIcon} />
                            Exit
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={24} xl={24} xxl={24}>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
        </>
    );
};
