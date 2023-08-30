import React, { useEffect } from 'react';
import { Alert, Form, Input, Switch, Row, Col, message as antMessage, Select } from 'antd';
import { connect } from 'react-redux';

import { geoCountryDataActions } from 'store/actions/data/geo/countries';
// import { handleCheckUniqueFieldsCommon } from 'utils/checkIfExists';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber, validateAlphanumericWithSpace, validationNumber } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const Option = Select.Option;
const mapStateToProps = (state) => {
    const {
        auth: { token },
        data: {
            Geo: {
                Country: { isLoaded: isCountryLoaded = false, data: countryData = [] },
            },
        },
    } = state;

    return {
        isCountryLoaded,
        countries: countryData && countryData.filter((item) => item.status),
        unfilteredCountries: countryData,
        defaultCountry: 'IND',
        token,
    };
};

const mapDispatchToProps = {
    fetchCountries: geoCountryDataActions.fetchList,
};

export const AddEditFormBase = (props) => {
    const { closeActionError, closeActionSuccess, editMode = false } = props;
    const { isError, isAdded, message, data: state, isCountryLoaded, countries, fetchCountries, unfilteredCountries, defaultCountry } = props;

    const sortedCountries = countries && countries.sort((a, b) => (a.countryName > b.countryName ? 1 : a.countryName < b.countryName ? -1 : 0));
    useEffect(() => {
        if (!isCountryLoaded) {
            fetchCountries({
                setIsLoading: () => {},
                errorAction: () => {
                    antMessage.error('Error');
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let countryFieldDecoratorOptions = {
        rules: [validateRequiredSelectField('Country')],
    };

    if (isCountryLoaded && state && state.countryCode) {
        if (sortedCountries.find((country) => country.countryCode === state.countryCode)) {
            countryFieldDecoratorOptions.initialValue = state.countryCode;
        } else {
            const stateCountry = unfilteredCountries.find((country) => country.countryCode === state.countryCode);
            if (stateCountry) {
                countryFieldDecoratorOptions.initialValue = stateCountry.countryName;
                countryFieldDecoratorOptions.rules.push({ type: 'number', message: stateCountry.countryName + ' is not active anymore. Please select a different country. ' });
            }
        }
    }

    // const handleCheckIfExists = handleCheckUniqueFieldsCommon({ urlString: 'countries' })(props.token);

    return (
        <div className={styles.addEditFormSection}>
            {isError ? <Alert message={message} type="error" closable={true} onClose={closeActionError} /> : ''}
            {isAdded ? <Alert message={message} type="info" closable={true} onClose={closeActionSuccess} /> : ''}

            <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={state?.countryCode || defaultCountry} disabled label="Country" name="countryCode" placeholder={preparePlaceholderSelect('Country')} rules={[validateRequiredInputField('Country')]}>
                        <Select showSearch loading={!isCountryLoaded} placeholder="Select" allowClear disabled={true}>
                            {countries?.map((item) => (
                                <Option value={item?.countryCode}>{item?.countryName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={state?.code} label="State Code" name="code" rules={[validateRequiredInputField('State Code'), validationFieldLetterAndNumber('State Code')]}>
                        <Input placeholder={preparePlaceholderText('State Code')} maxLength={6} disabled={editMode ? true : false} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="State Name" initialValue={state?.name} rules={[validateRequiredInputField('State Name'), validateAlphanumericWithSpace('State Name')]} name="name">
                        <Input placeholder={preparePlaceholderText('State Name')} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={state?.gstStateCode} label="GST State Code" name="gstStateCode" rules={[validateRequiredInputField('gst state code'), validationNumber('gst state code')]}>
                        <Input placeholder={preparePlaceholderText('State Code')} maxLength={2} disabled={editMode ? true : false} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={editMode ? state?.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );
};

export const AddEditForm = connect(mapStateToProps, mapDispatchToProps)(AddEditFormBase);
