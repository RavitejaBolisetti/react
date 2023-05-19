import { Button, Row, Col } from 'antd';
import { RxCross2 } from 'react-icons/rx';
import styles from './AppliedAdvanceFilter.module.css';

export default function AppliedAdvanceFilter(props) {
    const { filterString, extraParams, removeFilter, handleResetFilter } = props;
    return (
        filterString?.advanceFilter && (
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                            <div className={styles.advanceFilterTitle}>Applied Advance Filters : </div>
                        </Col>
                        <Col xs={24} sm={22} md={22} lg={18} xl={18} className={styles.advanceFilterContainer}>
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
                            <Button className={styles.clearBtn} onClick={handleResetFilter} danger>
                                Clear
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    );
}
