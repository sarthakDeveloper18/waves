import React from 'react';
import UserLayout from '../../hoc/user'
import ManageBrands from './manageBrand';
import ManageWoods from './manageWoods';

const ManageCategories = () => {
    return ( 
        <UserLayout>
            <ManageBrands/>
            <ManageWoods/>
        </UserLayout>
    );
}
 
export default ManageCategories;