/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Form } from 'antd';
import { FilterIcon } from 'Icons';
import { PlusOutlined } from '@ant-design/icons';
import { RxCross2 } from 'react-icons/rx';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { QueryButtons } from 'components/Sales/VehicleRecieptChecklist/QueryButtons';
import { SearchBox } from 'components/utils/SearchBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { QUERY_BUTTONS_CONSTANTS } from './QueryButtons';
import styles from 'assets/sass/app.module.scss';

import { translateContent } from 'utils/translateContent';

export default function ChargerInstallationFilter(props) {
    const { extraParams, removeFilter, typeData, chargerStatusList, searchForm, filterString, setFilterString, handleResetFilter, advanceFilter = false, handleChargerTypeChange, setAdvanceSearchVisible, handleButtonClick, chargerStatus } = props;

    const serachBoxProps = {
        searchForm,
        filterString,
        optionType: typeData?.[PARAM_MASTER.CH_SER.id],
        setFilterString,
        allowClear: false,
    };

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={20} md={20} lg={20} xl={20}>
                    <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={20} lg={20} xl={20} className={styles.verticallyCentered}>
                                <QueryButtons currentItem={chargerStatus} items={chargerStatusList} onClick={handleChargerTypeChange} />
                                <div className={styles.fullWidth}>
                                    <SearchBox {...serachBoxProps} />
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
                                     {translateContent('global.buttons.add')}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                {QUERY_BUTTONS_CONSTANTS.SITE_SURVEY.key === chargerStatus && (
                    <Col xs={24} sm={4} md={4} lg={4} xl={4} className={styles.buttonsGroupRight}>
                        <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                            {translateContent('global.buttons.advancedFilter')}
                        </Button>
                    </Col>
                )}
            </Row>
            {advanceFilter && filterString?.advanceFilter && extraParams.find((i) => i.name) && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                <div className={styles.advanceFilterTitle}>{translateContent('global.advanceFilter.appliedAdvanceFilter')} </div>
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
