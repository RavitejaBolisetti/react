import React, { useState, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Input, Modal, Form, Row, Space, Switch, Table, Empty, Select, notification, Alert, ConfigProvider } from 'antd';
import { TfiReload } from 'react-icons/tfi';

import { FaEdit } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineEye, AiFillCheckCircle } from 'react-icons/ai';
import { ExclamationCircleFilled } from '@ant-design/icons';

import styles from 'pages/common/Common.module.css';
import style from './criticatiltyGroup.module.css';

import { criticalityDataActions } from 'store/actions/data/criticalityGroup';
import { tblPrepareColumns } from 'utils/tableCloumn';
import DrawerUtil from './DrawerUtil';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

import dayjs from 'dayjs';
import { BsTruckFlatbed } from 'react-icons/bs';
import { DataTable } from 'utils/dataTable';
import { EditIcon, ViewEyeIcon } from 'Icons';
import moment from 'moment';

const { Option } = Select;
const { confirm } = Modal;
const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            criticalityGroup: { isLoaded: isDataLoaded = false, data: criticalityGroupData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        criticalityGroupData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchData: criticalityDataActions.fetchData,
            saveData: criticalityDataActions.saveData,
            listShowLoading: criticalityDataActions.listShowLoading,
        },
        dispatch
    ),
});

