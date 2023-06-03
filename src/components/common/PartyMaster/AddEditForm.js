import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber, validatePincodeField, validateAlphanumericWithSpace, validateMobileNoField, validatePanField, validateGSTIN, validationNumber, validateOnlyPositiveNumber, valueBetween0to100, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'components/common/Common.module.css';
import { AddressAddEdit } from 'utils/AddressAddEditForm';

const { Option } = Select;
const { Search } = Input;

const AddEditFormMain = (props) => {
    const { form, formData, recordData, detailData, listShowLoading, userId, fetchDetail, setFormData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed } = props;

    const { typeData } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;

    const { fetchPincodeDetail, isLoadingPincodeList, pincodeData } = props;

    const [addressSelectForm] = Form.useForm();

    const [isAddressSelectVisible, setIsAddressSelectVisible] = useState(false);
    const [pinFormData, setPinFormData] = useState();

    const [filteredStateData, setFilteredStateData] = useState(pincodeData?.state);

    const [filteredDistrictData, setFilteredDistrictData] = useState(pincodeData?.district);
    const [filteredCityData, setFilteredCityData] = useState(pincodeData?.city);
    const [filteredTehsilData, setFilteredTehsilData] = useState(pincodeData?.tehsil);

    const onErrorAction = () => {};

    const onSuccessAction = () => {
        form.setFieldsValue({
            state: pincodeData?.state[0].stateName,
            city: pincodeData?.city[0].name,
            tehsil: pincodeData?.tehsil[0].tehsilName,
            district: pincodeData?.district[0].name,
        });
    };

    useEffect(() => {
        if (editMode || viewMode) {
            fetchDetail({ setIsLoading: listShowLoading, userId, partyCode: `${recordData?.partyCode}` });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (editMode || viewMode) {
            setFormData(detailData[0]);
            form.setFieldsValue({
                ...detailData[0],
            });
        } else {
            form.resetFields();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailData]);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleOnSearch = (value) => {
        addressSelectForm.resetFields();

        form.validateFields(['pinCode'])
            .then(() => {
                fetchPincodeDetail({ setIsLoading: listShowLoading, userId, code: `${value}`, onSuccessAction, onErrorAction });
            })
            .catch((err) => {
                console.log('err', err);
            });
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

    const addressAddEditFormProps = {
        isVisible: isAddressSelectVisible,
        onCloseAction: () => {
            setIsAddressSelectVisible(false);
            addressSelectForm.resetFields();
        },
        titleOverride: 'Address',
        form,
        addressSelectForm,
        formData,
        pinFormData,
        pincodeData,
        setIsAddressSelectVisible,
    };
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                {viewMode ? (
                    <ViewDetail {...viewProps} />
                ) : (
                    <>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.partyCategory} disabled label="Party Category" name="partyCategory" placeholder={preparePlaceholderSelect('party category')} rules={[validateRequiredInputField('party category')]}>
                                    <Select disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.headerSelectField} showSearch loading={!(typeData?.PTY_CAT?.length !== 0)} placeholder="Select" allowClear>
                                        {typeData?.PTY_CAT?.map((item) => (
                                            <Option value={item?.value}>{item?.value}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Party Code" initialValue={formData?.partyCode} rules={[validateRequiredInputField('party code'), validateAlphanumericWithSpace('party code')]} name="partyCode">
                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('party code')} maxLength={6} disabled={editMode ? true : false} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.partyName} label="Party Name" name="partyName" rules={[validateRequiredInputField('party name'), validateAlphanumericWithSpace('party name')]}>
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('party name')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Contact Person Name" initialValue={formData?.contactPersonName} rules={[validateRequiredInputField('contact person name'), validateAlphanumericWithSpace('contact person name')]} name="contactPersonName">
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('contact person name')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.designation} label="Designation" name="designation" rules={[validateRequiredInputField('designation'), validationFieldLetterAndNumber('designation')]}>
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('designation')} maxLength={50} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber} rules={[validateRequiredInputField('mobile number'), validateMobileNoField('mobile number')]} name="mobileNumber">
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('mobile number')} maxLength={10} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <p className={styles.allowedTimingAlignment}>Party Address and Contact Details</p>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.address} label="Address" name="address" rules={[validateRequiredInputField('address')]}>
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('address')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.pinCode} label="Pin Code" name="pinCode" rules={[validateRequiredInputField('pin code'), validatePincodeField('pin code')]}>
                                    <Search disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} onSearch={handleOnSearch} placeholder={preparePlaceholderText('pin code')} maxLength={6} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="City" initialValue={formData?.city} rules={[validateRequiredInputField('city')]} name="city">
                                    <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('city')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.tehsil} label="Tehsil" name="tehsil" rules={[validateRequiredInputField('tehsil'), validateAlphanumericWithSpace('tehsil')]}>
                                    <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('tehsil')} maxLength={6} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="District" initialValue={formData?.district} rules={[validateRequiredInputField('district'), validateAlphanumericWithSpace('district')]} name="district">
                                    <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('district')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.state} label="State" name="state" rules={[validateRequiredInputField('state'), validateAlphanumericWithSpace('state')]}>
                                    <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('state')} maxLength={50} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber1} rules={[validateRequiredInputField('mobile number'), validateMobileNoField('mobile number')]} name="mobileNumber1">
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('mobile number')} maxLength={10} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Alternate Mobile Number" initialValue={formData?.alternateMobileNumber} rules={[validateRequiredInputField('alternate mobile number'), validateMobileNoField('alternate mobile number')]} name="alternateMobileNumber">
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('alternate mobile number')} maxLength={10} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <p className={styles.allowedTimingAlignment}>Other Details</p>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.gstInNumber} label="GSTIN number" name="gstInNumber" rules={[validateRequiredInputField('GSTIN number'), validateGSTIN('GSTIN number')]}>
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('GSTIN number')} maxLength={15} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="PAN" initialValue={formData?.panNumber} rules={[validateRequiredInputField('PAN'), validatePanField('PAN')]} name="panNumber">
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('PAN')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.partsDiscount} label="Parts Discount(%)" name="partsDiscount" rules={[validateRequiredInputField('part discount'), validateOnlyPositiveNumber('part discount'), { validator: (value) => valueBetween0to100(value, 'part discount') }]}>
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('part discount')} maxLength={3} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Credit Limit" initialValue={formData?.creditLimit} rules={[validateRequiredInputField('credit limit'), validateNumberWithTwoDecimalPlaces('credit limit')]} name="creditLimit">
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('credit limit')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Credit Days" initialValue={formData?.creditDays} rules={[validateRequiredInputField('credit days'), validationNumber('credit days')]} name="creditDays">
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('credit days')} maxLength={50} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Remarks" initialValue={formData?.remarks} rules={[validateRequiredInputField('remarks'), validateAlphanumericWithSpace('remarks')]} name="remarks">
                                    <Input disabled={editMode && formData?.partyCategory === 'Principal' ? true : false} className={styles.inputBox} placeholder={preparePlaceholderText('remarks')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                <DrawerFormButton {...buttonProps} />
            </Form>
            <AddressAddEdit {...addressAddEditFormProps} />
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
