import React, { useState } from 'react';

import { Form, Row, Col, Input, Select, Switch, Button, TreeSelect } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaSearch } from 'react-icons/fa';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import styles from '../Common.module.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

const { TextArea } = Input;
const { Option } = Select;

export default function AddEditForm({ fetchList, saveData, listShowLoading, userId, selectedTreeKey, isDataAttributeLoaded, attributeData, productHierarchyData, setIsModalOpen, setFieldValue, handleParentCode, showAttributeDetail }) {
    const [form] = Form.useForm();
    const [isFormVisible, setFormVisible] = useState(false);

    const handleFormVisiblity = (status) => {
        setFormVisible(status);
    };

    const onFinish = (values) => {
        const onSuccess = (res) => {
            form.resetFields();
            handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
        };

        const onError = (message) => {
            handleErrorModal(message);
        };

        const requestData = {
            data: { ...values, id: '', active: values?.active ? 'Y' : 'N', otfAmndmntAlwdInd: '', adAmHirchyAttrbtMstSk: '', parntProdctSk: '' },
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

    const onReset = () => {
        form.resetFields();
    };

    const isChildAdd = selectedTreeKey && selectedTreeKey.length >= 0;
    const isSublingAdd = selectedTreeKey && selectedTreeKey.length > 0;
    const isUpdate = false;
    const fieldNames = { label: 'prodctShrtName', value: 'id', children: 'subProd' };

    // useEffect(() => {
    //     form.setFieldValue(selectedTreeKey && selectedTreeKey[0]);
    // }, [selectedTreeKey && selectedTreeKey[0]]);
    return (
        <div>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                {isFormVisible && (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="attributeKey" label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                                    <Select loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                        {attributeData?.map((item) => (
                                            <Option value={item?.hierarchyAttribueCode}>{item?.hierarchyAttribueName}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                <Form.Item label="Parent" name="parentCode" className="control-label-blk">
                                    <Input.Group compact>
                                        <TreeSelect
                                            defaultValue={selectedTreeKey && selectedTreeKey[0]}
                                            showSearch
                                            style={{
                                                width: 'calc(100% - 48px)',
                                            }}
                                            dropdownStyle={{
                                                maxHeight: 400,
                                                overflow: 'auto',
                                            }}
                                            placeholder="Select"
                                            allowClear
                                            treeDefaultExpandAll
                                            fieldNames={fieldNames}
                                            treeData={productHierarchyData}
                                        />
                                        <Button type="primary" id="hierarchyChange" className="btn btn-outline srchbtn mr0 boxShdwNon" onClick={() => setIsModalOpen(true)}>
                                            <FaSearch />
                                        </Button>
                                    </Input.Group>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Code" name="code" rules={[validateRequiredInputField('Code')]}>
                                    <Input name="Code" placeholder="Code" className={styles.inputBox} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                <Form.Item name="shortName" label="Short Description" rules={[validateRequiredInputField('Short Description')]}>
                                    <Input className={styles.inputBox} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="longName" label="Long Description" rules={[validateRequiredInputField('Long Description')]}>
                                    <TextArea rows={1} placeholder="Type here" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                <Form.Item name="active" label="Status" initialValue={true}>
                                    <Switch value={1} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                        {isUpdate && (
                            <Button danger>
                                <FaEdit className={styles.buttonIcon} />
                                Edit
                            </Button>
                        )}

                        {isChildAdd && !isFormVisible && (
                            <Button danger onClick={() => handleFormVisiblity(true)}>
                                <FaUserPlus className={styles.buttonIcon} />
                                Add Child
                            </Button>
                        )}

                        {isSublingAdd && !isFormVisible && (
                            <Button danger onClick={() => handleFormVisiblity(true)}>
                                <FaUserFriends className={styles.buttonIcon} />
                                Add Sibling
                            </Button>
                        )}

                        {(isUpdate || isFormVisible) && (
                            <>
                                <Button htmlType="submit" danger>
                                    <FaSave className={styles.buttonIcon} />
                                    Save
                                </Button>

                                <Button danger onClick={onReset}>
                                    <FaUndo className={styles.buttonIcon} />
                                    Reset
                                </Button>

                                <Button danger onClick={() => handleFormVisiblity(false)}>
                                    <AiOutlineCloseCircle className={styles.buttonIcon} />
                                    Cancel
                                </Button>
                            </>
                        )}
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
