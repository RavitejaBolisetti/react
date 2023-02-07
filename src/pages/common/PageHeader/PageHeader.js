import React from 'react';
import { Row, Col, Space, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaHistory, FaLongArrowAltLeft, FaRegHeart } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import { ROUTING_DASHBOARD } from 'constants/routing';
import styles from './PageHeader.module.css';

const { confirm } = Modal;

export const PageHeader = ({ pageTitle, isFavourite, handleFavouriteClick, visibleSampleBtn = false, handleSample = undefined, visibleChangeHistory = true, handleChangeHistoryClick = undefined, isChangeHistoryVisible = false }) => {
    const navigate = useNavigate();
    const handleBack = () => {
        confirm({
            title: 'Alert',
            icon: <AiOutlineInfoCircle size={22} className={styles.modalIconAlert} />,
            content: 'This will take you to Homepage. If you leave this page, all unsaved data will be lost. Would you like to proceed?',
            closable: true,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            cancelType: 'danger',
            width: 350,
            onOk() {
                navigate(ROUTING_DASHBOARD);
            },
            onCancel() {},
        });
    };

    return (
        <>
            <Row gutter={20} className={styles.pageHeader}>
                <Col xs={16} sm={24} md={12} lg={18} xl={18} xxl={18}>
                    <Space>
                        <div>
                            <span className={styles.headingGradient}>{pageTitle}</span>
                        </div>
                        <div className={styles.favIconHeading}>{isFavourite ? addToolTip('Remove from favourite')(<FaHeart color="#ff3e5b" size={18} onClick={handleFavouriteClick} />) : addToolTip('Mark as favourite')(<FaRegHeart size={18} onClick={handleFavouriteClick} />)}</div>
                    </Space>
                </Col>
                <Col xs={8} sm={24} md={12} lg={6} xl={6} xxl={6}>
                    <div className={styles.buttonContainer}>
                        {/* {visibleSampleBtn && (
                            <Button danger onClick={handleSample}>
                                <FaHistory className={styles.buttonIcon} />
                                View Product Detail
                            </Button>
                        )} */}
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
