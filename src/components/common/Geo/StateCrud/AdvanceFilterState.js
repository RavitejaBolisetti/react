import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row, Select, Input, Button } from 'antd';

import { searchValidator } from 'utils/validation';
import { withModal } from 'components/withModal';

import { geoCountryDataActions } from 'store/actions/data/geo/countries';
import { validateRequiredSelectField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';

const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { token },
        data: {
            Geo: {
                Country: { isLoaded: isDataCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData = [] },
            },
        },
        common: {
            Geo: {
                State: {
                    ListState: { filterString },
                },
            },
        },
    } = state;

    const finalCountryData = countryData?.map((item, index) => {
        return { ...item, default: index <= 0 || false };
    });

    const defaultCountry = finalCountryData && finalCountryData?.find((i) => i.default)?.countryCode;

    return {
        isDataCountryLoaded,
        isCountryLoading,
        countryData: finalCountryData,
        defaultCountry,
        countries: countryData && countryData.filter((item) => item.status),
        unfilteredCountries: countryData,
        token,
        filterString,
        titleOverride: 'kuldeep',
    };
};
const mapDispatchToProps = {
    fetchCountries: geoCountryDataActions.fetchList,
};

export const AdvanceFilterStateForm = (props) => {
    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const { filterString, setFilterString, handleResetFilter, onCloseAction } = props;

    const [advanceFilterForm] = Form.useForm();

    useEffect(() => {
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue({ keyword: undefined });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString?.keyword]);

    const onFinish = (values) => {
        setFilterString({ ...values, advanceFilter: true });
        onCloseAction();
    };

    const onFinishFailed = () => {
        return;
    };

    return (
        <Form layout="vertical" autoComplete="off" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={defaultCountry} label="Country" name="countryCode" rules={[validateRequiredSelectField('Country')]}>
                        {defaultCountry && (
                            <Select defaultValue={defaultCountry} showSearch loading={!isDataCountryLoaded} placeholder="Select" allowClear>
                                {countryData?.map((item) => (
                                    <Option value={item?.countryCode}>{item?.countryName}</Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                        label="State"
                        initialValue={filterString?.keyword}
                        name="keyword"
                        rules={[
                            {
                                validator: searchValidator,
                            },
                        ]}
                        validateTrigger={['onFinish']}
                    >
                        <Input placeholder="Search" maxLength={50} allowClear />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleResetFilter} danger>
                        Reset
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvanceFilterState = withModal(connect(mapStateToProps, mapDispatchToProps)(AdvanceFilterStateForm), { title: 'Advance Filters' });