export const CriticalityGroupMain = ({ fetchData, saveData, listShowLoading, userId, criticalityGroupData, isDataLoaded }) => {
    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [RefershData, setRefershData] = useState(false);
    const [data, setData] = useState(criticalityGroupData);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(data.status === 'Y' ? true : false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [drawerTitle, setDrawerTitle] = useState('');
    const [form] = Form.useForm();
    const [arrData, setArrData] = useState(data);
    const [searchData, setSearchdata] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [saveAndSaveNew, setSaveAndSaveNew] = useState(false);
    const [footerEdit, setFooterEdit] = useState(false);
    const [saveBtn, setSaveBtn] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [saveclick, setsaveclick] = useState();
    const [saveandnewclick, setsaveandnewclick] = useState();

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded) {
            fetchData({ setIsLoading: listShowLoading, userId });
            // console.log(criticalityGroupData, 'critiality grpopu dtaa');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
    useEffect(() => {
        setSearchdata(criticalityGroupData);
    }, [criticalityGroupData]);

    useEffect(() => {
        fetchData({ setIsLoading: listShowLoading, userId });
        setSearchdata(criticalityGroupData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [RefershData]);

    const onFinish = (values) => {
        console.log('SUBMIT', values);

        const formatedTime = values?.allowedTimingResponse?.map((time) => {
            return {
                timeSlotFrom: time?.timeSlotFrom?.format('HH:mm'),
                timeSlotTo: time?.timeSlotTo?.format('HH:mm'),
            };
        });

        // const overlapping = (a, b) => {
        //     const getMinutes = (s) => {
        //         const p = s.split(':').map(Number);
        //         return p[0] * 60 + p[1];
        //     };
        //     return getMinutes(a.endTime) > getMinutes(b.startTime) && getMinutes(b.endTime) > getMinutes(a.startTime);
        // };
        // const isOverlapping = (arr) => {
        //     let i, j;
        //     for (i = 0; i < arr.length - 1; i++) {
        //         for (j = i + 1; j < arr.length; j++) {
        //             if (overlapping(arr[i], arr[j])) {
        //                 return true;
        //             }
        //         }
        //     }
        //     return false;
        // };
        // console.log(isOverlapping(arr));
        // if (isOverlapping(arr) === true) {
        //     alert('Your timings are overlapping please check again and try');
        // } else {
        //     console.log('ohhho');
        //     const recordId = formData?.id || '';
        //     setForceFormReset(Math.random() * 10000);
        // console.log(arr);

        const recordId = selectedRecord?.id || '';
        const data = { ...values, id: recordId, activeIndicator: values.activeIndicator ? 1 : 0, criticalityDefaultGroup: values.criticalityDefaultGroup ? '1' : '0', allowedTimingRequest: formatedTime || [] };
        console.log('🚀 ~ file: CriticalityGroup.js:141 ~ onFinish ~ recordId:', recordId);
        delete data?.allowedTimingResponse;

        const onSuccess = (res) => {
            form.resetFields();
            setSuccessAlert(true);
            fetchData({ setIsLoading: listShowLoading, userId });
            if (saveclick === true) {
                setDrawer(false);
            } else {
                setDrawer(true);
            }
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

    const openNotification = ({ NotificationTitle, NotificationDescription, placement, duration }) => {
        notification.open({
            message: (
                <div className="NotificationMessageAlign">
                    <AiFillCheckCircle />
                    {NotificationTitle}
                </div>
            ),
            description: NotificationDescription,
            placement: placement,
            duration: duration,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleAdd = () => {
        setFormActionType('add');
        setSaveAndSaveNew(true);
        setSaveBtn(true);
        setFooterEdit(false);
        // form.resetFields();
        setDrawer(true);
        setIsReadOnly(false);
        setsaveclick(false);
        setsaveandnewclick(true);
    };

    const handleUpdate = (record) => {
        // setForceFormReset(Math.random() * 10000);
        setFormActionType('update');
        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);
        console.log(selectedRecord, 'edit');
        const momentTime = record?.allowedTimingResponse?.map((i) => {
            console.log('allo', record?.allowedTimingResponse, 'aslasl', i.timeSlotFrom);
            return {
                timeSlotFrom: moment(i.timeSlotFrom, 'HH:mm'),
                timeSlotTo: moment(i.timeSlotTo, 'HH:mm'),
            };
        });
        console.log(momentTime, 'moment');
        setFormData(record);
        // setSelectedRecord(record);

        form.setFieldsValue({
            criticalityGroupCode: record.criticalityGroupCode,
            criticalityGroupName: record.criticalityGroupName,
            criticalityDefaultGroup: record.criticalityDefaultGroup,
            activeIndicator: record.activeIndicator,
            allowedTimingResponse: momentTime,
        });

        console.log(selectedRecord);

        console.log(formData, 'formData');
        setDrawer(true);
        setIsReadOnly(false);
        // forceUpdate();

        // formData && setFormData(formData?.data);
    };

    const handleUpdate2 = () => {
        // setForceFormReset(Math.random() * 10000);
        setFormActionType('update');

        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);
        console.log(selectedRecord, 'edit');
        const momentTime = selectedRecord?.allowedTimingResponse?.map((i) => {
            console.log('allo', selectedRecord?.allowedTimingResponse, 'aslasl', i.timeSlotFrom);
            return {
                timeSlotFrom: moment(i.timeSlotFrom, 'HH:mm'),
                timeSlotTo: moment(i.timeSlotTo, 'HH:mm'),
            };
        });

        form.setFieldsValue({
            criticalityGroupCode: selectedRecord.criticalityGroupCode,
            criticalityGroupName: selectedRecord.criticalityGroupName,
            criticalityDefaultGroup: selectedRecord.criticalityDefaultGroup,
            activeIndicator: selectedRecord.activeIndicator,
            allowedTimingRequest: momentTime,
        });
        setsaveclick(true);
        // setDrawer(true);
        setIsReadOnly(false);
        // forceUpdate();

        // formData && setFormData(formData?.data);
    };

    const handleView = (record) => {
        setFormActionType('view');
        console.log('view', record);
        // setFormData(record);
        setSelectedRecord(record);
        setSaveAndSaveNew(false);
        setFooterEdit(true);
        setSaveBtn(false);
        const momentTime = record?.allowedTimingResponse?.map((i) => {
            return {
                timeSlotFrom: moment(i.timeSlotFrom, 'HH:mm'),
                timeSlotTo: moment(i.timeSlotTo, 'HH:mm'),
            };
        });
        form.setFieldsValue({
            criticalityGroupCode: record.criticalityGroupCode,
            criticalityGroupName: record.criticalityGroupName,
            criticalityDefaultGroup: record.criticalityDefaultGroup,
            activeIndicator: record.activeIndicator,
            allowedTimingResponse: momentTime,
        });
        setDrawer(true);
        setIsReadOnly(true);
        // formData && setFormData(formData?.data);
    };
    const handleReferesh = () => {
        setRefershData(!RefershData);
    };
    const onChangeHandle = (e) => {
        const newdata = [];
        Object.keys(criticalityGroupData).map((keyname, i) => {
            if (criticalityGroupData[keyname].critcltyGropCode === e) {
                newdata.push(criticalityGroupData[keyname]);
                // setSearchdata(qualificationData[keyname])
            } else if (criticalityGroupData[keyname].critcltyGropDesc === e) {
                newdata.push(criticalityGroupData[keyname]);
                // setSearchdata(qualificationData[keyname])
            }
        });

        if (e === '') {
            setSearchdata(criticalityGroupData);
        } else {
            setSearchdata(newdata);
        }
        //  record.qualificationCode.includes(value)
    };
    const onChangeHandle2 = (e) => {
        const getSearch = e.target.value;
        if (e.target.value === '') {
            const tempArr = criticalityGroupData;
            setSearchdata(tempArr);
            return;
        }
        if (getSearch.length > -1) {
            const searchResult = criticalityGroupData.filter((record) => record.criticalityGroupCode.toLowerCase().startsWith(e.target.value.toLowerCase()) || record.criticalityGroupName.toLowerCase().startsWith(e.target.value.toLowerCase()));
            setSearchdata(searchResult);
        }
        console.log(e.target.value);
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'Srl',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group ID',
            dataIndex: 'criticalityGroupCode',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group Name',
            dataIndex: 'criticalityGroupName',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Default Group',
            dataIndex: 'criticalityDefaultGroup',
            render: (text, record) => <>{text === '1' ? <div className={style.activeInactiveText}>Active</div> : <div className={style.activeInactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (text, record) => <>{text === '1' ? <div className={style.activeInactiveText}>Active</div> : <div className={style.activeInactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Actions',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space style={{ display: 'flex' }}>
                        {
                            <Button style={{ border: 'none' }} danger ghost aria-label="fa-edit" onClick={() => handleUpdate(record)}>
                                <EditIcon />
                            </Button>
                        }
                        {
                            <Button style={{ marginLeft: '-10px', border: 'none' }} danger ghost aria-label="ai-view" onClick={() => handleView(record)}>
                                <ViewEyeIcon />
                            </Button>
                        }
                    </Space>
                );
            },
        })
    );

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Row gutter={20}>
                                    <div className={style.searchAndLabelAlign}>
                                        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                            Criticality Group List
                                        </Col>
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                    marginLeft: -40,
                                                    paddingBottom: '5px',
                                                }}
                                                allowClear
                                                onSearch={onChangeHandle}
                                                onChange={onChangeHandle2}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Col>
                            {searchData?.length ? (
                                <Col className={styles.addGroup} xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Button className="button" onClick={handleReferesh} danger ghost>
                                        <TfiReload />
                                    </Button>

                                    <Button type="primary" danger onClick={handleAdd}>
                                        <AiOutlinePlus className={styles.buttonIcon} />
                                        Add Group
                                    </Button>
                                </Col>
                            ) : (
                                ''
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>

            <DrawerUtil
                setFormBtnDisable={setFormBtnDisable}
                formBtnDisable={formBtnDisable}
                successAlert={successAlert}
                handleUpdate2={handleUpdate2}
                form={form}
                saveBtn={saveBtn}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                footerEdit={footerEdit}
                handleUpdate={handleUpdate}
                saveAndSaveNew={saveAndSaveNew}
                setSaveAndSaveNew={setSaveAndSaveNew}
                setSelectedRecord={setSelectedRecord}
                selectedRecord={selectedRecord}
                handleAdd={handleAdd}
                open={drawer}
                data={data}
                setDrawer={setDrawer}
                isChecked={isChecked}
                formData={formData}
                setIsChecked={setIsChecked}
                formActionType={formActionType}
                isReadOnly={isReadOnly}
                setFormData={setFormData}
                drawerTitle={drawerTitle}
                saveclick={saveclick}
                setsaveclick={setsaveclick}
                setsaveandnewclick={setsaveandnewclick}
                saveandnewclick={saveandnewclick}
            />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ConfigProvider
                        renderEmpty={() => (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        No records found. Please add new parameter <br />
                                        using below button
                                    </span>
                                }
                            >
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Button type="primary" danger onClick={handleAdd}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <AiOutlinePlus />
                                                Add Group
                                            </div>
                                        </Button>
                                    </Col>
                                </Row>
                            </Empty>
                        )}
                    >
                        <DataTable tableData={searchData} tableColumn={tableColumn} />
                    </ConfigProvider>
                </Col>
            </Row>
        </>
    );
};

export const CriticalityGroup = connect(mapStateToProps, mapDispatchToProps)(CriticalityGroupMain);
