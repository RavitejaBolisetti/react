import  AddEditForm  from './AddEditForm';

const IndividualProfileBase = (props) => {
    return(
        <>
        <h2>Individual Profile</h2>
        <AddEditForm {...props} />
        </>
    )
}

export const IndividualProfileMaster=IndividualProfileBase;
