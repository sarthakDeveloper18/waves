import React from 'react';
import UserLayout from '../../hoc/user';
import ManageSiteInfo from './manageSiteInfo';

const ManageSite = () => {
    return ( 
        <UserLayout>
            <ManageSiteInfo/>
        </UserLayout>
    );
}
 
export default ManageSite;