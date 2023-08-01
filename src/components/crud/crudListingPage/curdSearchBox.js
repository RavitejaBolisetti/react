/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Row, Col, Form, Input } from 'antd';
import { searchValidator } from 'utils/validation';
import { RxCross2 } from 'react-icons/rx';
import { FilterIcon } from 'Icons';
import styles from 'components/common/Common.module.css';

import { TfiReload } from 'react-icons/tfi';
import { BsDownload } from 'react-icons/bs';

const { Search } = Input;
const CurdSearchBox = (props) => {
    const { addButtonOption, showAddButton = true, advanceFilter = false, title, filterString, listSetFilterString, form, onFinish, onFinishFailed, extraParams, removeFilter, handleClearInSearch, onSearchHandle, setAdvanceSearchVisible, handleReferesh, validator = searchValidator, downloadReport = false, handleDownloadReport = false, showChangeHistoryButton = false, showChangeHistoryList } = props;
    const onKeyPressHandler = (e) => {
        e.key === 'Enter' && e.preventDefault();
    };

    const handleResetFilter = () => {
        listSetFilterString();
        form.resetFields();
        // setShowDataLoading(false);
    };

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                <Form onKeyPress={onKeyPressHandler} autoComplete="off" colon={false} form={form} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                                        <Search placeholder="Search" allowClear className={styles.headerSearchField} onSearch={onSearchHandle} onChange={handleClearInSearch} />
                                    </Form.Item>
                                </Form>
                            </Col>
                            {advanceFilter && (
                                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                    <Button
                                        icon={<FilterIcon />}
                                        type="link"
                                        className={styles.filterBtn}
                                        onClick={() => {
                                            setAdvanceSearchVisible(true);
                                        }}
                                    >
                                        Advanced Filters
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </Col>
                    {(showChangeHistoryButton || showAddButton) && (
                        <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                            {showChangeHistoryButton && (
                                <>
                                    <Button onClick={showChangeHistoryList} type="primary" danger>
                                        Change History
                                    </Button>
                                </>
                            )}

                            {advanceFilter && filterString?.advanceFilter && downloadReport && (
                                <Button icon={<BsDownload />} className={styles.refreshBtn} onClick={handleDownloadReport} danger>
                                    Download
                                </Button>
                            )}
                            <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />
                            {addButtonOption}
                        </Col>
                    )}
                </Row>
                {advanceFilter && filterString?.advanceFilter && (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                    <div className={styles.advanceFilterTitle}>Applied Advance Filters : </div>
                                    {extraParams?.map((filter) => {
                                        return (
                                            filter?.value && (
                                                <div className={styles.advanceFilterItem} key={filter?.key}>
                                                    {filter?.name}
                                                    {filter?.canRemove && (
                                                        <span>
                                                            <RxCross2 onClick={() => removeFilter(filter?.key)} />
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
        </>
    );
};

export default CurdSearchBox;
