// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Table } from 'antd';
// import moment from 'moment';

// import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
// import { convertDateTime } from 'utils/formatDateTime';
// import { tblPrepareColumns } from 'utils/tableCloumn';
// import styles from './ChangeHistory.module.css';



// const sortDateFn = (a, b) => moment(a.ChangeDate, 'YYYY-MM-DD HH:mm:ss') - moment(b.ChangeDate, 'YYYY-MM-DD HH:mm:ss');
// const generalsorter = (a, b) => {
//     if (a.EmployeeName !== undefined) {
//         if (a.EmployeeName > b.EmployeeName) {
//             return 1;
//         } else if (a.EmployeeName < b.EmployeeName) {
//             return -1;
//         } else {
//             return 0;
//         }
//     } else if (a.Code !== undefined) {
//         if (a.Code > b.Code) {
//             return 1;
//         } else if (a.Code < b.Code) {
//             return -1;
//         } else {
//             return 0;
//         }
//     } else if (a.Attribute !== undefined) {
//         if (a.Attribute > b.Attribute) {
//             return 1;
//         } else if (a.Attribute < b.Attribute) {
//             return -1;
//         } else {
//             return 0;
//         }
//     } else if (a.ShortDescription !== undefined) {
//         if (a.ShortDescription > b.ShortDescription) {
//             return 1;
//         } else if (a.Attribute < b.Attribute) {
//             return -1;
//         } else {
//             return 0;
//         }
//     } else {
//         if (a.LongDescription > b.LongDescription) {
//             return 1;
//         } else if (a.LongDescription < b.LongDescription) {
//             return -1;
//         } else {
//             return 0;
//         }
//     }
// };

// const onChange = (pagination, filters, sorter, extra) => {
//     // console.log('params', pagination, filters, sorter, extra);
// };

// const mapStateToProps = (state) => {
//     const {
//         auth: { userId },
//         data: {
//             ManufacturerOrgHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [] },
//         },
//     } = state;

//     let returnValue = {
//         userId,
//         isHistoryLoading,
//         isHistoryLoaded,
//         changeHistoryData,
//     };
//     return returnValue;
// };

// const mapDispatchToProps = (dispatch) => ({
//     dispatch,
//     ...bindActionCreators(
//         {
//             fetchChangeHistoryList: manufacturerOrgHierarchyDataActions.fetchChangeHistoryList,
//             changeHistoryShowLoading: manufacturerOrgHierarchyDataActions.changeHistoryShowLoading,
//         },
//         dispatch
//     ),
// });

// const ManufacturerOrgHierarchyChangeHistoryMain = ({ fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, changeHistoryData }) => {
//     useEffect(() => {
//         if (!isHistoryLoaded) {
//             fetchChangeHistoryList({ setIsLoading: changeHistoryShowLoading, userId });
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [isHistoryLoaded]);

//     const tableColumn = [];

//     tableColumn.push(
//         tblPrepareColumns({
//             title: 'Changed/Modified Date ',
//             dataIndex: 'changedDate',
//             render: (text) => convertDateTime(text),
//             sortFn: sortDateFn,
//         })
//     );

//     tableColumn.push(
//         tblPrepareColumns({
//             title: 'Changed By',
//             dataIndex: 'changedBy',
//         })
//     );

//     tableColumn.push(
//         tblPrepareColumns({
//             title: 'Attribute',
//             dataIndex: 'parentAttributeName',
//             sortFn: generalsorter,
//         })
//     );
//     tableColumn.push(
//         tblPrepareColumns({
//             title: 'Code',
//             dataIndex: 'prodctCode',
//             sortFn: generalsorter,
//         })
//     );
//     tableColumn.push(
//         tblPrepareColumns({
//             title: 'Parent',
//             dataIndex: 'parntHeirarchyCode',
//         })
//     );
//     tableColumn.push(
//         tblPrepareColumns({
//             title: 'Short Description',
//             dataIndex: 'prodctShrtDescription',
//             sortFn: generalsorter,
//         })
//     );

//     tableColumn.push(
//         tblPrepareColumns({
//             title: 'Long Description',
//             dataIndex: 'prodctLongDiscription',
//             sortFn: generalsorter,
//         })
//     );

//     tableColumn.push(
//         tblPrepareColumns({
//             title: 'Status',
//             dataIndex: 'status',
//             filters: [
//                 {
//                     text: 'Active',
//                     value: 'Active',
//                 },
//                 {
//                     text: 'Inactive',
//                     value: 'Inactive',
//                 },
//             ],
//             render: (text) => (text === 'Y' ? 'Active' : 'In Active'),
//             sortFn: generalsorter,
//         })
//     );

//     return (
//         <div className={styles.changeHistoryContainer}>
//             <div>
//                 <h3>Change History</h3>
//             </div>
//             <Table
//                 loading={isLoading}
//                 columns={tableColumn}
//                 onChange={onChange}
//                 dataSource={changeHistoryData}
//                 pagination={{
//                     position: ['bottomLeft'],
//                 }}
//                 scroll={{
//                     x: 'auto',
//                 }}
//             />
//         </div>
//     );
// };

// export const ManufacturerOrgHierarchyChangeHistory = connect(mapStateToProps, mapDispatchToProps)(ManufacturerOrgHierarchyChangeHistoryMain);
