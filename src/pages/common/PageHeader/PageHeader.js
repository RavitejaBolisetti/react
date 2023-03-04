import React from 'react';
import { Row, Col, Space, Button, Modal } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import {  FaHistory, FaLongArrowAltLeft } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import { ROUTING_DASHBOARD } from 'constants/routing';
import styles from './PageHeader.module.css';
import { bindActionCreators } from 'redux';
import { menuDataActions } from 'store/actions/data/menu';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import * as routing from 'constants/routing';
import { connect } from 'react-redux';
import { Upload } from 'components/common/ManufacturerAdminstrativeHierarchy/Upload';
import { MdStars } from 'react-icons/md';

const { confirm } = Modal;

const handleUploadClick = () => {
    return (
        <>
            <Upload />
        </>
    );
};

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Menu: { isLoaded: isDataLoaded = false, filter, data: menuData = [], favouriteMenu = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = { isLoading: false, userId, isDataLoaded, filter, menuData, favouriteMenu, collapsed };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: menuDataActions.fetchList,
            markFavourite: menuDataActions.markFavourite,
            listShowLoading: menuDataActions.listShowLoading,
        },
        dispatch
    ),
});

const PageHeaderMain = ({ pageTitle, fetchList, userId, favouriteMenu, markFavourite, listShowLoading, canMarkFavourite = false, visibleSampleBtn = false, handleSample = undefined, visibleChangeHistory = true, handleChangeHistoryClick = undefined, isChangeHistoryVisible = false, isUploadVisible = false }) => {
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

    const location = useLocation();
    const pagePath = location.pathname;

    const menuId = pagePath === routing?.ROUTING_COMMON_GEO ? 'COMN-07.01' : pagePath === routing?.ROUTING_COMMON_PRODUCT_HIERARCHY ? 'COMN-06.01' : pagePath === routing?.ROUTING_COMMON_MANUFACTURER_ORGANIZATION_HIERARCHY ? 'COMN-05.01' : '';

    const checkFev = (data) => data.find((item) => item.menuId === menuId);
    const isFavourite = checkFev(favouriteMenu);

    const handleFavouriteClick = () => {
        const onSuccess = (res) => {
            handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
        };

        const onError = (message) => {
            handleErrorModal(message);
        };
        const requestData = {
            data: { menuId: menuId, addOrRemove: isFavourite ? 'remove' : 'add' },
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        markFavourite(requestData);
    };

    return (
        <>
            <Row gutter={20} className={styles.pageHeader}>
                <Col xs={visibleChangeHistory ? 12 : 16} sm={visibleChangeHistory ? 12 : 16} md={12} lg={14} xl={14} xxl={14}>
                    <Space>
                        <div>
                            <span className={styles.headingGradient}>{pageTitle}</span>
                        </div>
                        {canMarkFavourite && <div className={styles.favIconHeading}>{isFavourite ? addToolTip('Remove from favourite')(<MdStars size={22} onClick={handleFavouriteClick} />) : addToolTip('Mark as favourite')(<MdStars color="#1e1e1e" size={22} onClick={handleFavouriteClick} />)}</div>}
                    </Space>
                </Col>
                <Col xs={visibleChangeHistory ? 12 : 8} sm={visibleChangeHistory ? 12 : 8} md={12} lg={10} xl={10} xxl={10}>
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

                        {isUploadVisible ? (
                            <Button danger onClick={handleUploadClick}>
                                <FiUpload className={styles.buttonIcon} />
                                Upload/Download
                            </Button>
                        ) : null}

                        <Button danger onClick={handleBack}>
                            <FaLongArrowAltLeft className={styles.buttonIcon} />
                            Exit
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
        </>
    );
};

export const PageHeader = connect(mapStateToProps, mapDispatchToProps)(PageHeaderMain);
