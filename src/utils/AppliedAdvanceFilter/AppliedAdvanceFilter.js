/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Row, Col, Form, Input } from 'antd';
import { searchValidator } from 'utils/validation';
import { RxCross2 } from 'react-icons/rx';
import { FaHistory } from 'react-icons/fa';
import { FilterIcon } from 'Icons';
import styles from 'assets/sass/app.module.scss';

import { TfiReload } from 'react-icons/tfi';
import { BsDownload } from 'react-icons/bs';
import { PlusOutlined } from '@ant-design/icons';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { translateContent } from 'utils/translateContent';
import TreeSelectField from 'components/common/TreeSelectField';

const { Search } = Input;
export default function AppliedAdvanceFilter(props) {
    const { tableData = [], showAddButton = true,showRefreshBtn=true, advanceFilter = false, title, filterString, from, onFinish, onFinishFailed, extraParams, removeFilter, handleResetFilter, handleClearInSearch, onSearchHandle, setAdvanceSearchVisible, handleReferesh, handleButtonClick, validator = searchValidator, downloadReport = false, handleDownloadReport = false, showChangeHistoryButton = false, showChangeHistoryList } = props;
    const { addBtnVisible=false } = props;

    const treeSelectFieldProps = {...props}
    
    const onKeyPressHandler = (e) => {
        e.key === 'Enter' && e.preventDefault();
    };

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                <Form onKeyPress={onKeyPressHandler} autoComplete="off" colon={false} form={from} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                    <Form.Item
                                        label={`${title}`}
                                        name="code"
                                        rules={[
                                            {
                                                validator: validator,
                                            },
                                        ]}
                                        validateTrigger={['onSearch']}
                                    >
                                         {/* <TreeSelectField {...treeSelectFieldProps} /> */}
                                        <Search placeholder={translateContent('global.placeholder.search')} allowClear onSearch={onSearchHandle} onChange={handleClearInSearch} />
                                    </Form.Item>
                                </Form>
                            </Col>
                            {advanceFilter && (
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.verticallyCentered}>
                                    <Button
                                        data-testid="advanceFiltersBtn"
                                        icon={<FilterIcon />}
                                        className={styles.verticallyCentered}
                                        type="link"
                                        onClick={() => {
                                            setAdvanceSearchVisible(true);
                                        }}
                                    >
                                        {translateContent('global.advanceFilter.title')}
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </Col>
                    <Col className={styles.buttonsGroupRight} xs={24} sm={24} md={8} lg={8} xl={8}>
                        {showChangeHistoryButton && (
                            <>
                                <Button icon={<FaHistory />} className={styles.verticallyCentered} onClick={showChangeHistoryList} type="primary">
                                    {translateContent('global.changeHistory.title')}
                                </Button>
                            </>
                        )}

                        {advanceFilter && filterString?.advanceFilter && downloadReport && (
                            <Button data-testid="downloadBtn" icon={<BsDownload />} onClick={handleDownloadReport} danger>
                                {translateContent('global.buttons.download')}
                            </Button>
                        )}

                        {(tableData?.length > 0 || addBtnVisible)  && (
                            <>
                                {showRefreshBtn && <Button icon={<TfiReload />} onClick={handleReferesh} data-testid="refreshBtn" danger />}
                                {showAddButton && (
                                    <Button icon={<PlusOutlined />} type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                        {translateContent('global.buttons.add')}
                                    </Button>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
                {advanceFilter && filterString?.advanceFilter && (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                    <div className={styles.advanceFilterTitle}>{translateContent('global.advanceFilter.appliedAdvanceFilter')}</div>
                                    {extraParams
                                        ?.filter((item, index) => index <= 5)
                                        ?.map((filter) => {
                                            return (
                                                filter?.value && (
                                                    <div className={styles.advanceFilterItem} key={'rms' + filter?.key}>
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
                                    <Button data-testid="clearBtn" className={styles.clearBtn} onClick={() => handleResetFilter()} danger>
                                        {translateContent('global.buttons.clear')}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
            </div>
        </>
    );
}
