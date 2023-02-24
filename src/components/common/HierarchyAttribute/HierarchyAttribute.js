import React, { useEffect, useState } from 'react';
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

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, form, ...restProps }) => {
    let inputField = '';
    switch (inputType) {
        case 'switch':
            inputField = (
                <Form.Item
                    normalize={(a, b) =>  a ? 'Y' : 'N'}
                    style={{
                        margin: 0,
                    }}
                    name={[index, dataIndex]}
                    // rules={[validateRequiredInputField(`${title}`)]}
                    initialValue={record[dataIndex]}
                >
                    <Switch defaultChecked={record[dataIndex] === 'Y'} readOnly={record?.hierarchyAttribueId && !record?.readOnly} disabled={record?.hierarchyAttribueId && !record?.readOnly} checkedChildren="Yes" unCheckedChildren="No" />
                </Form.Item>
            );
            break;
        default:
            inputField = (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={[index, dataIndex]}
                    rules={[validateRequiredInputField(`${title}`)]}
                    initialValue={record[dataIndex]}
                >
                    <Input readOnly={record?.hierarchyAttribueId && !record?.readOnly} disabled={record?.hierarchyAttribueId && !record?.readOnly} />
                </Form.Item>
            );
            break;
    }
    return <td>{inputField}</td>;
};

// const initialData = [
//     {
//         id: '1',
//         hierarchyAttribueId: '1q',
//         hierarchyAttribueCode: '1234',
//         hierarchyAttribueName: 'Dev attribute',
//         duplicateAllowedAtAttributerLevelInd: 'N',
//         duplicateAllowedAtDifferentParent: 'Y',
//         isChildAllowed: 'Y',
//         status: 'Y',
//     },
//     {
//         id: '2',
//         hierarchyAttribueId: '2q',
//         hierarchyAttribueCode: '3445',
//         hierarchyAttribueName: 'dummy attribute',
//         duplicateAllowedAtAttributerLevelInd: "N",
//         duplicateAllowedAtDifferentParent: "Y",
//         isChildAllowed: "N",
//         status: "Y",
//     },
// ];

