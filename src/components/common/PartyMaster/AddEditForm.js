import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, AutoComplete } from 'antd';

import { validateRequiredInputField, validatePincodeField, validateMobileNoField, validatePanField, validateGSTIN, validateNumberOnly, valueBetween0to100, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { form, formData, recordData, detailData, listShowLoading, userId, fetchDetail, setFormData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed } = props;

    const { typeData, forceUpdate, isVisible } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;

    const { pincodeData, isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail } = props;

    const [options, setOptions] = useState(false);

    const disabledProps = { disabled: editMode && formData?.partyCategory === 'Principal' ? true : false };

    const onErrorAction = (res) => {
        // console.log('error');
    };

    const onSuccessAction = () => {};

    useEffect(() => {
        const pinOption = pincodeData?.map((item) => ({
            label: item?.pinCode + ' - ' + (item?.localityName ? item?.localityName + '-' : '') + item?.cityName + ' -' + item?.districtName + ' -' + item?.stateName,
            value: item?.id,
            key: item?.id,
        }));
        setOptions(pinOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeData]);

    useEffect(() => {
        if (editMode || viewMode) {
            fetchDetail({ setIsLoading: listShowLoading, userId, partyCode: `${recordData?.partyCode}`, onErrorAction });
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

    useEffect(() => {
        setOptions();
    }, [isVisible]);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleOnSelect = (key, option) => {
        const selectedPinCode = pincodeData?.find((i) => i.id === key);
        if (selectedPinCode) {
            form.setFieldsValue({
                pinCode: selectedPinCode?.pinCode,
                state: selectedPinCode?.stateName,
                city: selectedPinCode?.cityName,
                tehsil: selectedPinCode?.tehsilName,
                district: selectedPinCode?.districtName,
                locality: selectedPinCode?.localityName,
            });
            forceUpdate();
        }
    };

    const handleOnSearch = (value) => {
        if (value.length > 5) {
            setOptions();
            const extraParams = [
                {
                    key: 'pincode',
                    value: value,
                },
            ];
            fetchPincodeDetail({ setIsLoading: listPinCodeShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
    };

    const handleOnClear = () => {
        setOptions();
        form.setFieldsValue({
            pinCode: undefined,
            state: undefined,
            city: undefined,
            tehsil: undefined,
            district: undefined,
            locality: undefined,
        });
    };

    const handleOnfocus = (e) => {
        setOptions();
        const extraParams = [
            {
                key: 'pincode',
                value: e.target.value,
            },
        ];
        fetchPincodeDetail({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
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

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    return (
        <>
            <Form layout="vertical" className={styles.formContainer} autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                {viewMode ? (
                    <ViewDetail {...viewProps} />
                ) : (
                    <>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.partyCategory} disabled label="Party Category" name="partyCategory" placeholder={preparePlaceholderSelect('party category')} rules={[validateRequiredInputField('party category')]}>
                                    <Select {...disabledProps} className={styles.headerSelectField} loading={!(typeData?.PTY_CAT?.length !== 0)} placeholder="Select" {...selectProps}>
                                        {typeData?.PTY_CAT?.map((item) => (
                                            <Option value={item?.value}>{item?.value}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Party Code" initialValue={formData?.partyCode} rules={[validateRequiredInputField('party code')]} name="partyCode">
                                    <Input className={styles.inputBox} placeholder={preparePlaceholderText('party code')} maxLength={6} disabled={editMode ? true : false} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.partyName} label="Party Name" name="partyName" rules={[validateRequiredInputField('party name')]}>
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('party name')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Contact Person Name" initialValue={formData?.contactPersonName} rules={[validateRequiredInputField('contact person name')]} name="contactPersonName">
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('contact person name')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.designation} label="Designation" name="designation" rules={[validateRequiredInputField('designation')]}>
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('designation')} maxLength={50} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber} rules={[validateRequiredInputField('mobile number'), validateMobileNoField('mobile number')]} name="mobileNumber">
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('mobile number')} maxLength={10} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.subTitle}>
                                Party Address and Contact Details
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.address} label="Address" name="address" rules={[validateRequiredInputField('address')]}>
                                    <TextArea rows={2} {...disabledProps} placeholder={preparePlaceholderText('Address')} showCount maxLength={255} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.pinCode} label="Pin Code" name="pinCode" rules={[validateRequiredInputField('Pin Code'), validatePincodeField('Pin Code')]}>
                                    <AutoComplete {...disabledProps} className={styles.searchField} options={options} onSelect={handleOnSelect} onFocus={handleOnfocus}>
                                        <Input.Search onSearch={handleOnSearch} onChange={handleOnClear} maxLength={6} placeholder="Search" loading={isPinCodeLoading} style={{ width: '100%' }} type="text" allowClear />
                                    </AutoComplete>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            {/* <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Locality" initialValue={formData?.locality} rules={[validateRequiredInputField('locality name')]} name="locality">
                                    <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('locality name')} maxLength={50} />
                                </Form.Item>
                            </Col> */}
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="City" initialValue={formData?.city} rules={[validateRequiredInputField('city')]} name="city">
                                    <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('city')} maxLength={50} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.tehsil} label="Tehsil" name="tehsil" rules={[validateRequiredInputField('tehsil')]}>
                                    <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('tehsil')} maxLength={6} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="District" initialValue={formData?.district} rules={[validateRequiredInputField('district')]} name="district">
                                    <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('district')} maxLength={50} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.state} label="State" name="state" rules={[validateRequiredInputField('state')]}>
                                    <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('state')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber1} rules={[validateRequiredInputField('mobile number'), validateMobileNoField('mobile number')]} name="mobileNumber1">
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('mobile number')} maxLength={10} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Alternate Mobile Number" initialValue={formData?.alternateMobileNumber} rules={[validateRequiredInputField('alternate mobile number'), validateMobileNoField('alternate mobile number')]} name="alternateMobileNumber">
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('alternate mobile number')} maxLength={10} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.subTitle}>
                                Other Details
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.gstInNumber} label="GSTIN number" name="gstInNumber" rules={[validateRequiredInputField('GSTIN number'), validateGSTIN('GSTIN number')]}>
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('GSTIN number')} maxLength={15} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="PAN" initialValue={formData?.panNumber} rules={[validateRequiredInputField('PAN'), validatePanField('PAN')]} name="panNumber">
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('PAN')} maxLength={10} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.partsDiscount} label="Parts Discount(%)" name="partsDiscount" rules={[validateRequiredInputField('part discount'), validateNumberOnly('part discount'), { validator: (value) => valueBetween0to100(value, 'part discount') }]}>
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('part discount')} maxLength={3} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Credit Limit" initialValue={formData?.creditLimit} rules={[validateRequiredInputField('credit limit'), validateNumberWithTwoDecimalPlaces('credit limit')]} name="creditLimit">
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('credit limit')} maxLength={15} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Credit Days" initialValue={formData?.creditDays} rules={[validateRequiredInputField('credit days'), validateNumberOnly('credit days')]} name="creditDays">
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('credit days')} maxLength={4} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label="Remarks" initialValue={formData?.remarks} rules={[validateRequiredInputField('remarks')]} name="remarks">
                                    <Input {...disabledProps} className={styles.inputBox} placeholder={preparePlaceholderText('remarks')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                <DrawerFormButton {...buttonProps} />
            </Form>
            {/* <AddressAddEdit {...addressAddEditFormProps} /> */}
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
