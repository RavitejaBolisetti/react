import React, { useEffect,useState } from 'react';
import { Col, Input, Form, Row, Select, Switch,Drawer,Button } from 'antd';
// import { FaSearch } from 'react-icons/fa';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';

import styles from 'pages/common/Common.module.css';
import TreeSelectField from '../TreeSelectField';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/DrawerAndTable.module.css';


const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = ({ open,form,setDrawer,setFormBtnDisable,handleUpdate2,footerEdit,setsaveclick,isChecked, setIsChecked, handleAttributeChange, setSelectedTreeKey, setSelectedTreeSelectKey, flatternData, formActionType, fieldNames, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, productHierarchyData,isLoadingOnSave }) => {
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const [isChildAllowed, setIsChildAllowed] = useState(true);
    const [isVisible,setIsVisible] = useState(false)

    const disabledProps = { disabled: isReadOnly };

    let treeCodeId = '';
    let treeCodeReadOnly = false;

    if (formActionType === 'edit' || formActionType === 'view') {
        treeCodeId = formData?.parntProdctId;
    } else if (formActionType === 'child') {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === 'sibling') {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = treeCodeData && treeCodeData?.data?.parntProdctId;
    }

    let drawerTitle = 'Add Product Details';
    if (formActionType === 'add') {
        drawerTitle = 'Add Product Details';
    } else if (formActionType === 'update') {
        drawerTitle = 'Edit Product Details';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Product Details';
    }

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    
    const onClose = () => {
        setDrawer(false);
        setFormBtnDisable(false);
        form.
            resetFields();
    };


    useEffect(() => {
        if (formActionType === 'sibling') {
            setSelectedTreeKey([treeCodeId]);
        }

        setSelectedTreeSelectKey(treeCodeId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('Parent'),
    };

    const onCloseAction = () => {
        console.log("hello")
    }
    // const isVisible = () => {
    //     console.log("hello")
    // }
    const onOpenAction = () => {
        console.log("hello")
    }
    useEffect(()=>{
        const selectedAttribute = attributeData?.find((i) => i.id === formData?.attributeKey);  
        setIsChildAllowed(selectedAttribute?.hierarchyAttribueName)
    })
    return (
        <>
            <Drawer
                title={drawerTitle}
                placement="right"
                onClose={onClose}
                className={footerEdit ? style.viewMode : style.drawerCriticalityGrp}
                width="540px"
                open={open}
                footer={
                    <>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Button danger onClick={onClose} className={style.cancelBtn}>
                                    Cancel
                                </Button>
                            </Col>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={style.saveBtn}>
                                <Button loading={isLoadingOnSave} onClick={() => setsaveclick(true)} form="myForm" key="submit" htmlType="submit" type="primary">
                                    Save
                                </Button>

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
                <>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Attribute Level" rules={[validateRequiredSelectField('Geographical Attribute Level')]}>
                                <Select onChange={handleAttributeChange} loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('Attribute Level')} {...disabledProps} showSearch allowClear>
                                    {attributeData?.map((item) => (
                                        <Option value={item?.id}>{item?.hierarchyAttribueName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padRight18}>
                            <Form.Item initialValue={treeCodeId} label="Parent" name="parntProdctId">
                                <TreeSelectField {...treeSelectFieldProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Code" name="prodctCode" initialValue={formData?.prodctCode} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                                <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="prodctShrtName" label="Short Description" initialValue={formData?.prodctShrtName} rules={[validateRequiredInputField('Short Description')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Short Description')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="prodctLongName" label="Long Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('Long Description')]}>
                                <TextArea rows={1} placeholder={preparePlaceholderText('Long Description')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                            <Form.Item initialValue={formData?.active === 'Y' ? 1 : 0} label="Status" name="active">
                                <Switch value={formData?.active === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            </Drawer>
        </>
    );
};

export const AddEditForm =(AddEditFormMain);
