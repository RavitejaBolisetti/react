/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Form, Tabs } from 'antd';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { QueryButtons } from 'components/Sales/VehicleRecieptChecklist/QueryButtons';
import { SearchBox } from 'components/utils/SearchBox';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'assets/sass/app.module.scss';
import { DELIVERY_TYPE } from 'constants/modules/vehicleDetailsNotes.js/deliveryType';


export default function VehicleDeliveryNoteFilter(props) {
    const { deliveryType, extraParams, removeFilter, searchForm, typeData, filterString, deliveryStatusList, onDeliveryTabChange, setFilterString, handleResetFilter, advanceFilter = false, handleDeliveryNoteTypeChange, setAdvanceSearchVisible, handleButtonClick, deliveryStatus } = props;

    const serachBoxProps = {
        searchForm,
        filterString,
        optionType: typeData?.[PARAM_MASTER.DLVR_SER.id],
        setFilterString,
    };

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.navTab}>
                    <Tabs
                        defaultActiveKey={DELIVERY_TYPE.NOTE.key}
                        activeKey={deliveryType}
                        onChange={onDeliveryTabChange}
                        items={Object.values(DELIVERY_TYPE)?.map((item) => ({
                            key: item?.key,
                            label: <>{item?.title}</>,
                        }))}
                    />
                </Col>
                <Col xs={24} sm={20} md={20} lg={20} xl={20}>
                    <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={18} lg={18} xl={18} className={styles.verticallyCentered}>
                                <QueryButtons currentItem={deliveryStatus} items={deliveryStatusList} onClick={handleDeliveryNoteTypeChange} />
                                <div className={styles.fullWidth}>
                                    <SearchBox {...serachBoxProps} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.verticallyCentered}>
                                <Button
                                    icon={<FilterIcon />}
                                    type="link"
                                    className={styles.verticallyCentered}
                                    onClick={() => {
                                        setAdvanceSearchVisible(true);
                                    }}
                                >
                                    Advanced Filters
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                {/* <Col xs={24} sm={4} md={4} lg={4} xl={4} className={styles.buttonsGroupRight}>
                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                        Add
                    </Button>
                </Col> */}
            </Row>
            {advanceFilter && filterString?.advanceFilter && extraParams.find((i) => i.name) && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                <div className={styles.advanceFilterTitle}>Applied Advance Filters : </div>
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
                                    Clear
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </div>
    );
}
