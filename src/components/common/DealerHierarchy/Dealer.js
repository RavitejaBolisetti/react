import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Input, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';

import { dealerHierarchyDataActions } from 'store/actions/data/dealerHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { HIERARCHY_ATTRIBUTES } from 'constants/modules/hierarchyAttributes';
import { DEALER_HIERARCHY } from 'constants/modules/dealerHierarchy';

import LeftPanel from 'components/common/LeftPanel';

import { EN } from 'language/en';

import { ViewDealerDetails } from './ViewDealerDetails';
import { HierarchyFormButton } from 'components/common/Button';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { showGlobalNotification } from 'store/actions/notification';

const { Search } = Input;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            DealerHierarchy: { isLoaded: isDataLoaded = false, data: dealerHierarchyData = [] },
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
        dealerHierarchyData: dealerHierarchyData,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: dealerHierarchyDataActions.fetchList,
            saveData: dealerHierarchyDataActions.saveData,
            listShowLoading: dealerHierarchyDataActions.listShowLoading,
            changeHistoryModelOpen: dealerHierarchyDataActions.changeHistoryModelOpen,
            showGlobalNotification,

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const DealerMain = ({ userId, isDataLoaded, dealerHierarchyData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading, changeHistoryModelOpen, showGlobalNotification }) => {
    const [form] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    //unCheckedChildren="Inactive"

    const [searchValue, setSearchValue] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormBtnActive, setFormBtnActive] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const fieldNames = { title: 'shortDescription', key: 'id', children: 'children' };

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleAdd = () => {
        setIsFormVisible(true);
    };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded, userId]);

    useEffect(() => {
        if (userId) hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: HIERARCHY_ATTRIBUTES.DEALER_HIERARCHY.KEY });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const finaldealerHierarchyData = dealerHierarchyData?.map((i) => {
        return { ...i, parentData: attributeData?.find((a) => i.attributeKey === a.hierarchyAttribueId) };
    });

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { id: key } = node;
            dataList.push({
                key,
                data: node,
            });
            if (node[fieldNames?.children]) {
                generateList(node[fieldNames?.children]);
            }
        }
        return dataList;
    };

    const flatternData = generateList(finaldealerHierarchyData);

    const handleTreeViewClick = (keys) => {
        form.resetFields();
        setFormData([]);
        setSelectedTreeData([]);

        if (keys && keys.length > 0) {
            setFormActionType(FROM_ACTION_TYPE.VIEW);
            const formData = flatternData.find((i) => keys[0] === i.key);
            if (formData) {
                const isChildAllowed = attributeData?.find((attribute) => attribute.id === formData?.data?.attributeId)?.isChildAllowed;
                formData && setFormData({ ...formData?.data, isChildAllowed });

                const hierarchyAttribueName = attributeData?.find((attribute) => attribute.id === formData?.data?.attributeId)?.hierarchyAttribueName;

                const prodctShrtName = flatternData.find((i) => formData?.data?.parentId === i.key)?.data?.shortDescription;
                formData && setSelectedTreeData({ ...formData?.data, hierarchyAttribueName, parentName: prodctShrtName });
            }

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
        }

        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        setSelectedTreeSelectKey(value);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = selectedTreeSelectKey || '';

        const parentGroupForm = DEALER_HIERARCHY?.PARNT?.FORM_NAME;
        const companyGroupForm = DEALER_HIERARCHY?.COMP?.FORM_NAME;
        const gstinGroupForm = DEALER_HIERARCHY?.GSTIN?.FORM_NAME;
        const branchGroupForm = DEALER_HIERARCHY?.LOCTN?.FORM_NAME;

        const customFormInput = { [parentGroupForm]: null, [companyGroupForm]: null, [gstinGroupForm]: null, [branchGroupForm]: null };

        const data = { ...values, ...customFormInput, [values?.inputFormType]: { ...values[values?.inputFormType], parentId: codeToBeSaved, id: recordId, status: values?.status } };

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            setIsFormVisible(true);

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId });

                const hierarchyAttribueName = attributeData?.find((attribute) => attribute.id === res?.data?.attributeId)?.hierarchyAttribueName;
                const prodctShrtName = flatternData.find((i) => res?.data[values?.inputFormType]?.parentId === i.key)?.data?.shortDescription;

                formData && setSelectedTreeData({ type: values?.inputFormType, ...res?.data[values?.inputFormType], hierarchyAttribueName, parentName: prodctShrtName });

                setSelectedTreeKey([res?.data[values?.inputFormType]?.id]);
                setFormActionType(FROM_ACTION_TYPE.VIEW);
                setIsFormVisible(false);
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        delete data.inputFormType;
        delete data.parentId;
        delete data.status;

        const requestData = {
            data: data,
            method: 'post',
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

    const handleButtonClick = (type) => {
        setFormData([]);
        form.resetFields();
        if (type === FROM_ACTION_TYPE.EDIT) {
            const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            formData && setFormData(formData?.data);
        }
        setIsFormVisible(true);
        setFormActionType(type);
    };

    const moduleTitle = 'Dealer Detail';
    const viewTitle = 'Hierarchy Details';

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        handleTreeViewClick,
        treeData: dealerHierarchyData,
        fieldNames,
        form,
        searchValue,
        setSearchValue,
    };

    const formProps = {
        isChecked,
        setIsChecked,
        setSelectedTreeKey,
        flatternData,
        formActionType,
        selectedTreeKey,
        selectedTreeSelectKey,
        formData,
        treeData: dealerHierarchyData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        attributeData,
        fieldNames,
        setSelectedTreeSelectKey,
        isVisible: isFormVisible,
        onCloseAction: () => setIsFormVisible(false),
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
    };

    const viewProps = {
        buttonData,
        attributeData,
        selectedTreeData,
        handleButtonClick,
        styles,
        viewTitle,
    };

    const leftCol = dealerHierarchyData?.length > 0 ? 16 : 24;
    const rightCol = dealerHierarchyData?.length > 0 ? 8 : 24;

    const noDataTitle = EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);

    return (
        <>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20} className={styles.searchAndLabelAlign}>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18} >
                                Hierarchy
                                <Search
                                    placeholder="Search"
                                    style={{
                                        width: '43%',
                                    }}
                                    allowClear
                                    onChange={onChange}
                                    className={styles.searchField}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.content}>
                        {dealerHierarchyData?.length <= 0 ? (
                            <div className={styles.emptyContainer}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        <span>
                                            {noDataTitle} <br /> {noDataMessage}
                                        </span>
                                    }
                                >
                                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add
                                    </Button>
                                </Empty>
                            </div>
                        ) : (
                            <LeftPanel {...myProps} />
                        )}
                    </div>
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol} className={styles.padRight0}>
                    {selectedTreeData && selectedTreeData?.id ? (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <ViewDealerDetails {...viewProps} />
                            <div className={styles.hyrbuttonContainer}>
                            <HierarchyFormButton {...viewProps} />
                            </div>
                        </Col>
                    ) : (
                        <div className={styles.emptyContainer}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        Please select product from left <br />
                                        side hierarchy to view “Hierarchy Details”
                                    </span>
                                }
                            ></Empty>
                        </div>
                    )}
                </Col>
                
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const Dealer = connect(mapStateToProps, mapDispatchToProps)(DealerMain);
