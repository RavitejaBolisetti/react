import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { FaUserPlus, FaSave, FaUndo, FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';

import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch } from 'antd';
import { Table } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from '../Common.module.css';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { geoDataActions } from 'store/actions/data/geo';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { EditableCell } from 'utils/EditableCell';
import AddUpdateDrawer from './AddUpdateDrawer';

const { Option } = Select;
const { confirm } = Modal;
const { success: successModel, error: errorModel } = Modal;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: { isLoaded: isDataLoaded = false, data: geoData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [], detailData: detailData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        geoData,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
        detailData,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: geoDataActions.fetchList,
            saveData: geoDataActions.saveData,
            listShowLoading: geoDataActions.listShowLoading,

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeFetchDetailList: hierarchyAttributeMasterActions.fetchDetailList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const HierarchyAttributeBase = ({ userId, isDataLoaded, geoData, fetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData, hierarchyAttributeFetchDetailList, detailData }) => {
    const [form] = Form.useForm();
    const [rowdata, setRowsData] = useState([]);
    const [editRow, setEditRow] = useState({});
    const [showDrawer, setShowDrawer] = useState(false);
    const [checkfields, setCheckFields] = useState(false);
    const [ForceReset, setForceReset] = useState(false);
    const[UpdatedTableData,setUpdatedTableData]=useState([]);
    const [selectedHierarchy, setSelectedHierarchy] = useState('')
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
 
    useEffect(() => {
        if (!isDataLoaded) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: '' });
        }
        if(detailData?.hierarchyAttribute){
            console.log("Running")
            setRowsData(detailData?.hierarchyAttribute)
        }
        // if(detailData?.hierarchyAttribute){
        //     setRowsData(detailData?.hierarchyAttribute.map(el => (
        //         { ...el, id: Math.random()*1000, key: Math.random()*1000, isEditable: false })
        //         ));
        // };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded, detailData?.hierarchyAttribute, hierarchyAttributeFetchList ]);

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

    const showConfirm = (record, index) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to delete?',
            onOk() {
                deleteTableRows(record, index);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleAdd = () => {
        // const currentlyFormDataObj = form.getFieldsValue();
        setEditRow({});
        setShowDrawer(true);

        // const newData = {
        //     id: Math.random() * 1000,
        //     key: Math.random() * 1000,
        //     hierarchyAttribueId: '',
        //     hierarchyAttribueCode: '',
        //     hierarchyAttribueName: '',
        //     duplicateAllowedAtAttributerLevelInd: 'N',
        //     duplicateAllowedAtDifferentParent: 'N',
        //     isChildAllowed: 'N',
        //     status: 'N',
        //     deletable: true,
        // };

        // const newlyAddedRow = Object.entries(currentlyFormDataObj)
        //     .map(([key, value]) => key !== 'hierarchyAttribueType' && value)
        //     .filter((v) => !!v);
        // setRowsData([...newlyAddedRow, { ...newData }]);
    };

    const edit = (record) => {
        setEditRow(record);
        setShowDrawer(true);
        // const updatedDataItem = data && data.map((item) => ((+item?.id === +record?.id) ? { ...item, isEditable: true } : item));
        // setRowsData(updatedDataItem);
    };

    const deleteTableRows = (record, index) => {
        const currentRows = form.getFieldsValue();
        const updatedRows = Object.entries(currentRows)
            .map(([key, value]) => key !== 'hierarchyAttribueType' && value)
            .filter((v) => !!v)
            .filter((el) => el?.id !== record?.id);
        setRowsData([...updatedRows]);
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyAttribueCode',
            // render: (text, record, index) => {
            //     return <Space wrap>{EditableCell({ record, index, title: 'Code', dataIndex: 'hierarchyAttribueCode', inputType: 'text', form })}</Space>;
            // },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Name',
            dataIndex: 'hierarchyAttribueName',
            // render: (text, record, index) => {
            //     return <Space wrap>{EditableCell({ index, record, title: 'Name', dataIndex: 'hierarchyAttribueName', inputType: 'text' })}</Space>;
            // },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed?',
            dataIndex: 'duplicateAllowedAtAttributerLevelInd',
            render: (record) => {
                return <Switch checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
            // render: (text, record, index) => {
            //     return <Space wrap>{EditableCell({ index, record, title: 'Duplicate Allowed', dataIndex: 'duplicateAllowedAtAttributerLevelInd', inputType: 'switch', form })}</Space>;
            // },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed under different Parent?',
            dataIndex: 'duplicateAllowedAtDifferentParent',
            width:"17%",
            render: (record) => {
                return <Switch checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
            // render: (text, record, index) => {
            //     return <Space wrap>{EditableCell({ index, record, title: 'Duplicate Allowed under different Parent', dataIndex: 'duplicateAllowedAtDifferentParent', inputType: 'switch', form })}</Space>;
            // },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Child Allowed?',
            dataIndex: 'isChildAllowed',
            // render: (text, record, index) => {
            //     return <Space wrap>{EditableCell({ index, record, title: 'Child Allowed', dataIndex: 'isChildAllowed', inputType: 'switch', form })}</Space>;
            // },
            render: (record) => {
                return <Switch checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (record) => {
                return <Switch checked={record === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" />;
            },
            // render: (text, record, index) => {
            //     return <Space wrap>
            //         {EditableCell({ index, record, title: 'Status', dataIndex: 'status', inputType: 'switch', form })}

            //         <Form.Item hidden initialValue={record.key} name={[index, 'key']}>
            //             <Input  />
            //         </Form.Item>

            //         <Form.Item hidden initialValue={record.id} name={[index, 'id']}>
            //             <Input  />
            //         </Form.Item>
            //         <Form.Item hidden initialValue={record.deletable} name={[index, 'deletable']}>
            //             <Input  />
            //         </Form.Item>
            //         <Form.Item hidden initialValue={record.isEditable} name={[index, 'isEditable']}>
            //             <Input  />
            //         </Form.Item>

            //     </Space>;
            // },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Action',
            dataIndex: 'action',
            // editable: false,
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {<FaEdit onClick={() => edit(record)} />}
                        {/* {<FaTrashAlt onClick={() => showConfirm(record, index)} />} */}
                    </Space>
                );
            },
        })
    );

    // on Save table data
    const onFinish = (values) => {
        form.validateFields();
        // const selectedHierarchyAttribue = values['hierarchyAttribueType'];
        const selectedHierarchyAttribue  = selectedHierarchy;

        // console.log("value", values, selectedHierarchy)
        // let formData = Object.entries(values)
        //     .filter(([key]) => key !== 'hierarchyAttribueType')
        //     .map(([keys, { id, key, deletable, ...value }]) => ({ ...value, hierarchyAttribueType: selectedHierarchyAttribue }));
        const onSuccess = (res) => {
            console.log("This is the Heirarchy:",selectedHierarchyAttribue);
            form.resetFields();
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: selectedHierarchyAttribue });
            showSuccessModel({ title: 'SUCCESS', message: res?.responseMessage });
            setShowDrawer(false)
            forceUpdate()
            // console.log("selectedHierarchyAttribue", selectedHierarchyAttribue)

        };
        // const reqData = {
        //     data: {
        //         hierarchyAttributeId: selectedHierarchyAttribue,
        //         hierarchyAttribute: formData,
        //     },
        //     setIsLoading: hierarchyAttributeListShowLoading,
        //     userId,
        //     onError,
        //     onSuccess,
        // };

        hierarchyAttributeSaveData({data: [{...values, hierarchyAttribueType: selectedHierarchy, hierarchyAttribueId: detailData?.hierarchyAttribueId }], setIsLoading: hierarchyAttributeListShowLoading, userId, onError, onSuccess });

    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };
    const handleReset = () => {
      
        console.log('Reset form');
        form.resetFields();
    };
    const handleChange = (attributeType) => {
        hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: attributeType });
        setSelectedHierarchy(attributeType)
    };
    return (
        <>
            {/* <Form preserve={false} form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}> */}
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item layout="vertical" name="hierarchyAttribueType" label="Hierarchy Attribute Type" rules={[validateRequiredSelectField('Hierarchy Attribute')]}>
                            <Select onChange={handleChange} loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                {attributeData?.map((item) => (
                                    <Option value={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                {detailData?.hierarchyAttribueId && (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Table loading={!isDataAttributeLoaded} dataSource={rowdata} pagination={false} columns={tableColumn} bordered />
                            </Col>
                        </Row>

                        <Row gutter={20} style={{ marginTop: '20px' }}>
                            <Col xs={24} sm={16} md={14} lg={12} xl={12}>
                                <Button danger onClick={handleAdd}>
                                    <FaUserPlus className={styles.buttonIcon} />
                                    Add Row
                                </Button>
                            </Col>
                            {/* <Col xs={24} sm={16} md={14} lg={12} xl={12} className={styles.buttonContainer}>
                                <Button htmlType="submit" danger>
                                    <FaSave className={styles.buttonIcon} />
                                    Save
                                </Button>

                                <Button danger onClick={handleReset}>
                                    <FaUndo className={styles.buttonIcon} />
                                    Reset
                                </Button>
                            </Col> */}
                        </Row>
                    </>
                )}
            {/* </Form> */}
            {
                showDrawer &&
                
                <AddUpdateDrawer tableData={detailData?.hierarchyAttribute} selectedHierarchy={selectedHierarchy} onFinishFailed={onFinishFailed} onFinish={onFinish} setCheckFields={setCheckFields} setForceReset={setForceReset} setEditRow={setEditRow} editRow={editRow} showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
            }
        
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeBase);
