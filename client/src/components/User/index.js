import React from 'react';
import UserLayout from '../../hoc/user';
import Button from '../utils/button';
import { connect } from 'react-redux';
import HistoryBlock from '../utils/history_block';

const UserDashboard = (props) => {
    return ( 
        <UserLayout>
            <div>
                <div className = 'user_nfo_panel'>
                    <h1>User Information</h1>
                    <div>
                        <span>{props.user.name}</span>
                        <span>{props.user.lastname}</span>
                        <span>{props.user.email}</span>
                    </div>
                    <Button type = 'default' title = 'Edit Account Info' linkTo = '/user/user_profile'></Button>
                </div>
                {
                    props.userInfo.userData.history ?
                    <div className = 'user_nfo_panel'>
                        <h1>History Purchases</h1>
                        <div className = 'user_product_block_wrapper'>
                            <HistoryBlock products = {props.userInfo.userData.history}/>
                        </div>
                    </div> : null
                }
            </div>
        </UserLayout>
    );
}

function mapStateToProps(state){
    return{
        userInfo: state.user
    }
}
 
export default connect(mapStateToProps)(UserDashboard);