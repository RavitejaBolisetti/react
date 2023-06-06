import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Switch, Select, AutoComplete } from 'antd';
import { validateRequiredInputField, searchValidator, validatePanField, validateTan, validateTin, validateRequiredSelectField, validatePincodeField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';

const { Search, TextArea } = Input;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed, listShowLoading, userId, fetchPincodeDetailsList, dealerParentData } = props;
    const { buttonData, setButtonData, handleButtonClick, pincodeData, fetchPincodeDetail } = props;

    let pincodeObj = [
        {
            city: null,
            tehsil: null,
            district: null,
            state: null,
        },
    ];

    const [pincodeDetails, setPincodeDetails] = useState({ ...pincodeObj });
    const [pincodeShow, setPincodeShow] = useState(false);
    const [options, setOptions] = useState(false);

    useEffect(() => {
        const pinOption = pincodeData?.map((item) => ({
            label: item?.pinCode + ' - ' + item?.localityName + ' -',
            value: item?.pinCode,
            key: item?.id,
        }));
        console.log(pinOption, 'pinOption');
        setOptions(pinOption);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeData]);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    console.log(dealerParentData,'dealerParentDatadealerParentDatadealerParentDatadealerParentDatadealerParentData')

    let groupValue = null;
    let parentGroupId = null;
    const parentName = (values) => {
        console.log(values, 'values');
        if (values === undefined) {
            groupValue = null;
            form.setFieldValue('dealerParentName', groupValue);
            form.setFieldValue('parentId', parentGroupId);
        } else {
            dealerParentData?.map((item) => {
                if (item?.id === values) {
                    groupValue = item?.name;
                    parentGroupId = item?.id;
                    form.setFieldValue('dealerParentName', groupValue);
                    form.setFieldValue('parentId', parentGroupId);
                }
            });
        }
    };

    const onErrorAction = () => {};
    const onSuccessAction = () => {
        // form.setFieldsValue({
        //     stateName: pincodeDetailsData?.state[0].stateName,
        //     name: pincodeDetailsData?.city[0].name,
        //     tehsilName: pincodeDetailsData?.tehsil[0].tehsilName,
        //     districtName: pincodeDetailsData?.district[0].name,
        // });
    };

    const handleOnSelect = (key, option) => {
        const selectedPinCode = pincodeData?.find((i) => i.id === option?.key);
        console.log('🚀 ~ file: AddEditForm.js:84 ~ handleOnSelect ~ selectedPinCode:', selectedPinCode);
        if (selectedPinCode) {
            form.setFieldsValue({
                state: selectedPinCode?.stateName,
                city: selectedPinCode?.cityName,
                tehsil: selectedPinCode?.tehsilName,
                district: selectedPinCode?.districtName,
                locality: selectedPinCode?.localityName,
            });
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
            fetchPincodeDetail({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
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
                                        return <Option value={item?.id}>{item?.code}</Option>;
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Group Name" initialValue={groupValue ? groupValue : formData?.dealerParentName} name="dealerParentName">
                                <Input disabled className={styles.inputBox} placeholder={preparePlaceholderText('Group Name')} />
                            </Form.Item>
                        </Col>
                        {console.log(parentGroupId, 'parentGroupId')}
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                            <Form.Item label="Parent Id" name="parentId" initialValue={formData?.parentId}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyCode} label="Company Code" name="companyCode" rules={[validateRequiredInputField('Company Code'), [{ validator: searchValidator }]]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Company Code')} maxLength={6} disabled={editMode}/>
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
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item initialValue={formData?.pinCode} label="Pin Code" name="pinCode" rules={[validateRequiredInputField('Pin Code'), validatePincodeField('Pin Code')]}>
                                <AutoComplete className={styles.searchField} options={options} onSelect={handleOnSelect} onSearch={handleOnSearch}>
                                    <Input.Search placeholder="Search" style={{ width: '100%' }} allowClear type="text" />
                                </AutoComplete>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={pincodeDetails[0]?.locality} label="Locality" name="locality">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Locality')} disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={pincodeDetails[0]?.city} label="City" name="city">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('City')} disabled />
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row gutter={16}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={pincodeDetails[0]?.tehsil} label="Tehsil" name="tehsil">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Tehsil')} disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={pincodeDetails[0]?.district} label="District" name="district">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('District')} disabled />
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row gutter={16}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={pincodeDetails[0]?.state} label="State" name="state">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('State')} disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyTin} label="TIN" name="companyTin" rules={[validateRequiredInputField('TIN'), validateTin('TIN')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('TIN')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyTan} label="TAN" name="companyTan" rules={[validateRequiredInputField('TAN'), validateTan('TAN')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('TAN')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.companyPan} label="PAN" name="companyPan" rules={[validateRequiredInputField('PAN'), validatePanField('PAN')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('PAN')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
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
