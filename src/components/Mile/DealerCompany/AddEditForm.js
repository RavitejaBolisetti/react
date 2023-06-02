import React, { useState } from 'react';
import { Col, Input, Form, Row, Switch, Select } from 'antd';
import { validateRequiredInputField, searchValidator, validatePanField, validateTan, validateTin, validateRequiredSelectField, validatePincodeField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed, listShowLoading, userId, fetchPincodeDetailsList, dealerParentData } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    console.log(dealerParentData,'dealerParentData')

    let pincodeObj = [
        {
            city: null,
            tehsil: null,
            district: null,
            state: null,
        },
    ];

    const [ pincodeDetails, setPincodeDetails ] = useState({ ...pincodeObj });
    const [ pincodeShow, setPincodeShow ] = useState(false);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    let groupValue = null;
    let parentGroupId = null;
    const parentName = (values) => {
        console.log(values,'values')
        if (values === undefined) {
            groupValue = null;
            form.setFieldValue('dealerParentName', groupValue);
            form.setFieldValue('parentId', parentGroupId);
        } else {
            dealerParentData?.map((item) => {
                if (item?.code === values?.label) {
                    groupValue = item?.name;
                    parentGroupId = item?.id;
                    form.setFieldValue('dealerParentName', groupValue);
                    form.setFieldValue('parentId', parentGroupId);
                }
            });
        }
    };

    // const onErrorAction = () => {};
    // const onSuccessAction = () => {
    //     form.setFieldsValue({
    //         stateName: pincodeDetailsData?.state[0].stateName,
    //         name: pincodeDetailsData?.city[0].name,
    //         tehsilName: pincodeDetailsData?.tehsil[0].tehsilName,
    //         districtName: pincodeDetailsData?.district[0].name,
    //     });
    // };


    const handleOnSearch = (value) => {
        //fetchPincodeDetailsList({ setIsLoading: listShowLoading, userId, code: `${value}`, onSuccessAction, onErrorAction });
        if(value === ''){
            setPincodeShow(false);
        }
        else if(value.length === 6){
            setPincodeDetails([
                {
                    city: 'Georgepool',
                    tehsil: 'Pochinki',
                    district: 'Mylta',
                    state: 'Goa',
                },
            ]);
    
            setPincodeShow(true);
    
            // if (pincodeDetails?.length > 1) {
            //     pincodeFields = true;
            // }
        }
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {viewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.parentCode} label="Parent Group Code" rules={[validateRequiredSelectField('parent group code')]} name="parentCode">
                                {/* <Search allowClear onSearch={handleGroupSearch} className={styles.headerSearchField} placeholder={preparePlaceholderText('parent group code')} maxLength={6} /> */}
                                <Select
                                    placeholder={preparePlaceholderSelect('Parent Group Code')}
                                    style={{
                                        width: '100%',
                                    }}
                                    allowClear
                                    labelInValue
                                    onChange={parentName}
                                    showSearch
                                    disabled={editMode}
                                >
                                    {dealerParentData?.map((item) => {
                                        return <Option value={item?.id}>{item?.code}</Option>;
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Parent Group Name" initialValue={groupValue ? groupValue : formData?.dealerParentName} name="dealerParentName">
                                <Input disabled className={styles.inputBox} placeholder={preparePlaceholderText('parent name')} />
                            </Form.Item>
                        </Col>
                        {console.log(parentGroupId,'parentGroupId')}
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                            <Form.Item label="Parent Id" name="parentId" initialValue={formData?.parentId}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyCode} label="Company Code" name="companyCode" rules={[validateRequiredInputField('company code'), [{ validator: searchValidator }]]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('company code')} maxLength={6} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyName} label="Company Name" name="companyName">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('company name')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.address} label="Company Address" name="address" rules={[validateRequiredInputField('company address')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('company address')} maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.pinCode} label="Pin Code" name="pinCode" rules={[validateRequiredInputField('Pin Code'),validatePincodeField('Pin Code')]}>
                                <Search allowClear onSearch={handleOnSearch} placeholder={preparePlaceholderText('parent group code')} className={styles.headerSearchField} maxLength={6} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {pincodeShow && (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={pincodeDetails[0]?.city} label="City" name="city">
                                        <Input className={styles.inputBox} placeholder={preparePlaceholderText('city')} disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={pincodeDetails[0]?.tehsil} label="Tehsil" name="tehsil">
                                        <Input className={styles.inputBox} placeholder={preparePlaceholderText('tehsil')} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={pincodeDetails[0]?.district} label="District" name="district">
                                        <Input className={styles.inputBox} placeholder={preparePlaceholderText('district')} disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={pincodeDetails[0]?.state} label="State" name="state">
                                        <Input className={styles.inputBox} placeholder={preparePlaceholderText('state')} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyTin} label="TIN" name="companyTin" rules={[validateRequiredInputField('tin code'),validateTin('tin')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('tin')}  />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyTan} label="TAN" name="companyTan" rules={[validateRequiredInputField('tan code'),validateTan('tan')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('tan')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyPan} label="PAN" name="companyPan" rules={[validateRequiredInputField('pan code'),validatePanField('pan')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('pan')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
