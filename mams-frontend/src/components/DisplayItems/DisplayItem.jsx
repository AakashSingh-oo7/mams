import "./DisplayItem.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../../contex/AppConatiner.jsx";
import Item from "../Item/Item.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";

const DisplayItem = ({ selectedCategory }) => {
    const { itemsData } = useContext(AppContext);
    const [searchText, setSearchText] = useState("");

    const filteredItems = itemsData.filter(item => {
        const matchesCategory = !selectedCategory || item.categoryId === selectedCategory;
        const matchesSearch = !searchText || item.name.toLowerCase().includes(searchText.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <SearchBox onSearch={setSearchText} />
            </div>

            <div className="row g-3">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <div key={index} className="col-md-4 col-sm-6">
                            <Item
                                itemName={item.name}
                                itemPrice={item.price}
                                itemImage={item.imgUrl}
                                itemId={item.itemId}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-center">No items found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default DisplayItem;
