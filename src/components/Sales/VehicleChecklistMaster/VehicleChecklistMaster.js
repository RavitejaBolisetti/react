/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Input, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { HierarchyFormButton } from 'components/common/Button';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { vehicleChecklistMasterDataActions } from 'store/actions/data/sales/vehicleChecklistMaster/VehicleChecklistMaster';
import { vehicleChecklistMasterAttributeLovDataActions } from 'store/actions/data/sales/vehicleChecklistMaster/attributeHierarchyLov';
import { otfLoyaltyModelGroupDataActions } from 'store/actions/data/otf/loyaltyModelGroup';

import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { ViewTaxCharges } from './ViewChecklistMaster';
import LeftPanel from 'components/common/LeftPanel';

import { LANGUAGE_EN } from 'language/en';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { VEHICLE_CHECKLIST_TYPE } from 'constants/modules/VehicleCheckListMaster/vehicleChecklistType';
import { CHECKLIST_TYPE } from 'constants/modules/VehicleCheckListMaster/checklistType';
import { ANSWER_TYPES } from 'constants/modules/VehicleCheckListMaster/AnswerTypes';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoading: isConfigLoaded, filteredListData: typeData = [] },
            VehicleChecklistMaster: {
                VehicleChecklistMasterList: { isLoaded: isVehicleChecklistMasterLoaded = false, data: VehicleChecklistMasterList = [] },
                VehicleChecklistMasterListAttributeLov: { isLoaded: isVehicleChecklistMasterAtrributeLovLoaded = false, data: VehicleChecklistAttributeLov = [] },
            },
            OTF: {
                LoyaltyModelGroup: { isLoading: isModelLoading, data: modelGroupData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Checklist';
    const viewTitle = 'Vehicle Checklist';

    let returnValue = {
        userId,
        moduleTitle,
        viewTitle,
        typeData,
        VehicleChecklistMasterList,
        VehicleChecklistAttributeLov,
        isVehicleChecklistMasterLoaded,
        isVehicleChecklistMasterAtrributeLovLoaded,
        isModelLoading,
        modelGroupData,
        isConfigLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,

            fetchVehicleChecklist: vehicleChecklistMasterDataActions.fetchList,
            listShowLoadingVehicleChecklist: vehicleChecklistMasterDataActions.listShowLoading,
            saveData: vehicleChecklistMasterDataActions.saveData,

            fetchVehicleChecklistAttributeLov: vehicleChecklistMasterAttributeLovDataActions.fetchList,
            listShowLoadingVehicleChecklistAttributeLov: vehicleChecklistMasterAttributeLovDataActions.listShowLoading,

            fetchModelLovList: otfLoyaltyModelGroupDataActions.fetchList,
            listModelShowLoading: otfLoyaltyModelGroupDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleChecklistMain = ({ typeData, moduleTitle, viewTitle, userId, isDataAttributeLoaded, showGlobalNotification, fetchVehicleChecklist, listShowLoadingVehicleChecklist, VehicleChecklistMasterList, VehicleChecklistAttributeLov, fetchVehicleChecklistAttributeLov, listShowLoadingVehicleChecklistAttributeLov, fetchModelLovList, listModelShowLoading, modelGroupData, saveData, isConfigLoaded }) => {
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [answerForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [modelForm] = Form.useForm();
    const [modelEditForm] = Form.useForm();

    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [formEdit, setFormEdit] = useState(false);
    const [modelEdit, setModelEdit] = useState(false);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [attributeType, setAttributeType] = useState();
    const [buttonType, setButtonType] = useState(CHECKLIST_TYPE?.VDC?.key);
    const [handleButtonClickChange, setHandleButtonClickChange] = useState(false);
    const [answerType, setAnswerType] = useState(null);
    const [answerData, setAnswerData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const fieldNames = { title: 'descriptionTitle', key: 'id', children: 'children' };

    useEffect(() => {
        const extraParams = [
            {
                key: 'type',
                value: 'Vehicle Checklist',
            },
        ];
        if (userId) {
            fetchVehicleChecklistAttributeLov({ setIsLoading: listShowLoadingVehicleChecklistAttributeLov, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchModelLovList({ setIsLoading: listModelShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const extraParams = [
        {
            key: 'searchType',
            value: buttonType,
        },
    ];

    useEffect(() => {
        if (userId) {
            fetchVehicleChecklist({ setIsLoading: listShowLoadingVehicleChecklist, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, buttonType]);

    useEffect(() => {
        setFormData([]);
        setSelectedTreeKey([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonType]);

    useEffect(() => {
        let obj = {
            attributeLevel: null,
            parentCode: null,
            code: null,
            descriptionTitle: null,
            status: true,
            id: null,
            attachmentRequired: null,
            answerType: null,
        };
        if (formActionType === FROM_ACTION_TYPE?.CHILD) {
            form.setFieldsValue(obj);
            setSelectedTreeSelectKey(formData?.code);
            setModelData([]);
            setAnswerData([]);
            answerForm.resetFields();
            modelForm.resetFields();
            setAnswerType(null);

            if (attributeType === VEHICLE_CHECKLIST_TYPE?.GROUP?.key) {
                form.setFieldsValue({ attributeLevel: VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key, parentCode: formData?.code });
                setAttributeType(VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key);
            } else if (attributeType === VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key) {
                form.setFieldsValue({ attributeLevel: VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key, parentCode: formData?.code });
                setAttributeType(VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key);
            } else if (attributeType === VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key) {
                form.setFieldsValue({ attributeLevel: VEHICLE_CHECKLIST_TYPE?.ANSWER?.key, parentCode: formData?.code });
                setAttributeType(VEHICLE_CHECKLIST_TYPE?.ANSWER?.key);
            }
        } else if (formActionType === FROM_ACTION_TYPE?.SIBLING) {
            setModelData([]);
            setAnswerData([]);
            setAnswerType(null);
            let treeKey = flatternData?.find((e) => e?.key === formData?.id)?.data?.parentCode;
            treeKey = treeKey === CHECKLIST_TYPE?.VRC?.key || treeKey === CHECKLIST_TYPE?.VDC?.key ? 'DMS' : treeKey;
            setSelectedTreeSelectKey(treeKey);
            form.setFieldsValue({ ...obj, attributeLevel: attributeType, parentCode: treeKey });
        } else if (formActionType === FROM_ACTION_TYPE?.VIEW) {
            setModelData(formData?.model?.length > 0 ? [...formData?.model] : []);
            setAnswerData(formData?.answer?.length > 0 ? [...formData?.answer] : []);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType, handleButtonClickChange]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const onChangeAnswerType = (val) => {
        setAnswerType(val);
        answerForm.resetFields();
    };

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { [fieldNames?.key]: key } = node;
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

    const flatternData = generateList(VehicleChecklistMasterList);
    const handleTreeViewClick = (keys) => {
        form.resetFields();
        setFormData([]);
        setAnswerData([]);
        setModelData([]);

        if (keys && keys?.length > 0) {
            setFormActionType(FROM_ACTION_TYPE.VIEW);
            const formData = flatternData.find((i) => keys?.[0] === i?.key);

            if (formData) {
                setAttributeType(formData?.data?.attributeLevel);
                let isChild = formData?.data?.attributeLevel === VEHICLE_CHECKLIST_TYPE?.GROUP?.key || formData?.data?.attributeLevel === VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key ? true : false;
                let isSibling = formData?.data?.attributeLevel !== VEHICLE_CHECKLIST_TYPE?.ANSWER?.key;

                setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: isChild, siblingBtn: isSibling });

                const attributeName = VehicleChecklistAttributeLov?.find((e) => e?.key === formData?.data?.attributeLevel)?.value;
                const attributeParentName = flatternData.find((i) => formData?.data?.parentCode === i?.data?.code)?.data?.descriptionTitle;
                const answerTypeName = formData?.data?.attributeLevel === VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key ? typeData?.CHKL_ANS_TYPE?.find((e) => e?.key === formData?.data?.answerType)?.value : null;
                const attachmentRequiredName = formData?.data?.attributeLevel === VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key ? typeData?.ATT_TYPE?.find((e) => e?.key === formData?.data?.attachmentRequired)?.value : null;
                setFormData({ ...formData?.data, parentName: attributeParentName, attributeName, answerTypeName, attachmentRequiredName });
                setModelData(formData?.data?.model?.length > 0 ? [...formData?.data?.model] : []);
                setAnswerData(formData?.data?.answer?.length > 0 ? [...formData?.data?.answer] : []);
            } else {
                setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            }
        }

        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        if (value === selectedTreeKey[0]) {
            return showGlobalNotification({ notificationType: 'warning', title: sameParentAndChildWarning?.TITLE, message: sameParentAndChildWarning?.MESSAGE, placement: 'bottomRight' });
        }
        setSelectedTreeSelectKey(value);
        setFormBtnActive(true);
    };

    const onFinish = (values) => {
        let parentCode = values?.parentCode === `DMS` ? buttonType : values?.parentCode;
        let parentId = flatternData?.find((e) => e?.data?.code === values?.parentCode)?.data?.id;
        let data = {};
        let updatedData = { ...values, id: values?.id || '', parentCode, parentId };

        if (values?.attributeLevel === VEHICLE_CHECKLIST_TYPE?.GROUP?.key) {
            data = {
                attributeLevel: values?.attributeLevel,
                groupDto: {
                    ...updatedData,
                    parentId: '',
                },
            };
        } else if (values?.attributeLevel === VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key) {
            data = {
                attributeLevel: values?.attributeLevel,
                subGroupDto: {
                    parentId: parentId,
                    children: [
                        {
                            ...updatedData,
                        },
                    ],
                },
            };
        } else if (values?.attributeLevel === VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key) {
            if (modelData?.length <= 0) {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Please add atleast one model' });
            }
            if (answerType === ANSWER_TYPES?.Fixed?.key && answerData?.length <= 0) {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Please add atleast one answer' });
            }
            data = {
                attributeLevel: values?.attributeLevel,
                checklistDto: {
                    parentId: parentId,
                    children: [
                        {
                            ...updatedData,
                            model: modelData,
                            answer: answerData,
                        },
                    ],
                },
            };
        }

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchVehicleChecklist({ setIsLoading: listShowLoadingVehicleChecklist, userId, extraParams });

                const attributeName = VehicleChecklistAttributeLov?.find((e) => e?.key === res?.data?.attributeLevel)?.value;

                if (res?.data?.attributeLevel === VEHICLE_CHECKLIST_TYPE?.GROUP?.key) {
                    const attributeParentName = flatternData.find((i) => res?.data?.groupDto?.parentCode === i?.data?.code)?.data?.descriptionTitle;
                    setFormData({ ...res?.data?.groupDto, parentName: attributeParentName, attributeName });
                    setSelectedTreeKey([res?.data?.groupDto?.id]);
                } else if (res?.data?.attributeLevel === VEHICLE_CHECKLIST_TYPE?.SUB_GROUP?.key) {
                    const attributeParentName = flatternData.find((i) => res?.data?.subGroupDto?.children?.[0]?.parentCode === i?.data?.code)?.data?.descriptionTitle;
                    setFormData({ ...res?.data?.subGroupDto?.children?.[0], parentName: attributeParentName, attributeName });
                    setSelectedTreeKey([res?.data?.subGroupDto?.children?.[0]?.id]);
                } else if (res?.data?.attributeLevel === VEHICLE_CHECKLIST_TYPE?.CHECKLIST?.key) {
                    const attributeParentName = flatternData.find((i) => res?.data?.checklistDto?.children?.[0]?.parentCode === i?.data?.code)?.data?.descriptionTitle;
                    const answerTypeName = typeData?.CHKL_ANS_TYPE?.find((e) => e?.key === res?.data?.checklistDto?.children?.[0]?.answerType)?.value;
                    const attachmentRequiredName = typeData?.ATT_TYPE?.find((e) => e?.key === res?.data?.checklistDto?.children?.[0]?.attachmentRequired)?.value;
                    setFormData({ ...res?.data?.checklistDto?.children?.[0], parentName: attributeParentName, attributeName, answerTypeName, attachmentRequiredName });
                    setModelData(res?.data?.checklistDto?.children?.[0]?.model?.length > 0 ? [...res?.data?.checklistDto?.children?.[0]?.model] : []);
                    setAnswerData(res?.data?.checklistDto?.children?.[0]?.answer?.length > 0 ? [...res?.data?.checklistDto?.children?.[0]?.model] : []);
                    setSelectedTreeKey([res?.data?.checklistDto?.children?.[0]?.id]);
                }
                setFormActionType(FROM_ACTION_TYPE.VIEW);
                setFormBtnActive(false);
                setIsFormVisible(false);
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType === FROM_ACTION_TYPE?.EDIT ? 'put' : 'post',
            setIsLoading: listShowLoadingVehicleChecklist,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const handleResetBtn = () => {
        form.resetFields();
    };
    const handleAdd = () => {
        setFormBtnActive(false);
        setIsFormVisible(true);
        setIsAddBtnClicked(() => !isAddBtnClicked);
    };

    const handleButtonClick = (type) => {
        if (type === FROM_ACTION_TYPE.EDIT) {
            const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            let attributeName = VehicleChecklistAttributeLov?.find((e) => e?.key === formData?.data?.attributeLevel)?.value;
            let parentName = flatternData.find((i) => formData?.data?.parentCode === i?.data?.code)?.data?.descriptionTitle;
            formData && setFormData({ ...formData?.data, attributeName, parentName });
            form.setFieldsValue({
                id: formData?.data?.id,
                attributeLevel: formData?.data?.attributeLevel,
                parentCode: formData?.data?.parentCode === CHECKLIST_TYPE?.VRC.key || formData?.data?.parentCode === CHECKLIST_TYPE?.VDC?.key ? 'DMS' : formData?.data?.parentCode,
                code: formData?.data?.code,
                descriptionTitle: formData?.data?.descriptionTitle,
                status: formData?.data?.status,
                attachmentRequired: formData?.data?.attachmentRequired,
                answerType: formData?.data?.answerType,
            });
            setSelectedTreeSelectKey(formData?.data?.parentCode === CHECKLIST_TYPE?.VRC.key || formData?.data?.parentCode === CHECKLIST_TYPE?.VDC?.key ? 'DMS' : formData?.data?.parentCode);
            formData?.data?.answer?.length > 0 ? setAnswerType(ANSWER_TYPES?.Fixed?.key) : setAnswerType(null);
        }
        setIsFormVisible(true);
        setFormBtnActive(false);
        setFormActionType(type);
        setHandleButtonClickChange(() => !handleButtonClickChange);
    };

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: VehicleChecklistMasterList,
        searchValue,
        setSearchValue,
    };
    const formProps = {
        typeData,
        setSelectedTreeKey,
        flatternData,
        formActionType,
        isVisible: isFormVisible,
        onCloseAction: () => {
            setIsFormVisible(false);
            setAttributeType(formData?.attributeLevel);
            setFormActionType(FROM_ACTION_TYPE?.VIEW);
        },
        titleOverride: (formActionType === FROM_ACTION_TYPE?.EDIT ? `Edit ` : `Add `).concat(moduleTitle),
        onFinish,
        selectedTreeSelectKey,
        handleResetBtn,
        formData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        fieldNames,
        setSelectedTreeSelectKey,
        isFormBtnActive,
        setFormBtnActive,
        attributeType,
        setAttributeType,
        VehicleChecklistMasterList,
        VehicleChecklistAttributeLov,
        form,
        answerType,
        setAnswerType,
        onChangeAnswerType,
        modelGroupData,
        answerData,
        setAnswerData,
        answerForm,
        setButtonData,
        formEdit,
        setFormEdit,
        editForm,
        modelEditForm,
        modelForm,
        modelData,
        setModelData,
        modelEdit,
        setModelEdit,
        listShowLoadingVehicleChecklist,
    };

    const viewProps = {
        typeData,
        buttonData,
        handleButtonClick,
        styles,
        viewTitle,
        formData,
        attributeType,
        modelData,
        answerData,
        modelGroupData,
        formActionType,
        setFormBtnActive,
    };

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

    const leftCol = VehicleChecklistMasterList?.length > 0 ? 14 : 24;
    const rightCol = VehicleChecklistMasterList?.length > 0 ? 10 : 24;

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Form autoComplete="off" form={searchForm} colon={false} className={styles.masterListSearchForm}>
                            <Form.Item name="normalSearch">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={20} lg={20} xl={20} className={styles.verticallyCentered}>
                                        <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                            {typeData?.CHKLST_TYPE?.map((item) => {
                                                return (
                                                    <Button type={buttonType === item?.key ? 'primary' : 'link'} onClick={() => setButtonType(item?.key)}>
                                                        {item?.value}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                        <div className={styles.fullWidth}>
                                            <Search placeholder="Search" onChange={onChange} allowClear className={styles.headerSearchField} />
                                        </div>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    {VehicleChecklistMasterList?.length <= 0 ? (
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
                                <Button icon={<PlusOutlined />} type="primary" danger onClick={handleAdd}>
                                    Add
                                </Button>
                            </Empty>
                        </div>
                    ) : (
                        <LeftPanel {...myProps} />
                    )}
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol}>
                    {Object.keys(formData)?.length > 0 ? (
                        <>
                            <ViewTaxCharges {...viewProps} />
                            <div className={styles.viewContainerFooter}>
                                <HierarchyFormButton {...viewProps} />
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyContainer}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        Please select Tax and Charges from left <br />
                                        side hierarchy to view “Details”
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

export const VehicleChecklistMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleChecklistMain);
