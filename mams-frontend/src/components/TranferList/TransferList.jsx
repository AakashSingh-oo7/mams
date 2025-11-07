import React, {useContext} from 'react';
import {AppContext} from "../../contex/AppConatiner.jsx";
import {deleteItem} from "../../Service/ItemService.js";
import toast from "react-hot-toast";
import './TransferList.css'

const TransferList = () => {
    const {itemsData,setItemsData} = useContext(AppContext);
    const [searchTerm, setSearchTerm] = React.useState('');
    const filteredItems = itemsData.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    const removeItem = async (itemId) => {
        try{
            const response = await deleteItem(itemId);
            if(response.status === 204){
                const updateItems = itemsData.filter((item) => item.itemId !== itemId);
                setItemsData(updateItems);
                toast.success("Assets deleted successfully.");
            }else{
                toast.error("unable to delete Assets");
            }

        }catch(err){
            console.log(err);
            toast.error("unable to delete Assets");
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
                {filteredItems.map((item, index) => (
                    <div className="col-12" key={index}>
                        <div className="card p-3 bg-dark">
                            <div className="d-flex align-items-center">
                                <div style={{marginRight:"50px"}}>
                                    <img src={item.imgUrl} alt={item.name} className="item-image"/>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="mb-1 text-white">{item.name}</h6>
                                    <p className="mb-0 text-white">Type : {item.categoryName}</p>
                                    <span className="m-0 text-black badge rounded-pill text-bg-warning">
                        {item.price}
                    </span>

                                </div>
                                <div>
                                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.itemId)}>
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

export default TransferList;