export const HierarchyAttributeBase = ({ userId, isDataLoaded, geoData, fetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData, hierarchyAttributeFetchDetailList, detailData }) => {

    const [form] = Form.useForm();

    const [data, setRowsData] = useState([]);
    const [count, setCount] = useState(data.length || 0);
    const [forceFormReset, setForceFormReset] = useState(false);

    useEffect(() => {
        // form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    useEffect(() => {
        if (!isDataLoaded ) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: '' });
        }
        if(detailData?.hierarchyAttribute){
            setRowsData(detailData?.hierarchyAttribute)
        } 
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded, detailData?.hierarchyAttribute]);

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


    const handleAdd = () => {
        const newData = {
            id: Math.random() * 1000,
            hierarchyAttribueId: '',
            hierarchyAttribueCode: '',
            hierarchyAttribueName: '',
            duplicateAllowedAtAttributerLevelInd: 'N',
            duplicateAllowedAtDifferentParent: 'N',
            isChildAllowed: 'N',
            status: 'N',
        };
        setRowsData([...data, newData]);
        setCount(count + 1);
    };

    const edit = (record) => {
        const updatedDataItem = data && data.map((item) => ((+item?.id === +record?.id) || (+item?.hierarchyAttribueId === +record?.hierarchyAttribueId) ? { ...item, readOnly: true } : item));
        setRowsData(updatedDataItem);
    };

    const deleteTableRows = (id) => {
        const updatedData = [...data];
        const index = updatedData.findIndex((el) => el.id === id);
        updatedData.splice(Number(index), 1);
        // console.log(form.getFieldsValue(), index);

        // const formData = form.getFieldsValue();

        // let obj = {};
        // let watch = updatedData.length;

        // console.log("watch",watch)
        // for (const key in formData) {
        //     console.log(typeof(key))
        //     while(watch >= 0){
        //         if(Number(key) === Number(index)){
        //             watch--;
        //             continue;
        //         }else if(Number(key) > Number(index)){ 
        //             obj[String(+key-1)] = formData[key]
        //             watch--
        //         }else{
        //             obj[String(key)] = formData[key]
        //             watch--;
        //         }
        //     }
             
        // };


        // console.log("obj", obj)
        // delete(formData[index])
        // formData[String(index)] = { hierarchyAttribueId: '',
        //     hierarchyAttribueCode: '',
        //     hierarchyAttribueName: '',
        //     duplicateAllowedAtAttributerLevelInd: 'N',
        //     duplicateAllowedAtDifferentParent: 'N',
        //     isChildAllowed: 'N',
        //     status: 'N',
        // };
        // form.setFieldsValue({...obj}) 
        setRowsData(()=>[...updatedData]);
        setForceFormReset(Math.random() * 10000);

    };

    console.log("formData"+ "form.getFieldsValue()", form.getFieldsValue())

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyAttribueCode',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ record, index, title: 'Code', dataIndex: 'hierarchyAttribueCode', inputType: 'text', form })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Name',
            dataIndex: 'hierarchyAttribueName',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ index, record, title: 'Name', dataIndex: 'hierarchyAttribueName', inputType: 'text' })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed?',
            dataIndex: 'duplicateAllowedAtAttributerLevelInd',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ index, record, title: 'Duplicate Allowed', dataIndex: 'duplicateAllowedAtAttributerLevelInd', inputType: 'switch', form })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed under different Parent?',
            dataIndex: 'duplicateAllowedAtDifferentParent',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ index, record, title: 'Duplicate Allowed under different Parent', dataIndex: 'duplicateAllowedAtDifferentParent', inputType: 'switch', form })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Child Allowed?',
            dataIndex: 'isChildAllowed',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ index, record, title: 'Child Allowed', dataIndex: 'isChildAllowed', inputType: 'switch', form })}</Space>;
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text, record, index) => {
                return <Space wrap>{EditableCell({ index, record, title: 'Status', dataIndex: 'status', inputType: 'switch', form })}</Space>;
            },
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
                        {!record?.id && <FaEdit onClick={() => edit(record)} />}
                        {record?.id && <FaTrashAlt onClick={() => showConfirm(record?.id)} />}
                    </Space>
                );
            },
        })
    );

    // on Save table data
    const onFinish = (values) => {
        const selectedHierarchyAttribue = values['hierarchyAttribueType'];

            let formData = Object.entries(values).filter(([key]) => key !== "hierarchyAttribueType" ).map(([key, value]) =>  value)

        console.log('formData', formData);

        return;

        const onSuccess = (res) => {
            form.resetFields();
            showSuccessModel({ title: 'SUCCESS', message: res?.responseMessage });
        };

        const reqData = {
            data: {
                hierarchyAttributeId: form.getFieldValue('hierarchyAttribueType'),
                hierarchyAttribute: values,
            },
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        // saveData({ data: [values ], setIsLoading: listShowLoading, userId, onError, onSuccess });
        hierarchyAttributeSaveData(reqData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleReset = () => {
        form.resetFields();
    };
    const handleChange = (attributeType) => {
        hierarchyAttributeFetchDetailList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: attributeType });
    };
    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="hierarchyAttribueType" label="Hierarchy Attribute Type" rules={[validateRequiredSelectField('Hierarchy Attribute')]}>
                            <Select onChange={handleChange} loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                {attributeData?.map((item) => (
                                    <Option value={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Table  loading={!isDataAttributeLoaded} dataSource={data} pagination={false} columns={tableColumn} bordered />
                    </Col>
                </Row>

                <Row gutter={20} style={{ marginTop: '20px' }}>
                    <Col xs={24} sm={16} md={14} lg={12} xl={12}>
                        <Button danger onClick={handleAdd}>
                            <FaUserPlus className={styles.buttonIcon} />
                            Add Row
                        </Button>
                    </Col>
                    <Col xs={24} sm={16} md={14} lg={12} xl={12} className={styles.buttonContainer}>
                        <Button htmlType="submit" danger>
                            <FaSave className={styles.buttonIcon} />
                            Save
                        </Button>

                        <Button danger onClick={handleReset}>
                            <FaUndo className={styles.buttonIcon} />
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeBase);
