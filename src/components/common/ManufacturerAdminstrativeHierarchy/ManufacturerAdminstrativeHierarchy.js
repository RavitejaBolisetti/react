import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaRegTimesCircle } from 'react-icons/fa';

import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { ManufacturerAdminHierarchyChangeHistory } from '../ManufacturerAdminstrativeHierarchy';
import LeftPanel from '../LeftPanel';

import styles from 'pages/common/Common.module.css';
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isLoaded: isDataLoaded = false, data: manufacturerAdminHierarchyData = [] },
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
        manufacturerAdminHierarchyData,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: manufacturerAdminHierarchyDataActions.fetchList,
            saveData: manufacturerAdminHierarchyDataActions.saveData,
            listShowLoading: manufacturerAdminHierarchyDataActions.listShowLoading,

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const ManufacturerAdminstrativeHierarchyMain = ({ isChangeHistoryVisible, userId,manufacturerAdminHierarchyData, isDataLoaded, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
    /* To Do : Need to remove once API deployed Start */
    // const manufacturerAdminHierarchyData = [
    //     {
    //         id: 'cd614369-0bb2-48a4-9065-282495798070',
    //         manufactureAdminLongName: 'MAHINDRA THAR VARIANT',
    //         manufactureAdminShrtName: 'MAHINDRA THAR ',
    //         manufactureAdminCode: 'SCR',
    //         manufactureAdminParntId: '79eac316-41ba-40f1-9507-c527f468ce4d',
    //         active: 'N',
    //         attributeKey: '31fb3314-1ab3-402c-874f-1515389209e5',
    //         subManufactureAdmin: [],
    //     },
    //     {
    //         id: 'cd614369-0bb2-48a4-9065-282495798070',
    //         manufactureAdminLongName: 'MAHINDRA THAR VARIANT',
    //         manufactureAdminShrtName: 'MAHINDRA THAR ',
    //         manufactureAdminCode: 'SCR',
    //         manufactureAdminParntId: '79eac316-41ba-40f1-9507-c527f468ce4d',
    //         active: 'N',
    //         attributeKey: '31fb3314-1ab3-402c-874f-1515389209e5',
    //         subManufactureAdmin: [
    //             {
    //                 id: 'cd614369-0bb2-48a4-9065-282495798070',
    //                 manufactureAdminLongName: 'MAHINDRA THAR VARIANT',
    //                 manufactureAdminShrtName: 'MAHINDRA THAR ',
    //                 manufactureAdminCode: 'SCR',
    //                 manufactureAdminParntId: '79eac316-41ba-40f1-9507-c527f468ce4d',
    //                 active: 'N',
    //                 attributeKey: '31fb3314-1ab3-402c-874f-1515389209e5',
    //                 subManufactureAdmin: [],
    //             },
    //         ],
    //     },
    // ];

    /* To Do : Need to remove once API deployed End */

    const [form] = Form.useForm();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);

    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    useEffect(() => {
        if (!isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded]);

    useEffect(() => {
        hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Manufacturer Administration' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    const finalManufacturerAdministrativeHirarchyData = manufacturerAdminHierarchyData?.map((i) => {
        return { ...i, geoParentData: attributeData?.find((a) => i.attributeKey === a.hierarchyAttribueId) };
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
            if (node.subGeo) {
                generateList(node.subGeo);
            }
        }
        return dataList;
    };

    const flatternData = generateList(finalManufacturerAdministrativeHirarchyData);

    const handleTreeViewClick = (keys) => {
        setForceFormReset(Math.random() * 10000);
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false });
        form.resetFields();
        setFormVisible(false);
        setFormData([]);

        if (keys && keys.length > 0) {
            setFormActionType('view');
            const formData = flatternData.find((i) => keys[0] === i.key);
            formData && setFormData(formData?.data);

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
            setFormVisible(true);
            forceUpdate();
            setReadOnly(true);
        } else {
            setButtonData({ ...defaultBtnVisiblity, rootChildBtn: true });
            setReadOnly(false);
        }
        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        // setSelectedTreeKey([value]);
        setSelectedTreeSelectKey(value);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = Array.isArray(values?.manufacturerAdminHierarchyParentCode) ? values?.manufacturerAdminHierarchyParentCode[0] : values?.manufacturerAdminHierarchyParentCode || '';
        const data = { ...values, id: recordId, isActive: values?.isActive ? 'Y' : 'N', manufacturerAdminHierarchyParentCode: codeToBeSaved };
        const onSuccess = (res) => {
            form.resetFields();
            setForceFormReset(Math.random() * 10000);

            setReadOnly(true);
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
            setFormVisible(true);
            formData && setFormData(data);

            if (selectedTreeKey && selectedTreeKey.length > 0) {
                !recordId && setSelectedTreeKey(codeToBeSaved);
                setFormActionType('view');
            }
            handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
        };

        const onError = (message) => {
            handleErrorModal(message);
        };

        const requestData = {
            data: [data],
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

    const handleEditBtn = () => {
        setForceFormReset(Math.random() * 10000);

        const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        formData && setFormData(formData?.data);
        setFormActionType('edit');

        setReadOnly(false);
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: false, cancelBtn: true });
    };

    const handleRootChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('rootChild');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('child');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleSiblingBtn = () => {
        setForceFormReset(Math.random() * 10000);

        setFormActionType('sibling');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleResetBtn = () => {
        setForceFormReset(Math.random() * 10000);
        form.resetFields();
    };

    const handleBack = () => {
        setReadOnly(true);
        setForceFormReset(Math.random() * 10000);
        if (selectedTreeKey && selectedTreeKey.length > 0) {
            const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            formData && setFormData(formData?.data);
            setFormActionType('view');
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
        } else {
            setFormActionType('');
            setFormVisible(false);
            setButtonData({ ...defaultBtnVisiblity });
        }
    };
    const fieldNames = { title: 'manufactureOrgShrtName', key: 'id', children: 'subManufactureOrg' };

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        dataList: manufacturerAdminHierarchyData,
    };

    return (
        <>
            <div className={styles.geoSection}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                        <LeftPanel {...myProps} />
                    </Col>
                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 23 : 12} lg={!isTreeViewVisible ? 23 : 16} xl={!isTreeViewVisible ? 23 : 16} xxl={!isTreeViewVisible ? 23 : 16} className={styles.padRight0}>
                        {isChangeHistoryVisible ? (
                            <ManufacturerAdminHierarchyChangeHistory />
                        ) : (
                            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                {isFormVisible && <AddEditForm setSelectedTreeKey={setSelectedTreeKey} isChecked={isChecked} setIsChecked={setIsChecked} flatternData={flatternData} formActionType={formActionType} selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} isReadOnly={isReadOnly} formData={formData} manufacturerAdminHierarchyData={manufacturerAdminHierarchyData} handleSelectTreeClick={handleSelectTreeClick} isDataAttributeLoaded={isDataAttributeLoaded} attributeData={attributeData} />}
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
                        )}
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const ManufacturerAdminstrativeHierarchy = connect(mapStateToProps, mapDispatchToProps)(ManufacturerAdminstrativeHierarchyMain);
