import React, { useReducer, useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';

import { Col, Row, Input, AutoComplete, Divider } from 'antd';
import styles from './../../LeftSideBar/LeftSideBar.module.css';

import LocationCard from './LocationCard';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { debounce } from 'utils/debounce';

import { EN } from 'language/en';

const locationDeleteTitle = EN.GENERAL.REMOVE_DEALER_LOCATION.TITLE;
const locationDeleteMessage = EN.GENERAL.REMOVE_DEALER_LOCATION.MESSAGE.replace('{NAME}', 'Location');
const addDealerLocation = EN.GENERAL.ADD_DEALER_LOCATION.MESSAGE;
const addDealerLocationTitle = EN.GENERAL.ADD_DEALER_LOCATION.TITLE;
const addDuplicateDealerLocation = EN.GENERAL.ADD_DUPLICATE_DEALER_LOCATION.MESSAGE;
const addDuplicateDealerLocationTitle = EN.GENERAL.ADD_DUPLICATE_DEALER_LOCATION.TITLE;

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
            locationDataLoding: applicationMasterDataActions.locationDataLoding,

            showGlobalNotification,
        },
        dispatch
    ),
});

const AccessibleDealerLocationMain = ({ userId, dealerLocations, setFinalFormdata, finalFormdata, fetchDealerLocations, locationDataLoding, showGlobalNotification }) => {
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


    const handleSelect = (value) => {
        let locationDetails = dealerLocations?.find((location) => location?.dealerLocationName === value);
        if (finalFormdata?.accessibleLocation?.findIndex((el) => el?.dealerMasterLocationId === locationDetails?.id) !== -1) {
            showGlobalNotification({ notificationType: 'error', title: addDuplicateDealerLocationTitle, message: addDuplicateDealerLocation,  placement: 'bottomRight' });
            return;
        }
        setFinalFormdata((prev) => ({ ...prev, accessibleLocation: [...finalFormdata?.accessibleLocation, { dealerMasterLocationId: locationDetails?.id, locationName: value, id: '' }] }));
        showGlobalNotification({ notificationType: 'success', title: addDealerLocationTitle, message: addDealerLocation,  placement: 'bottomRight' });
    };

    const onSearchLocation = debounce(function (text) {
        if (text?.length < 3 || !userId) return;
        fetchDealerLocations({ setIsLoading: locationDataLoding, searchParam: text });
    }, 300);

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
        showGlobalNotification({ notificationType: 'success', title: locationDeleteTitle, message: locationDeleteMessage, placement: 'bottomRight' });
        forceUpdate();
    };

    return (
        <Fragment>
            <Divider />
            <Row gap={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <AutoComplete
                        className={styles.searchField}
                        options={dealerLocationsList}
                        backfill={false}
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
