import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Switch, Select, AutoComplete } from 'antd';
import { validateRequiredInputField, searchValidator, validatePanField, validateTan, validateTin, validateRequiredSelectField, validatePincodeField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';

const { TextArea } = Input;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed, listShowLoading, userId, dealerParentData } = props;
    const { buttonData, setButtonData, handleButtonClick, pincodeData, fetchPincodeDetail,isPinCodeLoading,forceUpdate,pinCodeShowLoading } = props;

    const [options, setOptions] = useState(false);

    useEffect(() => {
        const pinOption = pincodeData?.map((item) => ({
            label: item?.pinCode + ' - ' + (item?.localityName ? item?.localityName + '-' : '') + item?.cityName + ' - ' + item?.tehsilName + ' - ' + item?.districtName + ' - ' + item?.stateName,
            value: item?.id,
            key: item?.id,
        }));
        setOptions(pinOption);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeData]);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    let groupValue = null;
    let parentGroupId = null;
    const parentName = (values) => {
        if (values === undefined) {
            groupValue = null;
            form.setFieldValue('dealerParentName', groupValue);
            form.setFieldValue('parentId', parentGroupId);
        } else {
            dealerParentData?.map((item) => {
                if (item?.code === values) {
                    groupValue = item?.name;
                    parentGroupId = item?.id;
                    form.setFieldValue('dealerParentName', groupValue);
                    form.setFieldValue('parentId', parentGroupId);
                }
            });
        }
    };

    const onErrorAction = () => {};
    const onSuccessAction = () => {};

    const handleOnSelect = (key) => {
        console.log(key,'key')
        console.log(pincodeData,'1')
        const selectedPinCode = pincodeData?.find((i) => i.id === key);
        console.log(selectedPinCode,'selectedPinCodeselectedPinCode')
        if (selectedPinCode) {
            form.setFieldsValue({
                pinCode: selectedPinCode?.pinCode,

                stateCode: selectedPinCode?.stateCode,
                cityCode: selectedPinCode?.cityCode,
                tehsilCode: selectedPinCode?.tehsilCode,
                districtCode: selectedPinCode?.districtCode,

                stateName: selectedPinCode?.stateName,
                cityName: selectedPinCode?.cityName,
                tehsilName: selectedPinCode?.tehsilName,
                districtName: selectedPinCode?.districtName,
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
            fetchPincodeDetail({ setIsLoading: pinCodeShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
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
        <Form layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {viewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.parentCode} label="Group Code" rules={[validateRequiredSelectField('Group Code')]} name="parentCode">
                                <Select
                                    placeholder={preparePlaceholderSelect('Group Code')}
                                    style={{
                                        width: '100%',
                                    }}
                                    {...selectProps}
                                    onChange={parentName}
                                    disabled={editMode}
                                >
                                    {dealerParentData?.map((item) => {
                                        return <Option value={item?.code}>{item?.code}</Option>;
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Group Name" initialValue={groupValue ? groupValue : formData?.dealerParentName} name="dealerParentName">
                                <Input disabled className={styles.inputBox} placeholder={preparePlaceholderText('Group Name')} />
                            </Form.Item>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                            <Form.Item label="Parent Id" name="parentId" initialValue={formData?.parentId}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyCode} label="Company Code" name="companyCode" rules={[validateRequiredInputField('Company Code'), [{ validator: searchValidator }]]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Company Code')} maxLength={6} disabled={editMode} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyName} label="Company Name" name="companyName" rules={[validateRequiredInputField('Company Name')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Company Name')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.address} label="Company Address" name="address" rules={[validateRequiredInputField('Company Address')]}>
                                <TextArea rows={2} placeholder={preparePlaceholderText('Company Address')} showCount maxLength={255} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.pinCode} label="Pin Code" name="pinCode" rules={[validateRequiredInputField('Pin Code'), validatePincodeField('Pin Code')]} 
                                validateTrigger={['onFinish']}
                            >
                                <AutoComplete className={styles.inputBox} options={options} onSelect={handleOnSelect} onSearch={handleOnSearch}>
                                    <Input.Search placeholder="Search" style={{ width: '100%' }} allowClear type="text" maxLength={6} />
                                </AutoComplete>
                            </Form.Item>
                        </Col> */}

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.pinCode} label="Pin Code" name="pinCode" rules={[validateRequiredInputField('Pin Code'), validatePincodeField('Pin Code')]}>
                                    <AutoComplete className={styles.searchField} options={options} onSelect={handleOnSelect} onFocus={handleOnfocus}>
                                        <Input.Search onSearch={handleOnSearch} onChange={handleOnClear} maxLength={6} placeholder="Search" loading={isPinCodeLoading} style={{ width: '100%' }} type="text" allowClear />
                                    </AutoComplete>
                                </Form.Item>
                            </Col>
                    </Row>

                    <Row gutter={16}>
                        {/* <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={pincodeDetails[0]?.locality} label="Locality" name="locality">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Locality')} disabled />
                            </Form.Item>
                        </Col> */}
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                            <Form.Item initialValue={formData?.cityCode} label="City" name="cityCode">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('City')} disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                            <Form.Item initialValue={formData?.tehsilCode} label="Tehsil" name="tehsilCode">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Tehsil')} disabled />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.cityName} label="City" name="cityName">
                                <Input className={styles.inputBox} placeholder='City' disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.tehsilName} label="Tehsil" name="tehsilName">
                                <Input className={styles.inputBox} placeholder='Tehsil' disabled />
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row gutter={16}>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                            <Form.Item initialValue={formData?.districtCode} label="District" name="districtCode">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('District')} disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                            <Form.Item initialValue={formData?.stateCode} label="State" name="stateCode">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('State')} disabled />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.districtName} label="District" name="districtName">
                                <Input className={styles.inputBox} placeholder='District' disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.stateName} label="State" name="stateName">
                                <Input className={styles.inputBox} placeholder='State' disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyTin} label="TIN" name="companyTin" rules={[validateRequiredInputField('TIN'), validateTin('TIN')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('TIN')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyTan} label="TAN" name="companyTan" rules={[validateRequiredInputField('TAN'), validateTan('TAN')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('TAN')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyPan} label="PAN" name="companyPan" rules={[validateRequiredInputField('PAN'), validatePanField('PAN')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('PAN')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Row gutter={16}></Row> */}
                </>
            )}

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
