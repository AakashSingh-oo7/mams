import React, {useContext} from 'react';
import {AppContext} from "../../contex/AppConatiner.jsx";
import "./AssetsList.css"
import toast from "react-hot-toast";
import {deleteCategory} from "../../Service/CategoryService.js";

const AssetsList = () => {
    const { categories ,setCategories} = useContext(AppContext);
    const [searchTerm, setSearchTerm] = React.useState('');
    const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const  deleteByCategoryId = async (categoryId) =>{
        try{
          const response = await  deleteCategory(categoryId);
          if (response.status === 204){
              const updatedCategories = categories.filter(category => category.categoryId !== categoryId);
              setCategories(updatedCategories);
              toast.success("Assist deleted successfully.");
          }else{
              toast.error("Unable to delete the Assist");
          }
        }catch (error){
            console.log(error);
            toast.error("Unable to delete the Assist");

        }
    }
    return (
        <div className="asset-list-container" style={{height:'100vh' , overflowY: 'auto', overflowX: 'hidden'}}>
            <div className="row pe-2">
                <div className="input-group mb-3">
                    <input type="text"
                           name="keyword"
                           id="keyword"
                           placeholder="Search by keyword"
                           className="form-control"
                           onChange={(e) => setSearchTerm(e.target.value)}
                           value={searchTerm}
                    />
                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>
            <div className="row g-3 pe-2">
                {filteredCategories.map((category,index) => (
                  <div key={index} className="col-12">
                      <div className = "card p-3" style={{backgroundColor:category.bgColor}}>
                          <div className="d-flex align-items-center">
                              <div style={{marginRight: '15px'}}>
                                  <img src={category.imageUrl} alt={category.name} className="category-image"/>
                              </div>
                              <div className="flex-grow-1">
                                  <h5 className="mb-1 text-white">{category.name}</h5>
                                  <p className="mb-0 text-white">{category.items} Items</p>
                              </div>
                              <div>
                                  <button onClick={() => deleteByCategoryId(category.categoryId)} className="btn btn-success btn-sm" >
                                      <i className="bi bi-trash"></i>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
                    ))}

            </div>
        </div>
    );
};

export default AssetsList;