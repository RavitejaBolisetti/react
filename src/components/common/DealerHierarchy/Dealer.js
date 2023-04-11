import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Select, Input, Empty} from 'antd';
// import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaRegTimesCircle, FaHistory } from 'react-icons/fa';
import { PlusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';
import style from '../ProductHierarchy/producthierarchy.module.css'
import { dealerHierarchyDataActions } from 'store/actions/data/dealerHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { HIERARCHY_ATTRIBUTES } from 'constants/modules/hierarchyAttributes';

import LeftPanel from 'components/common/LeftPanel';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

import { EN } from 'language/en';

import { ViewDealerDetails } from './ViewDealerDetails';
import { HierarchyFormButton } from 'components/common/Button';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { showGlobalNotification } from 'store/actions/notification';

const { Search } = Input;
const { Option } = Select;


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

export const DealerMain = ({ userId, isDataLoaded, dealerHierarchyData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading,changeHistoryModelOpen,showGlobalNotification }) => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isCollapsableView, setCollapsableView] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);

   // const [isFormVisible, setIsFormVisible] = useState(true);
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [closePanels, setClosePanels] = React.useState([]);
    const [isFormBtnActive, setFormBtnActive] = useState(false);

    const [isChildAllowed, setIsChildAllowed] = useState(true);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const fieldNames = { title: 'shortDescription', key: 'id', children: 'children' };

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleAdd = () => {
        setIsFormVisible(true);
    };

    useEffect(() => {
        setCollapsableView(!isChildAllowed);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChildAllowed]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded,userId]);

    useEffect(() => {
        if(userId)
        hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: HIERARCHY_ATTRIBUTES.DEALER_HIERARCHY.KEY });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

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

    // const handleTreeViewClick = (keys) => {
    //     // setForceFormReset(Math.random() * 10000);
    //     // setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false });
    //     form.resetFields();
    //     setIsFormVisible(false);
    //     setFormData([]);

    //     if (keys && keys.length > 0) {
    //         setFormActionType('view');
    //         const formData = flatternData.find((i) => keys[0] === i.key);
    //         formData && setFormData(formData?.data);

    //         setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
    //         setIsFormVisible(true);
    //         forceUpdate();
    //         setReadOnly(true);
    //     } else {
    //         setButtonData({ ...defaultBtnVisiblity, rootChildBtn: true });
    //         setReadOnly(false);
    //     }
    //     setSelectedTreeKey(keys && keys.length > 0 ? keys[0] : undefined);
    // };

    const handleTreeViewClick = (keys) => {
        form.resetFields();
        setFormData([]);
        setSelectedTreeData([]);

        if (keys && keys.length > 0) {
            setFormActionType('view');
            const formData = flatternData.find((i) => keys[0] === i.key);

            if (formData) {
                const isChildAllowed = attributeData?.find((attribute) => attribute.id === formData?.data?.attributeId)?.isChildAllowed;
                formData && setFormData({ ...formData?.data, isChildAllowed });

                const hierarchyAttribueName = attributeData?.find((attribute) => attribute.id === formData?.data?.attributeId)?.hierarchyAttribueName;
                const prodctShrtName = flatternData.find((i) => formData?.data?.parentId === i.key)?.data?.prodctShrtName;
                formData && setSelectedTreeData({ ...formData?.data, hierarchyAttribueName, parentName: prodctShrtName });
            }

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
        } else {
            setButtonData({ ...defaultBtnVisiblity, rootChildBtn: true });
            setIsChildAllowed(true);
        }

        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        // setSelectedTreeKey([value]);
        setSelectedTreeSelectKey(value);
    };

    // const onFinish = (values) => {

    //     console.log(values, 'Initial Data');

    //     const recordId = formData?.id || '';
    //     const codeToBeSaved = selectedTreeSelectKey || '';

    //     const parentGroupForm = 'parentGroup';
    //     const companyGroupForm = 'companyGroup';
    //     const gstinGroupForm = 'gstinGroup';
    //     const branchGroupForm = 'branchGroup';

    //     const customFormInput = { [parentGroupForm]: null, [companyGroupForm]: null, [gstinGroupForm]: null, [branchGroupForm]: null };

    //     const data = { ...values, ...customFormInput, [values?.inputFormType]: { ...values[values?.inputFormType], parentId: codeToBeSaved, id: recordId, status: 'Y' } };

    //     console.log(data, 'Final Data');

    //     const onSuccess = (res) => {
    //         form.resetFields();
    //         setForceFormReset(Math.random() * 10000);

    //         setReadOnly(true);
    //         setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
    //         setIsFormVisible(true);

    //         if (res?.data) {
    //             handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
    //             fetchList({ setIsLoading: listShowLoading, userId });
    //             formData && setFormData(res?.data[values?.inputFormType]);
    //             setSelectedTreeKey([res?.data[values?.inputFormType]?.id]);
    //             setFormActionType('view');
    //         }
    //     };

    //     const onError = (message) => {
    //         handleErrorModal(message);
    //     };

    //     delete data.inputFormType;
    //     delete data.parentId;

    //     const requestData = {
    //         data: data,
    //         method: 'post',
    //         setIsLoading: listShowLoading,
    //         userId,
    //         onError,
    //         onSuccess,
    //     };
    //     saveData(requestData);
    // };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = selectedTreeSelectKey || '';
        const data = { ...values, id: recordId, active: values?.active ? 'Y' : 'N', parentCode: codeToBeSaved, otfAmndmntAlwdInd: values?.otfAmndmntAlwdInd || 'N' };
        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId });
                formData && setSelectedTreeData(formData?.data);
                setSelectedTreeKey([res?.data?.id]);
                setFormActionType('view');
            }
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
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
        isReadOnly,
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
        setClosePanels,
        styles,
        viewTitle,
    };

    const leftCol = dealerHierarchyData.length > 0 ? 16 : 24;
    const rightCol = dealerHierarchyData.length > 0 ? 8 : 24;

    const noDataTitle = EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);

    return (
        <>
            
                <Row gutter={20} span={24}>

                    <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                        <div className={styles.contentHeaderBackground}>
                            <Row gutter={20} className={styles.searchAndLabelAlign}>
                                <Col xs={18} sm={18} md={18} lg={18} xl={18} className={style.subheading}>
                                    Hierarchy
                                    {/* <Select
                                        placeholder="Select a option"
                                        disabled
                                        allowClear
                                        className={styles.searchField}
                                        style={{
                                            width: '43%',
                                        }}
                                    >
                                        <Option value="hyr">Hyr</Option>
                                    </Select> */}
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
                                {/* {dealerHierarchyData.length > 0 && (
                                    <Col className={styles.buttonContainer} xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Button type="primary" onClick={changeHistoryModelOpen}>
                                            <FaHistory className={styles.buttonIcon} />
                                            Change History
                                        </Button>
                                    </Col>
                                )} */}
                            </Row>
                        </div>
                        <div className={styles.content}>
                            {dealerHierarchyData.length <= 0 ? (
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
                                        <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                            Add
                                        </Button>
                                    </Empty>
                                </div>
                            ) : (
                                <LeftPanel {...myProps} />
                            )}
                        </div>
                    </Col>

                    {/* <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                        <LeftPanel {...myProps} />
                    </Col> */}

                    {/* <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 24 : 16} xl={!isTreeViewVisible ? 24 : 16} xxl={!isTreeViewVisible ? 24 : 16} className={styles.padRight0}>
                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            {isFormVisible && <AddEditForm {...formProps} />}
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                                    {buttonData?.editBtn && (
                                        <Button danger onClick={() => handleEditBtn()}>
                                            <FaEdit className={styles.buttonIcon} />
                                            Edit
                                        </Button>
                                    )}

                                    {buttonData?.rootChildBtn && (
                                        <Button danger onClick={() => handleRootChildBtn()}>
                                            <FaUserPlus className={styles.buttonIcon} />
                                            Add Child
                                        </Button>
                                    )}

                                    {buttonData?.childBtn && (
                                        <Button danger onClick={() => handleChildBtn()}>
                                            <FaUserPlus className={styles.buttonIcon} />
                                            Add Child
                                        </Button>
                                    )}

                                    {buttonData?.siblingBtn && (
                                        <Button danger onClick={() => handleSiblingBtn()}>
                                            <FaUserFriends className={styles.buttonIcon} />
                                            Add Sibling
                                        </Button>
                                    )}

                                    {isFormVisible && (
                                        <>
                                            {buttonData?.saveBtn && (
                                                <Button htmlType="submit" danger>
                                                    <FaSave className={styles.buttonIcon} />
                                                    Save
                                                </Button>
                                            )}

                                            {buttonData?.resetBtn && (
                                                <Button danger onClick={handleResetBtn}>
                                                    <FaUndo className={styles.buttonIcon} />
                                                    Reset
                                                </Button>
                                            )}

                                            {buttonData?.cancelBtn && (
                                                <Button danger onClick={() => handleBack()}>
                                                    <FaRegTimesCircle size={15} className={styles.buttonIcon} />
                                                    Cancel
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                    </Col> */}

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol} className={styles.padRight0}>
                    {isCollapsableView ? <></> : null}

                    {selectedTreeData && selectedTreeData?.id ? (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <ViewDealerDetails {...viewProps} />
                            <HierarchyFormButton {...viewProps} />
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
