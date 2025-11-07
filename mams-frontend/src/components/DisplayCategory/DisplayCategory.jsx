import "./DisplayCategory.css"
import React from 'react';
import Category from "../Category/Category.jsx";

const DisplayCategory = ({categories ,selectedCategory,setSelectedCategory}) => {
    return (
        <div className="row d-3 " style={{ width: '100%',marginLeft: 0 }}>
            {categories.map(category => (
                <div style={{padding:'0 10px'}} key={category.categoryId} className="col-md-3 col-sm-6">
                    <Category onClick={() => setSelectedCategory(category.categoryId)} isSelected={selectedCategory===category.categoryId} categoryName={category.name} imgUrl={category.imageUrl} numberOfItems={category.items}  bgColor={category.bgColor}/>
                </div>
            ))}
        </div>
    );
};

export default DisplayCategory;