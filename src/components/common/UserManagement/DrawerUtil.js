import React from 'react';
import { Drawer, Input, Form, Col, Row, Button, Card, Collapse, Select, Space } from 'antd';
import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { IoTrashOutline } from 'react-icons/io5';
import style from 'components/common/DrawerAndTable.module.css';

const { Panel } = Collapse;
const { Option } = Select;

const DrawerUtil = ({ handleUpdate2, footerEdit, UserManagementDealerData, DealerData, tableDetailData, setsaveclick, isLoading, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData, isLoadingOnSave }) => {
    
    let drawerTitle = '';
    if (formActionType === 'add') {
        drawerTitle = 'Manage User Access';
    } else if (formActionType === 'update') {
        drawerTitle = 'Edit User Access';
    } else if (formActionType === 'view') {
        drawerTitle = 'View User Access';
    }

    const handleForm = () => {
        setFormBtnDisable(true);
    };
    const handleAddMacid = () => {};

    const onClose = () => {
        setDrawer(false);
        setFormBtnDisable(false);
        form.resetFields();
    };

    return (
        <Drawer
            title={drawerTitle}
            placement="right"
            onClose={onClose}
            open={open}
            className={footerEdit ? style.viewMode : style.drawerCriticalityGrp}
            width="540px"
            footer={
                <>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Button danger onClick={onClose} className={style.cancelBtn}>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={style.saveBtn}>
                            {saveBtn ? (
                                <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={() => setsaveclick(true)} form="myForm" key="submit" htmlType="submit" type="primary">
                                    Save
                                </Button>
                            ) : (
                                ''
                            )}
                            {footerEdit ? (
                                <Button onClick={handleUpdate2} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                                    Edit
                                </Button>
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                </>
            }
        >
            <Form autoComplete="off" form={form} className={style.userManagementDrawer} onFieldsChange={handleForm} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Space
                    direction="vertical"
                    size="small"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {/* <Card>
                            <Meta title="Sandeep Lad" description="Token No.: B6G433" />
                        </Card> */}
                            <Card
                                style={{
                                    width: '100% ',
                                    display: 'flex',
                                }}
                            >
                                <p>
                                    Employee Code : <span>{tableDetailData['0'].employeeCode}</span>
                                </p>
                                <p>
                                    userName:<span>{tableDetailData['0'].userName}</span>
                                </p>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label="MAC ID" name="macid" rules={[validateRequiredInputField('MAC id'), validationFieldLetterAndNumber('MAC id')]}>
                                <Input maxLength={6} placeholder={preparePlaceholderText('MAC id')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Button onClick={handleAddMacid} form="myForm" key="Add" type="primary">
                                Add
                            </Button>
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
                            <Collapse>
                                <Panel header="Assign User Roles*" key="1">
                                    <Form.Item name="userRole" label="User Role">
                                        <Select loading={!isDataAttributeLoaded} placeholder={'Select User Role'} showSearch allowClear>
                                            {attributeData?.map((item) => (
                                                <Option key={item?.id} value={item?.id}>{item?.hierarchyAttribueName}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Card
                                        title="Manager"
                                        extra={
                                            <>
                                                <a href="/#">Application Access</a>
                                                <a href="/#">
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
                                                <a href="/#" >Application Access</a>
                                                <a href="/#">
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
                                                <a href="/#">Application Access</a>
                                                <a href="/#">
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
                            </Collapse>
                        </Col>
                    </Row>
                </Space>
            </Form>
        </Drawer>
    );
};

export default DrawerUtil;
