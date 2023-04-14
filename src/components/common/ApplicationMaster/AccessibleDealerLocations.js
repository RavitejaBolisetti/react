import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addToolTip } from 'utils/customMenuLink';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { FaTrash, FaPlus } from 'react-icons/fa';

import { Button, Col, Row, Form, Select, Modal, Input, Switch, Space } from 'antd';

import styles from 'components/common/Common.module.css';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { DataTable } from 'utils/dataTable';
import { Fragment } from 'react';
import LocationCard from './LocationCard';

const { confirm } = Modal;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ApplicationMaster: { applicationCriticalityGroupData: criticalityGroupData, applicationDetailsData, dealerLocations },
        },
    } = state;

    let returnValue = {
        criticalityGroupData,
        applicationDetailsData,
        dealerLocations,
    };
    return returnValue;
};

const existingLocation = [
    {
        id: '1321',
        locationCode: 'uuid1',
        locationName: 'Location uuid1',
    },
    {
        id: '1321',
        locationCode: 'uuid2',
        locationName: 'Location 3',
    },
    {
        id: '3',
        locationCode: 'uuid3',
        locationName: 'Location 3',
    },
];

const AccessibleDealerLocations = ({ form, isReadOnly, formActionType, dealerLocations, setFinalFormdata, finalFormdata }) => {
    // const [locationData, setLocationData] = useState([]);

    const fieldNames = { label: 'locationName', value: 'id' };

    const handleSelect = (value) => {
        // setLocationData((prev) => [...prev, { id: value?.key, locationName: value?.label }]);
        setFinalFormdata(prev => ({ ...prev, accessibleLocation: [...finalFormdata?.accessibleLocation, { id: value?.key, locationName: value?.label }] }));
    };
    const handleDeleteLocation =(values) => {

        setFinalFormdata(prev =>{
            const prevData = prev;
            const index = prev?.accessibleLocation?.findIndex(el => el.locationCode === values.locationCode);
            prevData?.accessibleLocation?.splice(index, 1);
            return prevData;
        })
    };

    return (
        <Fragment>
            <Row gap={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Select
                        // defaultValue={record[dataIndex]}
                        getPopupContainer={(triggerNode) => triggerNode.parentElement}
                        labelInValue
                        showSearch
                        placeholder="Select accesable location"
                        optionFilterProp="children"
                        fieldNames={fieldNames}
                        style={{
                            width: '100%',
                        }}
                        onSelect={handleSelect}
                        // onSearch={onSearch}
                        filterOption={(input, option) => (option?.locationName ?? '').toLowerCase().includes(input.toLowerCase())}
                        options={existingLocation}
                    />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {finalFormdata?.accessibleLocation?.length > 0
                        ? finalFormdata?.accessibleLocation?.map((location) => {
                              return <LocationCard {...location} handleDeleteLocation={handleDeleteLocation} />;
                          })
                        : ''
                        }
                </Col>
            </Row>
        </Fragment>
    );
};

export default AccessibleDealerLocations;
