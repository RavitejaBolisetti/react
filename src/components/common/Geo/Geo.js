import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Modal } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaCross } from 'react-icons/fa';
import { ExclamationCircleFilled } from '@ant-design/icons';

import TreeView from 'components/common/TreeView';

import styles from 'pages/common/Common.module.css';
import { addToolTip } from 'utils/customMenuLink';
import { geoDataActions } from 'store/actions/data/geo';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';

const { success: successModel, error: errorModel } = Modal;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: { isLoaded: isDataLoaded = false, data: geoData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        geoData,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: geoDataActions.fetchList,
            saveData: geoDataActions.saveData,
            listShowLoading: geoDataActions.listShowLoading,

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const GeoMain = ({ userId, isDataLoaded, geoData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
    const finalGeoData = geoData?.map((i) => {
        return { ...i, geoParentData: attributeData?.find((a) => i.attributeKey === a.hierarchyAttribueId) };
    });
    // console.log('🚀 isDataAttributeLoaded ~ file: Geo.js:68 ~ finalGeoData ~ finalGeoData', finalGeoData);

    useEffect(() => {
        if (!isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId });
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Geographical' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded]);

    const [form] = Form.useForm();
    const { setFieldValue } = form;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [parentCodeValue, setParentCodeValue] = useState('');
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);

    const [isFormVisible, setFormVisible] = useState(false);

    const handleTreeViewVisibleClink = () => setTreeViewVisible(!isTreeViewVisible);

    const showSuccessModel = ({ title, message }) => {
        successModel({
            title: title,
            icon: <ExclamationCircleFilled />,
            content: message,
        });
    };

    const onError = (message) => {
        errorModel({
            title: 'ERROR',
            icon: <ExclamationCircleFilled />,
            content: message,
        });
    };

    const onFinish = (values) => {
        const onSuccess = (res) => {
            form.resetFields();
            showSuccessModel({ title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
        };
        saveData({ data: [{ ...values, id: '', isActive: values?.isActive ? 'Y' : 'N', geoParentCode: parentCodeValue }], setIsLoading: listShowLoading, userId, onError, onSuccess });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { geoCode: key } = node;
            dataList.push({
                key,
                data: node,
            });
            if (node.subGeo) {
                generateList(node.subGeo);
            }
        }
        return dataList;
    };

    const flatternData = generateList(finalGeoData);

    const handleSelectClick = (keys) => {
        setSelectedTreeKey(keys);
        // console.log('🚀 ~ file: GeoPage.js:134 ~ handleSelectClick ~ keys', keys);
        const SelectedParentNode = flatternData.find((i) => keys.includes(i.key));
        // console.log('🚀 ~ file: GeoPage.js:136 ~ handleSelectClick ~ SelectedParentNode', SelectedParentNode, 'flatternData', flatternData);
        setFieldValue('geoParentCode', SelectedParentNode);
    };

    const handleFormVisiblity = (status) => {
        setFormVisible(status);
    };
    const isChildAdd = selectedTreeKey && selectedTreeKey.length >= 0;
    const isSublingAdd = selectedTreeKey && selectedTreeKey.length > 0;
    const isUpdate = false;

    const onReset = () => {
        form.resetFields();
    };

    const handleParentCode = (e) => {
        setParentCodeValue(e.target.value);
    };
    return (
        <>
            <div className={styles.geoSection}>
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
                                        <TreeView handleSelectClick={handleSelectClick} dataList={geoData} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ) : undefined}

                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 24 : 16} xl={!isTreeViewVisible ? 24 : 16} xxl={!isTreeViewVisible ? 24 : 16} className={styles.padRight0}>
                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} setFieldValue={form.setFieldValue}>
                            {isFormVisible && <AddEditForm handleParentCode={handleParentCode} isDataAttributeLoaded={isDataAttributeLoaded} attributeData={attributeData} setIsModalOpen={setIsModalOpen} />}
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                                    {isUpdate && (
                                        <Button danger>
                                            <FaEdit className={styles.buttonIcon} />
                                            Edit
                                        </Button>
                                    )}

                                    {isChildAdd && !isFormVisible && (
                                        <Button danger onClick={() => handleFormVisiblity(true)}>
                                            <FaUserPlus className={styles.buttonIcon} />
                                            Add Child
                                        </Button>
                                    )}

                                    {isSublingAdd && !isFormVisible && (
                                        <Button danger onClick={() => handleFormVisiblity(true)}>
                                            <FaUserFriends className={styles.buttonIcon} />
                                            Add Sibling
                                        </Button>
                                    )}

                                    {(isUpdate || isFormVisible) && (
                                        <>
                                            <Button htmlType="submit" danger>
                                                <FaSave className={styles.buttonIcon} />
                                                Save
                                            </Button>

                                            <Button danger onClick={onReset}>
                                                <FaUndo className={styles.buttonIcon} />
                                                Reset
                                            </Button>

                                            <Button danger onClick={() => handleFormVisiblity(false)}>
                                                <FaCross className={styles.buttonIcon} />
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>

                <ParentHierarchy title={'Parent Hierarchy'} dataList={geoData} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
            </div>
        </>
    );
};

export const Geo = connect(mapStateToProps, mapDispatchToProps)(GeoMain);
