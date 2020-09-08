import React from 'react';
import UserLayout from '../../hoc/user';
import UpdatePersonalInfo from './updatePersonalInfo'

const UpdateProfile = () => {
    return ( 
        <UserLayout>
            <UpdatePersonalInfo/>
        </UserLayout>
    );
}
 
export default UpdateProfile;