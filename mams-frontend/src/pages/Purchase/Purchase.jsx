import React, {useContext} from 'react';
import './Purchase.css';
import {AppContext} from "../../contex/AppConatiner.jsx";
import DisplayCategory from "../../components/DisplayCategory/DisplayCategory.jsx";
import DisplayItem from "../../components/DisplayItems/DisplayItem.jsx";
import CustomerForm from "../../components/CusomerForm/CustomerForm.jsx";
import CartItem from "../../components/CartItems/CartItem.jsx";
import CartSummary from "../../components/CartSumery/CartSummary.jsx";

const Purchase = () => {

    const [selectedCategory, setSelectedCategory] = React.useState("");
    const {categories} = useContext(AppContext);
    console.log(categories);
    return (
        <div className="purchase-container text-light">
            <div className="left-column">
                <div className="first-row" style={{ overflowY: 'auto' }}>
                    <DisplayCategory
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        categories={categories}/>
                </div>
                <hr className="horizontal-line" />
                <div className="second-row" style={{ overflowY: 'auto' }}>
                    <DisplayItem selectedCategory={selectedCategory} />
                </div>
            </div>

            <div className="right-column">
                <div className="purchase-form-container" style={{ height: '15%' }}>
                    <CustomerForm />
                </div>
                <hr className="my-3 text-light" />
                <div
                    className="purchase-item-container"
                    style={{ height: '55%', overflowY: 'auto' }}
                >
                    <CartItem />
                </div>
                <div className="cart-summary-container" style={{ height: '30%' }}>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
};

export default Purchase;
