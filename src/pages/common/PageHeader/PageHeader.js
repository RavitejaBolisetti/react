import React from 'react';
import { Row, Col, Space, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { FaHeart, FaHistory, FaLongArrowAltLeft, FaRegHeart } from 'react-icons/fa';

import { addToolTip } from 'utils/customMenuLink';
import { ROUTING_DASHBOARD } from 'constants/routing';
import styles from './PageHeader.module.css';

const { confirm } = Modal;

export const PageHeader = ({ pageTitle, isFavourite, handleFavouriteClick, visibleChangeHistory = true, handleChangeHistoryClick = undefined, isChangeHistoryVisible = false }) => {
    const navigate = useNavigate();
    const handleBack = () => {
        confirm({
            title: 'Are you sure to leave this page?',
            icon: <ExclamationCircleFilled />,
            content: 'If you leave this page, All unsaved data will be lost',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            cancelType: 'danger',
            onOk() {
                navigate(-1) || navigate(ROUTING_DASHBOARD);
            },
            onCancel() {},
        });
    };

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

                        <Button danger onClick={handleBack} className="btn btn-outline srchbtn mr0 boxShdwNon">
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
