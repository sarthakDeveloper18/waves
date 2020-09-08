import React from 'react';
import moment from 'moment';

const HistoryBlock = (props) => {
    const renderBlock = () => {
        return(
            props.products ?
            props.products.map((item, i)=>(
                <tr key = {i}>
                    <td>{moment(item.dateOfPurchase).format('MM-DD-YYYY')}</td>
                    <td>{item.brand} {item.name}</td>
                    <td>$ {item.price}</td>
                    <td>{item.quantity}</td>
                </tr>
            ))
            : null
        )
    }
    return ( 
        <div className = 'history_blocks'>
            <table>
                <thead>
                    <tr>
                        <th>Date Of Purchase</th>
                        <th>Product</th>
                        <th>Price Paid</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlock()}
                </tbody>
            </table>
        </div>
    );
}
 
export default HistoryBlock;