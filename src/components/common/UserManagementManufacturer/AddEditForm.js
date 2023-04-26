import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { PARAM_MASTER } from 'constants/paramMaster';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { FaRegPlusSquare, FaPlus } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';

import styles from 'components/common/Common.module.css';
import manufacturerstyle from '../UserManagementManufacturer/UserManagementManufacturer.module.css';
import style from 'components/common/DrawerAndTable.module.css';
import { dealerData } from '../DealerHierarchy/test';
import { ViewUserManagementManufacturer } from './ViewUserManagementManufacturer';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const attributeData = ['mh1', 'mh2', 'mh3', 'mh4'];
const OPTIONS = ['Manager', 'Sales Executive', 'Financial Executive', 'Sales Manager'];

const AddEditFormMain = (props) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

    const { saveclick, onCloseAction, handleEditData, showSaveBtn, setSaveAndAddNewBtnClicked, isDataAttributeLoaded, setsaveclick, setsaveandnewclick, saveandnewclick, isLoadingOnSave, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinishFailed, onFinish, form, handleAdd, drawer, data, setDrawer, isChecked, formData, setIsChecked, formActionType, isReadOnly, setFormData, setForceFormReset, footerEdit, handleUpdate2, DealerData, tableDetailData } = props;
    const { isFormBtnActive, setFormBtnActive, isViewModeVisible, setClosePanels } = props;
    const [Macid, setMacid] = useState();
    const [AccessMacid, setAccessMacid] = useState([]);
    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };
    useEffect(() => {
        console.log('This is the Access Macid : ', AccessMacid);
    }, [AccessMacid]);

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const handleControlChange = (control, e) => {
        return;
    };
    const handleAddMacid = (event) => {
        form.validateFields();
        const CardData = {
            macid: Macid,
        };
        setAccessMacid([...AccessMacid, CardData]);
        console.log('This is the macID : ', CardData);
    };
    const onChangeCollapse = (collapse) => {
        console.log('collapse: :', collapse);
    };
    useEffect(() => {
        console.log('We are getting dealer data: :', DealerData);
    }, [DealerData]);

    const viewProps = {
        isVisible: isViewModeVisible,
        setClosePanels,
        formData,
        styles,
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {/* <Card>
                            <Meta title="Sandeep Lad" description="Token No.: B6G433" />
                        </Card> */}
                            <Card className={manufacturerstyle.cardBox}>
                                <div className={manufacturerstyle.userdetials}>
                                    <span>
                                        Token No: <strong>{tableDetailData['0'].employeeCode}</strong>
                                    </span>
                                    <span>
                                        User Name: <strong>{tableDetailData['0'].userName}</strong>
                                    </span>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={style.manageAccessHeader}>
                                <p>
                                    Access Management<span>*</span>
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Space
                                direction="vertical"
                                size="large"
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <Collapse className={manufacturerstyle.collapsecardBox} onChange={onChangeCollapse} expandIcon={({ isActive }) => <AiOutlinePlusSquare rotate={isActive ? 30 : 0} />}>
                                    <Panel header="Assign User Roles" key="1">
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Form.Item label="User Role" name="Macid" rules={[validateRequiredInputField(''), validationFieldLetterAndNumber('')]}>
                                                    {/* <Input onChange={(event) => setMacid(event.target.value)}  placeholder={preparePlaceholderText('User Role')} /> */}

                                                    <Select
                                                        className={manufacturerstyle.chooserole}
                                                        mode="multiple"
                                                        placeholder="Select user role"
                                                        value={selectedItems}
                                                        onChange={setSelectedItems}
                                                        style={{ width: '100%' }}
                                                        options={filteredOptions.map((item) => ({
                                                            value: item,
                                                            label: item,
                                                        }))}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                {/* <Button onClick={handleAddMacid} form="myForm" key="Add" type="primary">
                                            Add
                                        </Button> */}
                                                <Button form="myForm" key="Add" type="primary">
                                                    Add
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Space
                                                    direction="vertical"
                                                    size="middle"
                                                    style={{
                                                        display: 'flex',
                                                    }}
                                                >
                                                    {AccessMacid?.map((el) => {
                                                        return (
                                                            <Card className={style.userManagementDrawer}>
                                                                <Row gutter={20}>
                                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                                        <span>Mac Id</span>
                                                                    </Col>
                                                                </Row>
                                                                <Row gutter={20}>
                                                                    <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                                                                        <span>{el.macid}</span>
                                                                    </Col>
                                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                                        <Button>
                                                                            <AiOutlineClose />
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Card>
                                                        );
                                                    })}
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                                <Collapse className={manufacturerstyle.collapsecardBox} onChange={onChangeCollapse} expandIcon={() => <AiOutlinePlusSquare />}>
                                    <Panel header="Branch Mapping" key="2"></Panel>
                                </Collapse>
                                <Collapse className={manufacturerstyle.collapsecardBox} onChange={onChangeCollapse} expandIcon={() => <AiOutlinePlusSquare />}>
                                    <Panel header="Product Mapping" key="3"></Panel>
                                </Collapse>
                            </Space>
                            {/* <Collapse onChange={onChangeCollapse} expandIcon={() => <AiOutlinePlusSquare />}>
                            <Panel header="Assign User Roles*" key="1">
                                <Form.Item name="userRole" label="User Role">
                                    <Select placeholder={'Select User Role'} showSearch allowClear>
                                        {attributeData?.map((item) => (
                                            <Option value={item}>{item}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Card
                                    title="Manager"
                                    extra={
                                        <>
                                            <a href="#">Application Access</a>
                                            <a href="#">
                                                <IoTrashOutline />
                                            </a>
                                        </>
                                    }
                                >
                                    Role ID: B6G433
                                </Card>
                                <Card
                                    title="Sales Executive"
                                    extra={
                                        <>
                                            <a href="#">Application Access</a>
                                            <a href="#">
                                                <IoTrashOutline />
                                            </a>
                                        </>
                                    }
                                >
                                    Role ID: B6G433
                                </Card>
                                <Card
                                    title="Financial Executive"
                                    extra={
                                        <>
                                            <a href="#">Application Access</a>
                                            <a href="#">
                                                <IoTrashOutline />
                                            </a>
                                        </>
                                    }
                                >
                                    Role ID: B6G433
                                </Card>
                            </Panel>
                            <Panel header="Administrative Hierarchy Mapping*" key="2">
                                <p>This is panel contents 2</p>
                            </Panel>
                            <Panel header="Product Mapping*" key="3">
                                <p>This is panel contents 3</p>
                            </Panel>
                        </Collapse> */}
                        </Col>
                    </Row>
                </Space>
            ) : (
                <ViewUserManagementManufacturer {...viewProps} />
            )}

            <Row gutter={20} className={styles.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                    <Button danger onClick={onCloseAction}>
                        Cancel
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                    <Button htmlType="submit" danger disabled={!isFormBtnActive}>
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
