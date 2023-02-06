import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Row, Col, Input, Select, Switch, Button, Modal } from 'antd';
import { FaSearch, FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import TreeView from 'components/common/TreeView';
import styles from '../Common.module.css';
import { connect } from 'react-redux';
import { ROUTING_DASHBOARD } from 'constants/routing';
import ParentHierarchy from '../Geo/ParentHierarchy';
import { PageHeader } from 'pages/common/PageHeader';
import { addToolTip } from 'utils/customMenuLink';
import { ChangeHistory } from '../ChangeHistory/ChangeHistory';
import { ProductMaster } from './ProductMaster';
import AddEditForm from './AddEditForm';

const { confirm } = Modal;
const { TextArea } = Input;

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };

    return returnValue;
};

export const ProductHierarchyBase = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAttributeVisible, setAttributeVisible] = useState(false);
    const [isFavourite, setFavourite] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isChangeHistoryVisible, setChangeHistoryVisible] = useState(false);

    const handleChangeHistoryClick = (e) => {
        setChangeHistoryVisible(!isChangeHistoryVisible);
    };

    const onSubmit = (e) => {
        form.validateFields()
            .then((err, values) => {
                console.log('🚀 ~ file: GeoPage.js:17 ~ validateFields ~ values', values, err);
            })
            .catch((errorInfo) => {
                console.log('🚀 ~ file: GeoPage.js:20 ~ validateFields ~ errorInfo', errorInfo);
            });
    };

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

    const handleTreeViewVisibleClink = () => setTreeViewVisible(!isTreeViewVisible);

    const handleFavouriteClick = () => setFavourite(!isFavourite);

    const pageTitle = 'Product Hierarchy';
    const pageHeaderData = {
        pageTitle,
        showChangeHisoty: true,
        handleBack,
        isFavourite,
        setFavourite,
        handleFavouriteClick,
        visibleChangeHistory: true,
        handleChangeHistoryClick,
        isChangeHistoryVisible,
        visibleSampleBtn: true,
        handleSample: () => setAttributeVisible(!isAttributeVisible),
    };
    return (
        <>
            <PageHeader {...pageHeaderData} />

            <Row gutter={20}>
                <div className={styles.treeCollapsibleButton} style={{ marginTop: '-8px', marginLeft: '10px' }} onClick={handleTreeViewVisibleClink}>
                    {isTreeViewVisible ? addToolTip('Collapse')(<FaAngleDoubleLeft />) : addToolTip('Expand')(<FaAngleDoubleRight />)}
                </div>
            </Row>

            <Row gutter={20}>
                {isTreeViewVisible ? (
                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                        <div className={styles.leftpanel}>
                            <div className={styles.treeViewContainer}>
                                <div className={styles.treemenu}>
                                    <TreeView isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                                </div>
                            </div>
                        </div>
                    </Col>
                ) : undefined}

                <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 24 : 16} xl={!isTreeViewVisible ? 24 : 16} xxl={!isTreeViewVisible ? 24 : 16} className={styles.paddingRightZero}>
                    {isChangeHistoryVisible ? (
                        <ChangeHistory />
                    ) : (
                        <div className="right col" style={{ padding: '0' }}>
                            {isAttributeVisible ? <ProductMaster /> : <AddEditForm />}
                        </div>
                    )}
                </Col>
            </Row>

            <ParentHierarchy title={'Parent Hierarchy'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </>
    );
};

export const ProductHierarchyPage = connect(mapStateToProps, null)(withLayoutMaster(ProductHierarchyBase));
