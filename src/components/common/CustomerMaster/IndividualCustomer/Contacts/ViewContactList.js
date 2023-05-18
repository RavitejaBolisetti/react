import React from 'react';
import { ViewDetail } from './ViewContactDetails';

const ViewContactList = (formProps) => {
    const {  styles, contactData, setContactData, formData, onFinish} = formProps;

    return (
        <div>
           {formProps?.contactData?.map(data =>  <ViewDetail styles={styles} {...data} /> )}
        </div>
    );
};

export default ViewContactList;
