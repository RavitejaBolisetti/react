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
import style4 from './UserManagementManufacturer.module.css';
// import style3 from './UserManagement.module.css';

import AssignUserRolesMunfacturer from './AssignUserRolesMunfacturer';
import AssignProducts from './AssignProducts';
import AdministrativeHierarchyAccess from './AdministrativeHierarchyAccess';

// import AssignUserRole from './AssignUserRole';
// import BranchMapping from './BranchMapping';
// import ProductMapping from './ProductMapping';
import { ViewUserManagementDealer } from './ViewUserManagementDealer';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const attributeData = ['mh1', 'mh2', 'mh3', 'mh4'];
const AddEditFormMain = (props) => {
    const { saveclick, onCloseAction, productHierarchyData, DealerSearchvalue, handleEditData, showSaveBtn, setSaveAndAddNewBtnClicked, isDataAttributeLoaded, setsaveclick, setsaveandnewclick, saveandnewclick, isLoadingOnSave, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinishFailed, onFinish, form, handleAdd, drawer, data, setDrawer, isChecked, formData, setIsChecked, formActionType, isReadOnly, setFormData, setForceFormReset, footerEdit, handleUpdate2, DealerData, tableDetailData } = props;
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

    const handleDelete = (event, key) => {
        console.log('key', key);
        const newAccessid = AccessMacid.filter((el) => {
            return el?.key != key;
        });
        setAccessMacid(newAccessid);
    };
    const handleAddMacid = (event, key) => {
        form.validateFields();
        form.resetFields();
        const CardData = {
            macid: Macid,
            key: AccessMacid?.length,
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
                            <Card className={style4.usermanagementCard}>
                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                Token No
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <div className={style4.usermanagementCardTextLeft}> {DealerSearchvalue}</div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <div className={styles.floatRight}>User Name</div>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <div className={style4.usermanagementCardTextRight}> {DealerData.employeeName}</div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    {/* <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label="MAC ID" name="macid" rules={[validateRequiredInputField('MAC id'), validationFieldLetterAndNumber('MAC id')]}>
                            <Input onChange={(event) => setMacid(event.target.value)} maxLength={6} placeholder={preparePlaceholderText('MAC id')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Button onClick={(event, key) => handleAddMacid(event, key)} form="myForm" key="Add" type="primary">
                            Add
                        </Button>
                    </Col>
                </Row> */}
                    {/* <Row gutter={20}>
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
                                    <Card className={style.usermanagementCard}>
                                        <Row gutter={20} className={style.alignUsermanagementCard}>
                                            <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                        <span>Mac Id</span>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                        <span>{el?.macid}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                                <Button className={style.crossButton} type="danger" onClick={(event) => handleDelete(event, el?.key)}>
                                                    <AiOutlineClose />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                );
                            })}
                        </Space>
                    </Col>
                </Row> */}

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={style4.manageAccessHeader}>
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
                                    gap: '10px',
                                }}
                            >
                                <Collapse onChange={onChangeCollapse} expandIcon={() => <AiOutlinePlusSquare />}>
                                    <Panel header="Assign User Roles" key="1">
                                        <AssignUserRolesMunfacturer userRoleOptions={DealerData?.employeeRoles} DealerSearchvalue={DealerSearchvalue} />
                                        {/* <AssignUserRole  /> */}
                                    </Panel>
                                </Collapse>
                                <Collapse onChange={onChangeCollapse} expandIcon={() => <AiOutlinePlusSquare />}>
                                    <Panel header="Administrative Hierarchy Access" key="2">
                                        <AdministrativeHierarchyAccess BranchMappingData={DealerData?.branches} />
                                        {/* <BranchMapping BranchMappingData={DealerData?.branches} /> */}
                                    </Panel>
                                </Collapse>
                                <Collapse onChange={onChangeCollapse} expandIcon={() => <AiOutlinePlusSquare />}>
                                    <Panel header="Assign Products" key="3">
                                        <AssignProducts ProductMappingData={DealerData?.products} productHierarchyData={productHierarchyData} />
                                        {/* <ProductMapping ProductMappingData={DealerData?.products} productHierarchyData={productHierarchyData} /> */}
                                    </Panel>
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
                <ViewUserManagementDealer {...viewProps} />
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