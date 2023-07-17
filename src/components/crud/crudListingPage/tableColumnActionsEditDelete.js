import { Modal, message as antMessage } from 'antd';
import { tableColumnActions } from 'utils/tableColumn';
import { handleEdit, handleCustomEdit } from 'components/crud/crudListingPage/tableColumnActionEdit';

const confirm = Modal.confirm;

export const handleDelete = (props) => (record) => () => {
    const { deleteMultipleList, listShowLoading, listFetchError, listUnSetSeletedData, studySpecific, match, moduleType, siteSpecific, submissionId, userId, courseSpecific, additionalFilter, languageId } = props;
    confirm({
        title: 'Are you sure you want to delete?',
        onOk() {
            deleteMultipleList({
                selectedData: [record.id],
                setIsLoading: listShowLoading,
                errorAction: listFetchError,
                unSetSeletData: listUnSetSeletedData,
                studyId: studySpecific ? match.params.studyId : undefined,
                siteId: siteSpecific ? match.params.siteId : undefined,
                submissionType: props.submissionType,
                submissionId: submissionId,
                languageId: languageId,
                moduleType,
                userId,
                courseId: courseSpecific ? match?.params?.courseId : undefined,
                warningAction: (message) => antMessage.error(message),
                additionalFilter: additionalFilter,
            });
        },
    });
};

const tableColumnActionsEditDeleteBase =
    ({ handleEditFn = handleEdit, handleDeleteFn = handleDelete } = {}) =>
    ({ title }) =>
    (props) => {
        const { canEditMaster, canDeleteMaster } = props;

        const customActions = [];
        if (canEditMaster) {
            customActions.push({ title: 'Edit', handler: handleEditFn });
        }
        if (canDeleteMaster) {
            customActions.push({ title: 'Delete', handler: handleDeleteFn });
        }
        return tableColumnActions({ title, customActions })(props);
    };
export const tableColumnActionsEditDelete = tableColumnActionsEditDeleteBase();
export const tableColumnCustomActionsEditDelete = tableColumnActionsEditDeleteBase({ handleEditFn: handleCustomEdit });
