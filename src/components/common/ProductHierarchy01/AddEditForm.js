import React, { useEffect, useState } from 'react';

import { Form, Row, Col, Input, Select, Switch, Button, TreeSelect } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaRegTimesCircle } from 'react-icons/fa';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import styles from '../Common.module.css';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

const { TextArea } = Input;
const { Option } = Select;

export default function AddEditForm({ formData, setFormData, fetchList, saveData, listShowLoading, userId, selectedTreeKey, flatternData, setSelectedTreeKey, handleSelectTreeClick, isDataAttributeLoaded, attributeData, productHierarchyData }) {
    const [form] = Form.useForm();
    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [canEditData, setCanEditData] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, childBtn: true, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    // console.log('formData', formData);

    useEffect(() => {
        setButtonData({ ...defaultBtnVisiblity });
        setFormVisible(true);
        // const selectedGeoData = flatternData.find((i) => selectedTreeKey.includes(i.key));
        // setFormData(selectedGeoData?.data);

        if (selectedTreeKey && selectedTreeKey.length > 0) {
            // console.log(selectedTreeKey, 'selectedTreeKey', formData);
            setFormVisible(true);
            // setReadOnly(true);
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
        }
    }, [selectedTreeKey]);

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
            data: { ...values, id: '', active: values?.active ? 'Y' : 'N', otfAmndmntAlwdInd: '' },
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

    const handleEditBtn = () => {
        setCanEditData(true);
        setReadOnly(false);

        setButtonData({ ...defaultBtnVisiblity, childBtn: false, saveBtn: true, resetBtn: false, cancelBtn: true });
    };

    const handleChildBtn = () => {
        setFormVisible(true);
        setReadOnly(false);
        // setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleSiblingBtn = () => {
        setFormVisible(true);
        setReadOnly(false);
        // setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleResetBtn = () => {
        form.resetFields();
    };

    const handleBack = () => {
        setReadOnly(true);
        setCanEditData(false);
        if (selectedTreeKey && selectedTreeKey.length > 0) {
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
        } else {
            setFormVisible(false);
            setButtonData({ ...defaultBtnVisiblity });
        }
    };

    const fieldNames = { label: 'prodctShrtName', value: 'id', children: 'subProdct' };
    const disabledProps = { disabled: false };
    return (
        <div>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                {isFormVisible && (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="attributeKey" label="Attribute Level" initialValue={formData?.id} rules={[validateRequiredSelectField('Attribute Level')]}>
                                    <Select loading={!isDataAttributeLoaded} placeholder="Select" allowClear {...disabledProps}>
                                        {attributeData?.map((item) => (
                                            <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                <Form.Item label="Parent" name="parentCode" initialValue={formData?.prodctCode} className="control-label-blk">
                                    {/* <Input.Group compact> */}
                                    {/* {defaultSelectedKeys} === {selectedTreeKey} */}
                                    {/* <br /> */}
                                    {formData?.prodctLongName}
                                    {/* {JSON.stringify(formData?.prodctShrtName)} */}
                                    <TreeSelect
                                        treeLine={true}
                                        treeIcon={true}
                                        onChange={handleSelectTreeClick}
                                        defaultValue={selectedTreeKey}
                                        showSearch
                                        // style={{
                                        //     width: 'calc(100% - 48px)',
                                        // }}
                                        dropdownStyle={{
                                            maxHeight: 400,
                                            overflow: 'auto',
                                        }}
                                        placeholder="Select"
                                        allowClear
                                        treeDefaultExpandAll
                                        fieldNames={fieldNames}
                                        treeData={productHierarchyData}
                                        {...disabledProps}
                                    />
                                    {/* <Button type="primary" id="hierarchyChange" className="btn btn-outline srchbtn mr0 boxShdwNon" onClick={() => setIsModalOpen(true)}>
                                            <FaSearch />
                                        </Button> */}
                                    {/* </Input.Group> */}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Code" name="prodctCode" initialValue={formData?.prodctCode} rules={[validateRequiredInputField('Code')]}>
                                    <Input placeholder="Code" className={styles.inputBox} {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                <Form.Item name="shortName" label="Short Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('Short Description')]}>
                                    <Input className={styles.inputBox} {...disabledProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="longName" label="Long Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('Long Description')]}>
                                    <TextArea rows={1} placeholder="Type here" {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                <Form.Item name="active" label="Status" initialValue={formData?.isActive === 'Y' ? 1 : 0}>
                                    <Switch value={formData?.isActive === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked {...disabledProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                        {buttonData?.editBtn && (
                            <Button danger onClick={() => handleEditBtn()}>
                                <FaEdit className={styles.buttonIcon} />
                                Edit
                            </Button>
                        )}

                        {buttonData?.childBtn && (
                            <Button danger onClick={() => handleChildBtn()}>
                                <FaUserPlus className={styles.buttonIcon} />
                                Add Child
                            </Button>
                        )}

                        {buttonData?.siblingBtn && (
                            <Button danger onClick={() => handleSiblingBtn()}>
                                <FaUserFriends className={styles.buttonIcon} />
                                Add Sibling
                            </Button>
                        )}

                        {isFormVisible && (
                            <>
                                {buttonData?.saveBtn && (
                                    <Button htmlType="submit" danger>
                                        <FaSave className={styles.buttonIcon} />
                                        Save
                                    </Button>
                                )}

                                {buttonData?.resetBtn && (
                                    <Button danger onClick={handleResetBtn}>
                                        <FaUndo className={styles.buttonIcon} />
                                        Reset
                                    </Button>
                                )}

                                {buttonData?.cancelBtn && (
                                    <Button danger onClick={() => handleBack()}>
                                        <FaRegTimesCircle size={15} className={styles.buttonIcon} />
                                        Cancel
                                    </Button>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
