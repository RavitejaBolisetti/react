import { Button, Row, Col, Form } from 'antd';
import { RxCross2 } from 'react-icons/rx';
import { FilterIcon } from 'Icons';
import { PlusOutlined } from '@ant-design/icons';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { SearchBox } from 'components/utils/SearchBox';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import TreeSelectField from 'components/common/TreeSelectField';
import { ProductModelHierarchy } from 'components/utils/ProductModelHierarchy';

export default function AppliedAdvanceFilter(props) {
    const { showAddButton = true, advanceFilter = false, title, handleButtonClick, filterString, extraParams, removeFilter, handleResetFilter, setAdvanceSearchVisible, setFilterString, productHierarchyData } = props;
    const [searchForm] = Form.useForm();

    const treeSelectFieldProps = {
        treeFieldNames: { label: 'prodctShrtName', value: 'prodctCode', children: 'subProdct' },
        treeData: productHierarchyData,
        defaultParent: false,
        handleSelectTreeClick: () => {},
        defaultValue: null,
        placeholder: preparePlaceholderSelect('search by product'),
        filterString,
        name: 'model',
        labelName: false,
    };
    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                            <Form.Item label={`${title}`}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <ProductModelHierarchy {...treeSelectFieldProps} />
                                    </Col>

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
                                                {translateContent('global.advanceFilter.title')}
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
                                {translateContent('global.buttons.add')}
                            </Button>
                        </Col>
                    )}
                </Row>

                {advanceFilter && filterString?.advanceFilter && extraParams?.find((i) => i.value && i.filter) && (
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
        </>
    );
}
