import React, { useState, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Input, Modal, Form, Row, Space, Switch, Table, Empty, Select, notification, Alert, ConfigProvider } from 'antd';
import { TfiReload } from 'react-icons/tfi';

import { FaEdit } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineEye } from 'react-icons/ai';
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

const initialTableData = [
    //     {
    //     critcltyGropCode : 'WOWOO'
    // }
];

export const CriticalityGroupMain = ({ fetchData, saveData, listShowLoading, userId, criticalityGroupData, isDataLoaded }) => {
    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [RefershData, setRefershData] = useState(false);
    const [data, setData] = useState(initialTableData);
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
    }, [RefershData]);

    // const onFinish = (values) => {

    //     const arr = values.allowedTimingRequest.map((i) => {
    //         return {
    //             serialNumber: 0,
    //             timeSlotFrom: i.startTime.format('HH:mm'),
    //             timeSlotTo: i.endTime.format('HH:mm'),
    //             timeSlotFrom: '2023-03-06T19:04:40.756Z',
    //             timeSlotTo: '2023-03-06T19:04:40.756Z',
    //             status: 'Y',
    //             remarks: 'NO',
    //             createdDate: '2023-03-06T19:04:40.756Z',
    //             createdBy: '11111',
    //             critcltyGropCode: values?.critcltyGropCode,
    //         };
    //     });

    //     const overlapping = (a, b) => {
    //         const getMinutes = (s) => {
    //             const p = s.split(':').map(Number);
    //             return p[0] * 60 + p[1];
    //         };
    //         return getMinutes(a.endTime) > getMinutes(b.startTime) && getMinutes(b.endTime) > getMinutes(a.startTime);
    //     };
    //     const isOverlapping = (arr) => {
    //         let i, j;
    //         for (i = 0; i < arr.length - 1; i++) {
    //             for (j = i + 1; j < arr.length; j++) {
    //                 if (overlapping(arr[i], arr[j])) {
    //                     return true;
    //                 }
    //             }
    //         }
    //         return false;
    //     };
    //     console.log(isOverlapping(arr));
    //     if (isOverlapping(arr) === true) {
    //         alert('Your timings are overlapping please check again and try');
    //     } else {
    //         console.log('ohhho');
    //         const recordId = formData?.id || '';
    //         setForceFormReset(Math.random() * 10000);
    //         const data = { ...values, createdDate: '2023-03-06T19:04:40.756Z', createdBy: userId, allowedTimingRequest: arr };
    //         const onSuccess = (res) => {
    //             form.resetFields();
    //             handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
    //             fetchData({ setIsLoading: listShowLoading, userId });
    //         };

    //         const onError = (message) => {
    //             handleErrorModal(message);
    //         };

    //         const requestData = {
    //             data: [data],
    //             setIsLoading: listShowLoading,
    //             userId,
    //             onError,
    //             onSuccess,
    //         };

    //         saveData(requestData);
    //         console.log(requestData, 'requestData');
    //         setData([...data, values]);
    //         { values, id: recordId, defaultGroup: values?.defaultGroup ? 'Y' : 'N', Status: values?.Status ? 'Y' : 'N' }
    //         setFormData(data);
    //         setDrawer(false);
    //     }

    //     console.log('the real data', data);
    //     console.log(formData, 'formData');
    // };

    const openNotification = ({ NotificationTitle, NotificationDescription, placement, duration }) => {
        notification.open({
            message: NotificationTitle,
            description: NotificationDescription,
            placement: placement,
            duration: duration,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    const onFinish = (values) => {
        const notificationprops = {
            NotificationTitle: 'Group Created Successfully',
            NotificationDescription: 'Your Group Has been Created Referesh to get the results',
            placement: 'bottomRight',
            duration: 0,
        };
        openNotification({ ...notificationprops });

        // <Alerts {...notificationprops} />;
        console.log('values n submit', values.defaultGroup ? 'Y' : 'N');
        return <>{values && <Alert message="Success Tips" description="Detailed description and advice about successful copywriting." type="success" showIcon />}</>;
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleAdd = () => {
        setFormActionType('add');
        setSaveAndSaveNew(true);
        setSaveBtn(true);
        setFooterEdit(false);
        form.resetFields();
        setDrawer(true);
        setIsReadOnly(false);
        form.setFieldsValue({
            defaultGroup: 'Y',
            status: 'Y',
        });
    };

    const handleUpdate = (record) => {
        // setForceFormReset(Math.random() * 10000);
        setFormActionType('update');
        console.log('update', record);
        setSaveAndSaveNew(false);
        setFooterEdit(false);
        setSaveBtn(true);
        // setFormData(record);
        setSelectedRecord(record);
        const momentTime = record?.allowedTimingRequest?.map((i) => {
            return {
                startTime: dayjs(i.startTime, 'HH:mm'),
                endTime: dayjs(i.endTime, 'HH:mm'),
            };
        });
        form.setFieldsValue({
            critcltyGropCode: record.critcltyGropCode,
            critcltyGropName: record.critcltyGropName,
            defaultGroup: record.defaultGroup === 'Y',
            status: record.status === 'Y',
            allowedTimingRequest: momentTime,
        });
        console.log(formData, 'formData');
        setDrawer(true);
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

        const momentTime = record?.allowedTimingRequest?.map((i) => {
            return {
                startTime: dayjs(i.startTime, 'HH:mm'),
                endTime: dayjs(i.endTime, 'HH:mm'),
            };
        });
        form.setFieldsValue({
            critcltyGropCode: record.critcltyGropCode,
            critcltyGropName: record.critcltyGropName,
            defaultGroup: record.defaultGroup === 'Y',
            status: record.status === 'Y',
            allowedTimingRequest: momentTime,
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
            const searchResult = criticalityGroupData.filter((record) => record.critcltyGropCode.toLowerCase().startsWith(e.target.value.toLowerCase()) || record.critcltyGropDesc.toLowerCase().startsWith(e.target.value.toLowerCase()));
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
            dataIndex: 'critcltyGropCode',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group Name',
            dataIndex: 'critcltyGropName',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Default Group',
            dataIndex: 'defaultGroup',
            render: (text, record) => <>{text === 'Y' ? <div className={style.activeInactiveText}>Active</div> : <div className={style.activeInactiveText}>Inactive</div>}</>,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => <>{text === 'Y' ? <div className={style.activeInactiveText}>Active</div> : <div className={style.activeInactiveText}>Inactive</div>}</>,
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
                                                }}
                                                onSearch={onChangeHandle}
                                                onChange={onChangeHandle2}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Col>
                            {initialTableData?.length ? (
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
                            {/* <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Button danger onClick={handleAdd}>
                                            <TfiReload className={styles.buttonIcon} />
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button danger onClick={handleAdd}>
                                            <AiOutlinePlus className={styles.buttonIcon} />
                                            Add Group
                                        </Button>
                                    </Col>
                                </Row> */}
                        </Row>
                    </div>
                </Col>
            </Row>
            {/* <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Search
                        placeholder="Search"
                        style={{
                            width: 200,
                        }}
                        onSearch={onChangeHandle}
                        onChange={onChangeHandle2}
                    />
                </Col>
                <Col className={style.addGroup} xs={16} sm={16} md={16} lg={16} xl={16}>
                    <Button danger onClick={handleAdd}>
                        <AiOutlinePlus className={styles.buttonIcon} />
                        Add Group
                    </Button>
                </Col>
            </Row> */}
            <Form
                form={form}
                initialValues={{
                    defaultGroup: form.getFieldValue('defaultGroup'),
                }}
                id="myForm"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <DrawerUtil saveBtn={saveBtn} footerEdit={footerEdit} handleUpdate={handleUpdate} saveAndSaveNew={saveAndSaveNew} setSaveAndSaveNew={setSaveAndSaveNew} setSelectedRecord={setSelectedRecord} selectedRecord={selectedRecord} form={form} handleAdd={handleAdd} open={drawer} data={data} setDrawer={setDrawer} isChecked={isChecked} formData={formData} setIsChecked={setIsChecked} formActionType={formActionType} isReadOnly={isReadOnly} setFormData={setFormData} drawerTitle={drawerTitle} />
            </Form>
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
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <AiOutlinePlus />
                                                Add Group
                                            </div>
                                        </Button>
                                    </Col>
                                </Row>
                            </Empty>
                        )}
                    >
                        <DataTable tableData={initialTableData} tableColumn={tableColumn} />
                    </ConfigProvider>
                </Col>
            </Row>
        </>
    );
};

export const CriticalityGroup = connect(mapStateToProps, mapDispatchToProps)(CriticalityGroupMain);
