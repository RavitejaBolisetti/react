/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Input, Form, Select } from 'antd';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { QueryButtons } from 'components/Sales/VehicleRecieptChecklist/QueryButtons';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import style from 'components/utils/SearchBox/SearchBox.module.scss';

const { Search } = Input;
const { Option } = Select;

export default function VehicleReceiptFilter(props) {
    const { extraParams, removeFilter, handleResetFilter, advanceFilter = false, vehicleReceiptStatusList, filterString, handleReceiptTypeChange, setAdvanceSearchVisible, handleChange, handleSearch } = props;
    const { currentItem, searchForm, parameterName, setParameterName } = props;

    const selectProps = {
        optionFilterProp: 'children',
        allowClear: false,
        className: style.headerSelectField,
    };

    const optionType = [
        {
            key: 'grnNumber',
            value: 'GRN Number',
        },
        {
            key: 'supplierInvoiceNumber',
            value: 'Supplier Invoice Number',
        },
        // {
        //     key: 'vin',
        //     value: 'VIN',
        // },
    ];

    const handleParameterChange = (value) => {
        setParameterName(value);
    };

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={20} md={20} lg={20} xl={20}>
                    <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={20} lg={20} xl={20} className={styles.verticallyCentered}>
                                <QueryButtons currentItem={currentItem} items={vehicleReceiptStatusList} onClick={handleReceiptTypeChange} />
                                <div className={styles.fullWidth}>
                                    <div className={style.selectSearchBg}>
                                        <Form form={searchForm} layout={'vertical'} colon={false} autoComplete="off">
                                            <Form.Item name="searchType" initialValue={parameterName} rules={[validateRequiredSelectField('parameter')]}>
                                                <Select placeholder="Select Parameter" onChange={handleParameterChange} {...selectProps}>
                                                    {optionType?.map((item) => (
                                                        <Option key={'st' + item.key} value={item.key}>
                                                            {item.value}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>

                                            <Form.Item label={''} name={parameterName} validateTrigger={['onChange', 'onSearch']} rules={[validateRequiredInputField('input')]} className={''}>
                                                <Search placeholder={translateContent('global.placeholder.search')} value={filterString?.searchParam} allowClear onChange={handleChange} onSearch={handleSearch} className={style.headerSearchField} />
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={4} lg={4} xl={4} className={styles.verticallyCentered}>
                                <Button
                                    icon={<FilterIcon />}
                                    type="link"
                                    className={styles.verticallyCentered}
                                    onClick={() => {
                                        setAdvanceSearchVisible(true);
                                    }}
                                >
                                    {translateContent('global.advanceFilter.title')}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            {advanceFilter && filterString?.advanceFilter && extraParams.find((i) => i.name) && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                <div className={styles.advanceFilterTitle}>{translateContent('global.advanceFilter.appliedAdvanceFilter')}</div>
                                {extraParams?.map((filter) => {
                                    return (
                                        filter?.value &&
                                        filter?.filter && (
                                            <div className={styles.advanceFilterItem} key={filter?.key}>
                                                {filter?.name}
                                                {filter?.canRemove && (
                                                    <span>
                                                        <RxCross2 onClick={() => removeFilter(filter?.key)} data-testid="removeFilter" />
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    );
                                })}
                            </Col>
                            <Col xs={24} sm={2} md={2} lg={2} xl={2} className={styles.advanceFilterClear}>
                                <Button className={styles.clearBtn} onClick={() => handleResetFilter()} danger>
                                    {translateContent('global.buttons.clear')}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </div>
    );
}
