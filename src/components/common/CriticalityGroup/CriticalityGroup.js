import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Col, Input, Modal, Form, Row, Space, Empty, notification, ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { EditIcon, ViewEyeIcon } from 'Icons';

import moment from 'moment';

import { criticalityDataActions } from 'store/actions/data/criticalityGroup';
import { tblPrepareColumns } from 'utils/tableCloumn';
import DrawerUtil from './DrawerUtil';
import { DataTable } from 'utils/dataTable';

import styles from 'pages/common/Common.module.css';
import style from './criticatiltyGroup.module.css';

const { Search } = Input;

const informationMessage = {
    deleteGrpTiming: 'Group timing has been deleted successfully',
    createGroupTitleOnSaveNew: 'group created Successfully. Continue Creating More Groups',
    updateGroup: 'Your group has been updated. Refresh to get the latest result',
    createGroup: 'Your group has been Created. Refresh to get the latest result',
    success: 'Group Created Successfully',
    updated: 'Group Updated',
};

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
    const [forceFormReset, setForceFormReset] = useState(false);
    const [drawerTitle, setDrawerTitle] = useState('');
    const [form] = Form.useForm();
    const [searchData, setSearchdata] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [saveAndSaveNew, setSaveAndSaveNew] = useState(false);
    const [footerEdit, setFooterEdit] = useState(false);
    const [saveBtn, setSaveBtn] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [formBtnDisable, setFormBtnDisable] = useState(false);
    const [saveclick, setsaveclick] = useState();
    const [saveandnewclick, setsaveandnewclick] = useState();
    const [deletedItemList, setDeletedItemList] = useState([]);
    const [alertNotification, contextAlertNotification] = notification.useNotification();

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded) {
            fetchData({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        setSearchdata(criticalityGroupData?.map((el, i) => ({ ...el, srl: i + 1 })));
    }, [criticalityGroupData]);

    useEffect(() => {
        fetchData({ setIsLoading: listShowLoading, userId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [RefershData]);

    const informationModalBox = ({ icon = 'error', message = 'Information', description, className, placement }) => {
        alertNotification.open({
            icon: icon === 'error' ? <AiOutlineCloseCircle /> : <AiOutlineCheckCircle />,
            message,
            description,
            className,
            placement,
        });
    };

    const onFinish = (values) => {
        const finalAllowedTimingList = deletedItemList ? [...deletedItemList, ...values?.allowedTimings] : values?.allowedTimings;
        
        const formatedTime = finalAllowedTimingList?.map((time) => {
            return {
                id: time?.id || '',
                timeSlotFrom: time?.timeSlotFrom?.format('HH:mm'),
                timeSlotTo: time?.timeSlotTo?.format('HH:mm'),
                isDeleted: time?.isDeleted,
            };
        });

        //code for overlapping check on save
        const timeInMinutes = (time) => {
            const [hours, minutes] = time?.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const isOverlapping = (allowedTimingSlots) => {
            return false;
            // const times = allowedTimingSlots?.map((slot) => {
            //     const startTime = timeInMinutes(slot?.timeSlotFrom);
            //     const endTime = timeInMinutes(slot?.timeSlotTo);
            //     const adjustedTime = endTime < startTime ? endTime + 1440 : endTime;
            //     return { startTime, endTime: adjustedTime };
            // });

            // times?.sort((a, b) => a?.startTime - b?.startTime);

            // for (let i = 0; i < times?.length - 1; i++) {
            //     const slot1 = times[i];
            //     const slot2 = times[i + 1];

            //     if (slot1?.endTime >= slot2?.startTime || slot2?.endTime >= slot1?.startTime + (i === 0 ? 1440 : 0)) {
            //         return true;
            //     }
            // }
            // return false;
        };

        if (isOverlapping(formatedTime)) {
            informationModalBox({ icon: 'error', message: 'Error', description: 'The selected allowed timing slots are overlapping.', className: style.error, placement: 'bottomRight' });
        } else {
            const recordId = selectedRecord?.id || '';
            const data = { ...values, id: recordId, activeIndicator: values.activeIndicator ? 1 : 0, criticalityDefaultGroup: values.criticalityDefaultGroup ? '1' : '0', allowedTimings: formatedTime || [] };

            const onSuccess = (res) => {
                form.resetFields();
                setSelectedRecord({});
                setSuccessAlert(true);
                fetchData({ setIsLoading: listShowLoading, userId });
                if (saveclick === true) {
                    setDrawer(false);
                    informationModalBox({ icon: 'success', message: selectedRecord?.id ? informationMessage.updated : informationMessage.success, description: selectedRecord?.id ? informationMessage.updateGroup : informationMessage.createGroup, className: style.success, placement: 'topRight' });
                } else {
                    setDrawer(true);
                    informationModalBox({ icon: 'success', message: informationMessage.createGroupTitleOnSaveNew, className: style.success, placement: 'bottomRight' });
                }
            };

            const onError = (message) => {
                informationModalBox({ icon: 'error', message: 'Error', description: message, className: style.error, placement: 'bottomRight' });
            };

            const requestData = {
                data: [data],
                setIsLoading: listShowLoading,
                userId,
                onError,
                onSuccess,
            };

            saveData(requestData);
        }
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleAdd = () => {
        setFormActionType('add');
        setSaveAndSaveNew(true);
        setSaveBtn(true);
        setFooterEdit(false);

        setDrawer(true);
        setIsReadOnly(false);
        setsaveclick(false);
        setsaveandnewclick(true);
    };

    const handleUpdate = (record) => {
        setFormActionType('update');
        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);
        setSelectedRecord(record);
        const momentTime = record?.allowedTimings?.map((i) => {
            return {
                id: i?.id,
                timeSlotFrom: moment(i.timeSlotFrom, 'HH:mm'),
                timeSlotTo: moment(i.timeSlotTo, 'HH:mm'),
            };
        });
        setFormData(record);

        form.setFieldsValue({
            criticalityGroupCode: record.criticalityGroupCode,
            criticalityGroupName: record.criticalityGroupName,
            criticalityDefaultGroup: Number(record.criticalityDefaultGroup),
            activeIndicator: record.activeIndicator,
            allowedTimings: momentTime,
        });

        setDrawer(true);
        setIsReadOnly(false);
    };

    const handleUpdate2 = () => {
        setFormActionType('update');

        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);
        const momentTime = selectedRecord?.allowedTimings?.map((i) => {
            return {
                timeSlotFrom: moment(i.timeSlotFrom, 'HH:mm'),
                timeSlotTo: moment(i.timeSlotTo, 'HH:mm'),
            };
        });

        form.setFieldsValue({
            criticalityGroupCode: selectedRecord.criticalityGroupCode,
            criticalityGroupName: selectedRecord.criticalityGroupName,
            criticalityDefaultGroup: Number(selectedRecord.criticalityDefaultGroup),
            activeIndicator: selectedRecord.activeIndicator,
            allowedTimings: momentTime,
        });
        setsaveclick(true);
        setIsReadOnly(false);
    };

    const handleView = (record) => {
        setFormActionType('view');

        setSelectedRecord(record);
        setSaveAndSaveNew(false);
        setFooterEdit(true);
        setSaveBtn(false);
        const momentTime = record?.allowedTimings?.map((i) => {
            return {
                timeSlotFrom: moment(i.timeSlotFrom, 'HH:mm'),
                timeSlotTo: moment(i.timeSlotTo, 'HH:mm'),
            };
        });
        form.setFieldsValue({
            criticalityGroupCode: record.criticalityGroupCode,
            criticalityGroupName: record.criticalityGroupName,
            criticalityDefaultGroup: Number(record.criticalityDefaultGroup),
            activeIndicator: record.activeIndicator,
            allowedTimings: momentTime,
        });
        setDrawer(true);
        setIsReadOnly(true);
    };

    const handleReferesh = () => {
        setRefershData(!RefershData);
    };

    const onChangeHandle = (e) => {
        const newdata = [];
        Object.keys(criticalityGroupData).map((keyname, i) => {
            if (criticalityGroupData[keyname].critcltyGropCode === e) {
                newdata.push(criticalityGroupData[keyname]);
            } else if (criticalityGroupData[keyname].critcltyGropDesc === e) {
                newdata.push(criticalityGroupData[keyname]);
            }
        });

        if (e === '') {
            setSearchdata(criticalityGroupData);
        } else {
            setSearchdata(newdata?.map((el, i) => ({ ...el, srl: i + 1 })));
        }
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
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
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
            render: (text, record) => <>{text === '1' ? <div className={style.activeText}>Active</div> : <div className={style.InactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (text, record) => <>{text === 1 ? <div className={style.activeText}>Active</div> : <div className={style.InactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Actions',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {
                            <Button className={style.tableIcons} danger ghost aria-label="fa-edit" onClick={() => handleUpdate(record)}>
                                <EditIcon />
                            </Button>
                        }
                        {
                            <Button className={style.tableIcons} danger ghost aria-label="ai-view" onClick={() => handleView(record)}>
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
            {contextAlertNotification}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <div className={style.searchAndLabelAlign}>
                                        <Col xs={10} sm={10} md={10} lg={10} xl={10} className={style.subheading}>
                                            Criticality Group List
                                        </Col>
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: 300,
                                                }}
                                                allowClear
                                                onSearch={onChangeHandle}
                                                onChange={onChangeHandle2}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Col>

                            {criticalityGroupData?.length ? (
                                <Col className={styles.addGroup} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Button className={style.refreshBtn} onClick={handleReferesh} danger>
                                        <TfiReload />
                                    </Button>

                                    <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
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
                deletedItemList={deletedItemList}
                setDeletedItemList={setDeletedItemList}
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
                alertNotification={alertNotification}
                contextAlertNotification={contextAlertNotification}
                isDataLoaded={isDataLoaded}
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
                                    !criticalityGroupData?.length ? (
                                        <span>
                                            No records found. Please add new parameter <br />
                                            using below button
                                        </span>
                                    ) : (
                                        <span> No records found.</span>
                                    )
                                }
                            >
                                {!criticalityGroupData?.length ? (
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Group
                                            </Button>
                                        </Col>
                                    </Row>
                                ) : (
                                    ''
                                )}
                            </Empty>
                        )}
                    >
                        <DataTable isLoading={!isDataLoaded} tableData={searchData} tableColumn={tableColumn} />
                    </ConfigProvider>
                </Col>
            </Row>
        </>
    );
};

export const CriticalityGroup = connect(mapStateToProps, mapDispatchToProps)(CriticalityGroupMain);
