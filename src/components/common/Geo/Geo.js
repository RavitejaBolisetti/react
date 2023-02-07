import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';

import TreeView from 'components/common/TreeView';

import styles from 'pages/common/Common.module.css';
import { addToolTip } from 'utils/customMenuLink';
import { geoDataActions } from 'store/actions/data/geo';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

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
    const [form] = Form.useForm();
    const { setFieldValue } = form;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [parentCodeValue, setParentCodeValue] = useState('');
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);

    const [isFormVisible, setFormVisible] = useState(false);

    useEffect(() => {
        if (!isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded]);

    useEffect(() => {
        hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Geographical' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const finalGeoData = geoData?.map((i) => {
        return { ...i, geoParentData: attributeData?.find((a) => i.attributeKey === a.hierarchyAttribueId) };
    });

    const handleTreeViewVisibleClink = () => setTreeViewVisible(!isTreeViewVisible);

    const dataList = [];
    // const generateList = (data) => {
    //     for (let i = 0; i < data?.length; i++) {
    //         const node = data[i];
    //         const { geoCode: key } = node;
    //         dataList.push({
    //             key,
    //             data: node,
    //         });
    //         if (node.subGeo) {
    //             generateList(node.subGeo);
    //         }
    //     }
    //     return dataList;
    // };

    // const flatternData = generateList(finalGeoData);

    const handleSelectClick = (keys) => {
        // setSelectedTreeKey(keys);
        // const SelectedParentNode = flatternData.find((i) => keys.includes(i.key));
        // setFieldValue('geoParentCode', SelectedParentNode);
    };

    const handleFormVisiblity = (status) => {
        setFormVisible(status);
    };

    const handleParentCode = (value) => {
        setParentCodeValue(value);
    };

    const onFinish = (values) => {
        const onSuccess = (res) => {
            form.resetFields();
            handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
        };

        const onError = (message) => {
            handleErrorModal(message);
        };

        const requestData = {
            data: [{ ...values, id: '', isActive: values?.isActive ? 'Y' : 'N', geoParentCode: parentCodeValue }],
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const onReset = () => {
        form.resetFields();
    };
    console.log('parentCodeValue', parentCodeValue);
    const fieldNames = { title: 'geoName', key: 'geoCode', children: 'subGeo' };
    const isChildAdd = selectedTreeKey && selectedTreeKey.length >= 0;
    const isSublingAdd = selectedTreeKey && selectedTreeKey.length > 0;
    const isUpdate = false;
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
                                        <TreeView fieldNames={fieldNames} handleSelectClick={handleSelectClick} dataList={geoData} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ) : undefined}

                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 24 : 16} xl={!isTreeViewVisible ? 24 : 16} xxl={!isTreeViewVisible ? 24 : 16} className={styles.padRight0}>
                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            {isFormVisible && <AddEditForm geoData={geoData} handleParentCode={handleParentCode} isDataAttributeLoaded={isDataAttributeLoaded} attributeData={attributeData} setIsModalOpen={setIsModalOpen} />}
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
                                                <FaRegTimesCircle size={15} className={styles.buttonIcon} />
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
