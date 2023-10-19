/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { TfiReload } from 'react-icons/tfi';
import { PlusOutlined } from '@ant-design/icons';

import { Button, Col, Form, Row, Select, Input } from 'antd';
import { generateRandomNumber } from 'utils/generateRandomNumber';

import styles from 'assets/sass/app.module.scss';

import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { escapeRegExp } from 'utils/escapeRegExp';
import { ListDataTable } from 'utils/ListDataTable';
import { btnVisiblity } from 'utils/btnVisiblity';

import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

const { Option } = Select;
const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [], isDetailLoaded, detailData = [], isDataLoading, isLoadingOnSave },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Hierarchy Attribute Master';

    let returnValue = {
        collapsed,
        userId,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
        isDetailLoaded,
        detailData,
        moduleTitle,
        isDataLoading,
        isLoadingOnSave,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeFetchDetailList: hierarchyAttributeMasterDataActions.fetchDetail,
            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,
            resetData: hierarchyAttributeMasterDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const HierarchyAttributeBase = ({ moduleTitle, userId, resetData, isDataLoaded, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData, hierarchyAttributeFetchDetailList, detailData, showGlobalNotification, isDataLoading, isLoadingOnSave }) => {
    const [form] = Form.useForm();
    const [editRow, setEditRow] = useState({});
    const [searchData, setSearchdata] = useState('');
    const [selectedHierarchy, setSelectedHierarchy] = useState('');
    const [RefershData, setRefershData] = useState(false);

    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [filterString, setFilterString] = useState('');

    const [codeIsReadOnly, setcodeIsReadOnly] = useState(false);
    const [isViewModeVisible, setIsViewModeVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showDataLoading, setShowDataLoading] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        setShowDataLoading(false);
        RefershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };
    const title = 'Hierarchy Attribute';
    useEffect(() => {
        if (userId) {
            if (!isDataLoaded) {
                hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: '', onSuccessAction, onErrorAction });
                forceUpdate(generateRandomNumber());
            }
            if (detailData?.hierarchyAttribute) {
                forceUpdate(generateRandomNumber());
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded, userId]);

    useEffect(() => {
        if (userId) {
            if (!selectedHierarchy) {
                setSearchdata([]);
            } else if (detailData?.hierarchyAttribute) {
                if (filterString) {
                    const filterDataItem = detailData?.hierarchyAttribute?.filter((item) => filterFunction(filterString)(item?.hierarchyAttribueCode) || filterFunction(filterString)(item?.hierarchyAttribueName));
                    setSearchdata(filterDataItem);
                } else {
                    setSearchdata(detailData?.hierarchyAttribute);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, detailData?.hierarchyAttribute, selectedHierarchy]);

    useEffect(() => {
        form.resetFields();
        setEditRow({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceUpdate]);

    useEffect(() => {
        if (!selectedHierarchy || !RefershData) return;
        setRefershData((prev) => !prev);
        setShowDataLoading(true);
        hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: selectedHierarchy, onSuccessAction, onErrorAction });

        if (filterString) {
            const filterDataItem = detailData?.hierarchyAttribute?.filter((item) => filterFunction(filterString)(item?.hierarchyAttribueCode) || filterFunction(filterString)(item?.hierarchyAttribueName));
            setSearchdata(filterDataItem);
        } else {
            setSearchdata(detailData?.hierarchyAttribute);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceUpdate, RefershData]);

    const handleEditView = () => {
        setFormActionType('edit');
        setIsReadOnly(false);
        setIsViewModeVisible(false);
        setFormBtnDisable(false);
        setcodeIsReadOnly(true);
        setIsFormVisible(true);
    };

    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

    const filterFunction = (filterString) => (title) => {
        return title && title.match(new RegExp(escapeRegExp(filterString), 'i'));
    };
    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        setIsFormVisible(true);
        setEditRow(record);

        setFormBtnDisable(false);
        setIsViewModeVisible(false);

        if (buttonAction === 'view') {
            setIsReadOnly(true);
            setIsViewModeVisible(true);
        }
        setcodeIsReadOnly(true);
    };

    const handleReferesh = () => {
        setRefershData(!RefershData);
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };
    const onChangeHandle = () => {
        setFilterString('');
    };

    const onFinish = (values) => {
        form.validateFields();

        const onSuccess = (res) => {
            form.resetFields();
            setFormBtnDisable(false);
            setShowDataLoading(true);

            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                setButtonData({ saveBtn: true, saveAndNewBtn: true, cancelBtn: true });
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }

            forceUpdate();
        };

        setTimeout(() => {
            hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: selectedHierarchy, onSuccessAction, onErrorAction });
        }, 1000);

        const onError = (message) => {
            showGlobalNotification({ message, placement: 'bottomRight' });
        };

        hierarchyAttributeSaveData({ data: [{ ...values, id: values?.id || '', hierarchyAttribueType: selectedHierarchy }], setIsLoading: hierarchyAttributeListShowLoading, userId, onError, onSuccess });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {}).catch(err => console.error(err));
    };

    const handleChange = (attributeType) => {
        setShowDataLoading(true);
        hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: attributeType, onSuccessAction, onErrorAction });
        setSelectedHierarchy(attributeType);
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: searchData,

        noDataMessage:
            selectedHierarchy && !detailData?.hierarchyAttribute?.length ? (
                <span className={styles.descriptionText}>
                    No records found. Please add new parameter <br />
                    using below button
                </span>
            ) : !selectedHierarchy ? (
                <span className={styles.descriptionText}>Please select hierarchy type to view records.</span>
            ) : (
                <span className={styles.descriptionText}>
                    No records found. Please add new parameter <br />
                    using below button
                </span>
            ),
        showAddButton: selectedHierarchy ? true : false,
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const formProps = {
        isVisible: isFormVisible,
        isViewModeVisible,
        codeIsReadOnly,
        tableData: detailData?.hierarchyAttribute,
        onCloseAction,
        titleOverride: (isViewModeVisible ? 'View ' : editRow?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        selectedHierarchy,
        onFinishFailed,
        onFinish,
        setEditRow,
        editRow,
        formActionType,
        handleEditView,
        isReadOnly,
        setIsReadOnly,
        setFormBtnDisable,
        formBtnDisable,
        isLoadingOnSave,
        setFormActionType,
        buttonData,
        setButtonData,
        handleButtonClick,
        form,
    };

    const titleHierarchy = 'Hierarchy Attribute Type';

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Form.Item label={`${titleHierarchy}`} name="code">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                        <Select showSearch onChange={handleChange} loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                            {attributeData?.map((item) => (
                                                <Option value={item}>{item}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    {detailData?.hierarchyAttribute?.length > 0 && (
                                        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                            <Search placeholder="Search" className={styles.headerSearchField} allowClear onChange={onChangeHandle} onSearch={onSearchHandle} />
                                        </Col>
                                    )}
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                    {detailData?.hierarchyAttribute?.length > 0 && (
                        <Col className={styles.buttonsGroupRight} xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                            <Button icon={<TfiReload />} onClick={handleReferesh} danger data-testid="refreshBtn" />
                            <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
                                Add
                            </Button>
                        </Col>
                    )}
                </Row>
            </div>

            <ListDataTable isLoading={showDataLoading} {...tableProps} handleAdd={handleAdd} addTitle={title} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeBase);
