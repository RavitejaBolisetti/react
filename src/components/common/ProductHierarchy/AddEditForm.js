import React, { useEffect, useState } from 'react';

import { Form, Row, Col, Input, Select, Switch, Button, TreeSelect } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaSearch, FaRegTimesCircle } from 'react-icons/fa';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import styles from '../Common.module.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { BiArrowBack } from 'react-icons/bi';

const { TextArea } = Input;
const { Option } = Select;

export default function AddEditForm({ fetchList, saveData, listShowLoading, userId, selectedTreeKey, flatternData, setSelectedTreeKey, isDataAttributeLoaded, attributeData, productHierarchyData, setIsModalOpen, setFieldValue, handleParentCode, showAttributeDetail }) {
    const [form] = Form.useForm();
    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [formSelectedData, setFormSelectedData] = useState([]);
    const [canEditData, setCanEditData] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, childBtn: true, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    useEffect(() => {
        setButtonData({ ...defaultBtnVisiblity });
        const selectedGeoData = flatternData.find((i) => selectedTreeKey.includes(i.key));
        setFormSelectedData(selectedGeoData?.data);

        if (selectedTreeKey && selectedTreeKey.length > 0) {
            setFormVisible(!!selectedTreeKey);
            setReadOnly(true);
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

    const handleEditBtn = () => {
        setCanEditData(true);
        setReadOnly(false);

        setButtonData({ ...defaultBtnVisiblity, childBtn: false, saveBtn: true, resetBtn: false, cancelBtn: true });
    };

    const handleChildBtn = () => {
        setFormVisible(true);
        setReadOnly(false);
        setFormSelectedData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleSiblingBtn = () => {
        setFormVisible(true);
        setReadOnly(false);
        setFormSelectedData([]);
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

    const fieldNames = { label: 'prodctShrtName', value: 'prodctCode', children: 'subProdct' };

    return (
        <div>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                {isFormVisible && (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="attributeKey" label="Attribute Level" initialValue={formSelectedData?.attributeKey} rules={[validateRequiredSelectField('Attribute Level')]}>
                                    <Select loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                        {attributeData?.map((item) => (
                                            <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                <Form.Item label="Parent" name="parentCode" initialValue={formSelectedData?.prodctCode} className="control-label-blk">
                                    {/* <Input.Group compact> */}
                                    {/* {defaultSelectedKeys} === {selectedTreeKey} */}
                                    {/* <br />{JSON.stringify(fieldNames)} */}
                                    <TreeSelect
                                        treeLine={true}
                                        treeIcon={true}
                                        showSearch
                                        dropdownStyle={{
                                            maxHeight: 400,
                                            overflow: 'auto',
                                        }}
                                        placeholder="Please select"
                                        dropdownMatchSelectWidth={false}
                                        allowClear
                                        treeDefaultExpandAll
                                        treeData={productHierarchyData}
                                        fieldNames={fieldNames}
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
                                <Form.Item label="Code" name="code" initialValue={formSelectedData?.prodctCode} rules={[validateRequiredInputField('Code')]}>
                                    <Input name="Code" placeholder="Code" className={styles.inputBox} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                <Form.Item name="shortName" label="Short Description" initialValue={formSelectedData?.prodctShrtName} rules={[validateRequiredInputField('Short Description')]}>
                                    <Input className={styles.inputBox} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="longName" label="Long Description" initialValue={formSelectedData?.prodctLongName} rules={[validateRequiredInputField('Long Description')]}>
                                    <TextArea rows={1} placeholder="Type here" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                <Form.Item name="active" label="Status" initialValue={formSelectedData?.isActive === 'Y' ? 1 : 0}>
                                    <Switch value={formSelectedData?.isActive === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
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
