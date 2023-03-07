import React, { useState, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch, Table, Empty } from 'antd';

import { FaSave, FaUserPlus, FaUndo, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineEye } from 'react-icons/ai';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import styles from 'pages/common/Common.module.css';
import { criticalityDataActions } from 'store/actions/data/criticalityGroup';
import { tblPrepareColumns } from 'utils/tableCloumn';
import DrawerUtil from './DrawerUtil';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

import dayjs from 'dayjs';

const { Option } = Select;
const { confirm } = Modal;
const { success: successModel, error: errorModel } = Modal;
const { Search } = Input;

const showConfirm = () => {
    confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleFilled />,
        content: 'Some descriptions',
        onOk() {
            // console.log('OK');
        },
        onCancel() {
            // console.log('Cancel');
        },
    });
};

const mapStateToProps = (state) => {
    console.log(state);
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

const initialTableData = [];

export const CriticalityGroupMain = ({ fetchData, saveData, listShowLoading, userId, criticalityGroupData, isDataLoaded }) => {
    const [formActionType, setFormActionType] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [data, setData] = useState(initialTableData);
    const [drawer, setDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChecked, setIsChecked] = useState(data.status === 'Y' ? true : false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [drawerTitle, setDrawerTitle] = useState('');
    const [form] = Form.useForm();
    const [arrData, setArrData] = useState(data);

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded) {
            fetchData({ setIsLoading: listShowLoading, userId });
            console.log(criticalityGroupData, 'critiality grpopu dtaa');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const showSuccessModel = ({ title, message }) => {
        successModel({
            title: title,
            icon: <ExclamationCircleFilled />,
            content: message,
        });
    };

    const onError = (message) => {
        errorModel({
            title: 'ERROR',
            icon: <ExclamationCircleFilled />,
            content: message,
        });
    };

    const showConfirm = (key) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to delete?',
            onOk() {
                deleteTableRows(key);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const onFinish = (values) => {
        const arr = values.allowedTimingRequest.map((i) => {
            return {
                serialNumber:0,
                // timeSlotFrom: i.startTime.format('HH:mm'),
                // timeSlotTo: i.endTime.format('HH:mm'),
                timeSlotFrom:"2023-03-06T19:04:40.756Z",
                timeSlotTo: "2023-03-06T19:04:40.756Z",
                status: "Y",
                remarks: "NO",
                createdDate: "2023-03-06T19:04:40.756Z",
                createdBy: "11111",
                critcltyGropCode: values?.critcltyGropCode
            };
        });

        const overlapping = (a, b) => {
            const getMinutes = (s) => {
                const p = s.split(':').map(Number);
                return p[0] * 60 + p[1];
            };
            return getMinutes(a.endTime) > getMinutes(b.startTime) && getMinutes(b.endTime) > getMinutes(a.startTime);
        };
        const isOverlapping = (arr) => {
            let i, j;
            for (i = 0; i < arr.length - 1; i++) {
                for (j = i + 1; j < arr.length; j++) {
                    if (overlapping(arr[i], arr[j])) {
                        return true;
                    }
                }
            }
            return false;
        };
        console.log(isOverlapping(arr));
        if (isOverlapping(arr) === true) {
            alert('Your timings are overlapping please check again and try');
        } else {
            console.log('ohhho');
            const recordId = formData?.id || '';
            setForceFormReset(Math.random() * 10000);
            const data = { ...values,createdDate:"2023-03-06T19:04:40.756Z",createdBy:userId,allowedTimingRequest:arr };
            const onSuccess = (res) => {
                form.resetFields();
                handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
                fetchData({ setIsLoading: listShowLoading, userId });
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
            console.log(requestData,"requestData");
            // setData([...data, values]);
            // // { values, id: recordId, defaultGroup: values?.defaultGroup ? 'Y' : 'N', Status: values?.Status ? 'Y' : 'N' }
            // setFormData(data);
            setDrawer(false);
        }

        console.log('the real data', data);
        console.log(formData, 'formData');
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleAdd = () => {
        console.log(data, 'datat');
        setDrawer(true);
        setFormActionType('add');
        setIsReadOnly(false);
        form.resetFields();
        forceUpdate();
    };

    const handleUpdate = (record) => {
        setForceFormReset(Math.random() * 10000);
        setFormData(record);
        console.log(formData, 'formData');
        setDrawer(true);
        setFormActionType('update');
        setIsReadOnly(false);
        forceUpdate();

        // formData && setFormData(formData?.data);
    };

    const handleView = (record) => {
        setForceFormReset(Math.random() * 10000);
        setFormData(record);
        setDrawer(true);
        setFormActionType('view');
        setIsReadOnly(true);
        forceUpdate();

        // formData && setFormData(formData?.data);
    };

    const handleReset = () => {
        console.log('reset called');
    };

    const edit = (record) => {
        const updatedDataItem = data && data.map((item) => (+item?.id === +record?.id || +item?.hierarchyAttribueId === +record?.hierarchyAttribueId ? { ...item, readOnly: true } : item));
        // setRowsData(updatedDataItem);
    };

    const deleteTableRows = (id) => {
        const updatedData = [...data];
        const index = updatedData.findIndex((el) => el.id === id);
        updatedData.splice(Number(index), 1);
        // setRowsData([...updatedData]);
    };

    const onChangeHandle = (e) => {
        const getSearch = e.target.value;
        // console.log("value:", e.target.value);
        if (e.target.value == '') {
            window.location.reload(true);
            const tempArr = arrData;
            setArrData(tempArr);
            return;
        }
        if (getSearch.length > -1) {
            const searchResult = arrData.filter((record) => record.name.toLowerCase().startsWith(e.target.value.toLowerCase()) || record.code.toLowerCase().startsWith(e.target.value.toLowerCase()));
            setArrData(searchResult);
        }
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
            sortFn: (a, b) => a.criticalityGroupId.localeCompare(b.criticalityGroupId),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group Name',
            dataIndex: 'critcltyGropDesc',
            sortFn: (a, b) => a.criticalityGroupName.localeCompare(b.criticalityGroupName),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Default Group?',
            dataIndex: 'defaultGroup',
            sortFn: (a, b) => a.defaultGroup.localeCompare(b.defaultGroup),
            render: (text, record) => <Switch defaultChecked={text} checkedChildren="Active" unCheckedChildren="Inactive" />,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            sortFn: (a, b) => a.status.localeCompare(b.defaultGroup),
            render: (text, record) => <Switch defaultChecked={text} checkedChildren="Active" unCheckedChildren="Inactive" />,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: '',
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {<FaEdit onClick={() => handleUpdate(record)} />}
                        {<AiOutlineEye onClick={() => handleView(record)} />}
                    </Space>
                );
            },
        })
    );

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Search
                        placeholder="Search"
                        style={{
                            width: 200,
                        }}
                        onChange={onChangeHandle}
                    />
                </Col>
                <Col offset={13} xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Button danger onClick={handleAdd}>
                        <AiOutlinePlus className={styles.buttonIcon} style={{ textAlign: 'right' }} />
                        Add Group
                    </Button>
                </Col>
            </Row>
            <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <DrawerUtil handleAdd={handleAdd} open={drawer} data={data} setDrawer={setDrawer} isChecked={isChecked} formData={formData} setIsChecked={setIsChecked} formActionType={formActionType} isReadOnly={isReadOnly} setFormData={setFormData} drawerTitle={drawerTitle} />
            </Form>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Table locale={{ emptyText: <Empty description="No Criticality Group Added" /> }} dataSource={criticalityGroupData} pagination={true} columns={tableColumn} />
                </Col>
            </Row>
        </>
    );
};

export const CriticalityGroup = connect(mapStateToProps, mapDispatchToProps)(CriticalityGroupMain);
