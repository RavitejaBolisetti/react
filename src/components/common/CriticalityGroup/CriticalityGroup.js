import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Col, Input, Form, Row } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';

import { showGlobalNotification } from 'store/actions/notification';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { generateRandomNumber } from 'utils/generateRandomNumber';
import { filterFunction } from 'utils/filterFunction';
import { ListDataTable } from 'utils/ListDataTable';
import { tableColumn } from './tableColumn';

import { criticalityDataActions } from 'store/actions/data/criticalityGroup';
import { AddEditForm } from './AddEditForm';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CriticalityGroup: { isLoaded: isDataLoaded = false, isLoading, data: criticalityGroupData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Application Criticality Group';

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        moduleTitle,
        isLoading,
        criticalityGroupData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: criticalityDataActions.fetchList,
            saveData: criticalityDataActions.saveData,
            listShowLoading: criticalityDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const CriticalityGroupMain = (props) => {
    const { moduleTitle, fetchList, saveData, listShowLoading, isLoading, userId, criticalityGroupData, isDataLoaded, showGlobalNotification } = props;

    const [form] = Form.useForm();

    const [refershData, setRefershData] = useState(false);
    const [formData, setFormData] = useState({});
    const [forceFormReset, setForceFormReset] = useState(false);
    const [searchData, setSearchdata] = useState(criticalityGroupData);

    const [filterString, setFilterString] = useState();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [page, setPage] = useState(1);

    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [timeData, setTimeData] = useState([]);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const errorAction = (message) => {
        showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    useEffect(() => {
        if (isDataLoaded && criticalityGroupData) {
            if (filterString) {
                const filterDataItem = criticalityGroupData?.filter((item) => filterFunction(filterString)(item?.criticalityGroupCode) || filterFunction(filterString)(item?.criticalityGroupName));
                setSearchdata(filterDataItem);
            } else {
                setSearchdata(criticalityGroupData);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, criticalityGroupData]);

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, errorAction, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refershData, userId]);

    const onFinish = (values) => {
        const modifiedTimeData = timeData?.map((element) => {
            return { id: element?.id || '', isDeleted: 'N', timeSlotFrom: element?.timeSlotFrom, timeSlotTo: element?.timeSlotTo };
        });

        const recordId = formData?.id || '';
        const data = { ...values, id: recordId, allowedTimings: modifiedTimeData || [] };

        const onSuccess = (res) => {
            setShowDataLoading(true);
            form.resetFields();
            setForceFormReset(generateRandomNumber());
            setTimeData([]);
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }
        };

        setTimeout(() => {
            fetchList({ setIsLoading: listShowLoading, userId });
        }, 2000);

        const onError = (message) => {
            showGlobalNotification({ message, placement: 'bottomRight' });
        };

        const requestData = {
            data: [data],
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

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const onSearchHandle = (value) => {
        setFilterString(value);
    };

    const onChangeHandle = (e) => {
        setFilterString(e.target.value);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        if (buttonAction === 'view' || buttonAction === 'edit') {
            const momentTime = record?.allowedTimings?.map((i) => {
                return {
                    id: i?.id,
                    timeSlotFrom: i.timeSlotFrom,
                    timeSlotTo: i.timeSlotTo,
                };
            });
            setTimeData(momentTime);
        }

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: true, cancelBtn: true });

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const tableProps = {
        isLoading,
        tableData: searchData,
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        setPage,
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setTimeData([]);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const formProps = {
        form,
        isVisible: isFormVisible,
        showGlobalNotification,
        onFinish,
        onFinishFailed,

        onCloseAction,
        titleOverride: (formActionType?.viewMode ? 'View ' : formActionType?.editMode ? 'Edit ' : 'Add ').concat(moduleTitle),
        formData,
        setIsFormVisible,
        formActionType,
        setFormData,
        isLoading,
        forceUpdate,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        handleButtonClick,
        buttonData,
        setButtonData,
        defaultBtnVisiblity,

        timeData,
        setTimeData,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.lineHeight33}>
                                        Criticality Group List
                                    </Col>
                                    <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                        <Search placeholder="Search" allowClear onSearch={onSearchHandle} onChange={onChangeHandle} className={styles.headerSearchField} />
                                    </Col>
                                </Row>
                            </Col>

                            {criticalityGroupData?.length && (
                                <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Button className={styles.refreshBtn} aria-label="fa-ref" onClick={handleReferesh} danger>
                                        <TfiReload />
                                    </Button>
                                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                        Add Group
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} addTitle={'Group'} {...tableProps} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const CriticalityGroup = connect(mapStateToProps, mapDispatchToProps)(CriticalityGroupMain);
