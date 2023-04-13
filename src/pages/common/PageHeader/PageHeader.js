import React from 'react';
import { Row, Col, Space, Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { addToolTip } from 'utils/customMenuLink';
import styles from './PageHeader.module.css';
import { bindActionCreators } from 'redux';
import { menuDataActions } from 'store/actions/data/menu';
import * as routing from 'constants/routing';
import { connect } from 'react-redux';
import { Upload } from 'components/common/ManufacturerAdminstrativeHierarchy/Upload';
import { MdStars } from 'react-icons/md';
import { showGlobalNotification } from 'store/actions/notification';
import { MenuConstant } from 'constants/MenuConstant';

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
            Menu: { isLoaded: isDataLoaded = false, filter, data: menuData = [], favouriteMenu = [], flatternData: flatternMenuData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = { isLoading: false, userId, isDataLoaded, filter, menuData, flatternMenuData, favouriteMenu, collapsed };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: menuDataActions.fetchList,
            markFavourite: menuDataActions.markFavourite,
            listShowLoading: menuDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const PageHeaderMain = ({ pageTitle, menuData, flatternMenuData, fetchList, userId, favouriteMenu, markFavourite, listShowLoading, showGlobalNotification, canMarkFavourite = false, visibleSampleBtn = false, handleSample = undefined, visibleChangeHistory = true, handleChangeHistoryClick = undefined, isChangeHistoryVisible = false, isUploadVisible = false }) => {
    const location = useLocation();
    const pagePath = location.pathname;

    const menuId = flatternMenuData?.find((i) => i.link === pagePath)?.menuId;
    const checkFev = (data) => data.find((item) => item.menuId === menuId);
    const isFavourite = checkFev(favouriteMenu);

    const handleFavouriteClick = () => {
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
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
                <Col xs={visibleChangeHistory ? 12 : 24} sm={visibleChangeHistory ? 12 : 24} md={12} lg={14} xl={14} xxl={14}>
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

                        {/* {visibleChangeHistory &&
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
                            ))} */}

                        {isUploadVisible ? (
                            <Button danger onClick={handleUploadClick}>
                                <FiUpload className={styles.buttonIcon} />
                                Upload/Download
                            </Button>
                        ) : null}

                        {/* <Button danger onClick={handleBack}>
                            <FaLongArrowAltLeft className={styles.buttonIcon} />
                            Exit
                        </Button> */}
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
