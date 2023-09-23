/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Row, Col, Form } from 'antd';
import { RxCross2 } from 'react-icons/rx';
import { FilterIcon } from 'Icons';
import { PlusOutlined } from '@ant-design/icons';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { SearchBox } from 'components/utils/SearchBox';

import styles from 'assets/sass/app.module.scss';

export default function AppliedAdvanceFilter(props) {
    const { showAddButton = true, advanceFilter = false, title, handleButtonClick, filterString, extraParams, removeFilter, handleResetFilter, setAdvanceSearchVisible, setFilterString, vpoFilter = false, typeData } = props;
    const [searchForm] = Form.useForm();

    const searchBoxProps = {
        singleField: true,
        searchForm,
        filterString,
        setFilterString,
        placeholder: 'Search By Vehicle Purchase Order',
        singleFieldKey: 'purchaseOrderNumber',
    };
    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                            <Form.Item label={`${title}`}>
                                <Row gutter={20}>
                                    {vpoFilter && (
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <SearchBox {...searchBoxProps} />
                                        </Col>
                                    )}
                                    {advanceFilter && (
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
                                    )}
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                    {showAddButton && (
                        <Col className={styles.buttonsGroupRight} xs={24} sm={24} md={6} lg={6} xl={6}>
                            <Button icon={<PlusOutlined />} type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                Add
                            </Button>
                        </Col>
                    )}
                </Row>

                {advanceFilter && filterString?.advanceFilter && extraParams?.find((i) => i.value && i.filter) && (
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
                                                            <RxCross2 onClick={() => removeFilter(filter?.key)} data-testid="removeBtn" />
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
}
