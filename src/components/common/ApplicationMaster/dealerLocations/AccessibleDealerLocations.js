import React, { useReducer, useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';

import { Col, Row, Input, AutoComplete, Divider } from 'antd';
// import styles from './../../../common/Common.module.css';
import styles from './../../LeftSideBar/LeftSideBar.module.css';

import LocationCard from './LocationCard';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { debounce } from 'utils/debounce';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ApplicationMaster: { dealerLocations = [] },
        },
    } = state;

    let returnValue = {
        userId,
        dealerLocations,
    };
    return returnValue;
};
const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDealerLocations: applicationMasterDataActions.fetchDealerLocations,
            applicationMasterDataShowLoading: applicationMasterDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const AccessibleDealerLocationMain = ({ userId, dealerLocations, setFinalFormdata, finalFormdata, fetchDealerLocations, applicationMasterDataShowLoading, showGlobalNotification }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [searchValue, setSearchValue] = useState('');
    const [dealerLocationsList, setDealerLocationList] = useState([]);

    const highlightFinalLocatonList = useMemo(
        () => (data) => {
            if (data?.length < 1) return [];
            let finalLocations = data?.map((item) => {
                const index = item?.dealerLocationName?.toLowerCase().indexOf(searchValue);
                const beforeStr = index > 1 ? item?.dealerLocationName?.substring(0, 1).toUpperCase() + item?.dealerLocationName?.substring(1, index) : '';
                const searchString = index <= 1 ? searchValue?.substring(0, 1).toUpperCase() + searchValue?.substring(1, searchValue?.length)?.toLocaleLowerCase() : searchValue;
                const afterStr = item?.dealerLocationName?.slice(index + searchValue?.length);

                let locatonName =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className="site-tree-search-value" style={{ color: 'red' }}>
                                {searchString}
                            </span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{item?.dealerLocationName}</span>
                    );
                return {
                    // key: item?.id,
                    value: item?.dealerLocationName,
                    label: locatonName,
                };
            });

            setDealerLocationList([...finalLocations]);
        },
        [dealerLocations]
    );

    useEffect(() => {
        if (dealerLocations?.length < 1 || !searchValue?.length >= 3) {
            setDealerLocationList([]);
        } else {
            highlightFinalLocatonList(dealerLocations);
        }
    }, [dealerLocations, searchValue]);

    // const fieldNames = { value: 'dealerLocationName', key: 'id' };

    const handleSelect = (value) => {
        let locationDetails = dealerLocations?.find((location) => location?.dealerLocationName === value);
        if (finalFormdata?.accessibleLocation?.findIndex((el) => el?.dealerMasterLocationId === locationDetails?.id) !== -1) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'This location is already added.' });
            return;
        }
        setFinalFormdata((prev) => ({ ...prev, accessibleLocation: [...finalFormdata?.accessibleLocation, { dealerMasterLocationId: locationDetails?.id, locationName: value, id: '' }] }));
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Location added successfully' });
    };

    const onSearchLocation = debounce(function (text) {
        if (text?.length < 3 || !userId) return;
        fetchDealerLocations({ setIsLoading: applicationMasterDataShowLoading, searchParam: text });
    }, 500);

    // function onSearchLocation(text){
    //     if (text?.length < 3 || !userId) return;
    //         debounce(() => {
    //         console.log("text",text)
    //          return fetchDealerLocations({ setIsLoading: applicationMasterDataShowLoading, searchParam: text });
    //     }, 500)
    // };

    const handleChange = (text) => {
        setSearchValue(text?.trim());
    };

    const handleDeleteLocation = (values) => {
        setFinalFormdata((prev) => {
            const prevData = prev;
            const index = prev?.accessibleLocation?.findIndex((el) => el?.locationName === values?.locationName);
            prevData?.accessibleLocation?.splice(index, 1);
            return prevData;
        });
        showGlobalNotification({ notificationType: 'success', title: 'Delete', message: 'Location deleted sucessfully.' });
        forceUpdate();
    };

    return (
        <Fragment>
            <Divider />
            <Row gap={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <AutoComplete
                        // className={`${styles.headerSearchField} ${style.autoCompleteBtn}`}
                        className={styles.searchField}
                        options={dealerLocationsList}
                        backfill={false}
                        style={{
                            width: '100%',
                        }}
                        onSelect={handleSelect}
                        onSearch={onSearchLocation}
                        onChange={handleChange}
                        allowSearch
                        notFoundContent="No location found"
                    >
                        <Input.Search size="large" allowClear placeholder={preparePlaceholderAutoComplete('')} />
                    </AutoComplete>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {finalFormdata?.accessibleLocation?.length > 0
                        ? finalFormdata?.accessibleLocation?.map((location) => {
                            return <LocationCard {...location} handleDeleteLocation={handleDeleteLocation} />;
                        })
                        : ''}
                </Col>
            </Row>
        </Fragment>
    );
};

export const AccessibleDealerLocations = connect(mapStateToProps, mapDispatchToProps)(AccessibleDealerLocationMain);
