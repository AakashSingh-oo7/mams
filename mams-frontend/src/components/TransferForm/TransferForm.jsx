import React, {useContext} from 'react';
import {assets} from "../../assets/assets.js";
import {AppContext} from "../../contex/AppConatiner.jsx";
import toast from "react-hot-toast";
import {addItem} from "../../Service/ItemService.js";

const TransferForm = () => {
    const {categories,setItemsData,itemsData,setCategories} =useContext(AppContext);
    const [image, setImage] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        name:"",
        categoryId:"",
        price:"",
        description:""
    });

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({...data, [name]: value}));


    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('item', JSON.stringify(data));
        formData.append('file', image);
        try{
            if(!image){
            toast.error("Select Image");
            return;
        }
        const response = await addItem(formData);
        if (response.status === 201) {
            setItemsData([...itemsData,response.data]);
            setCategories((prevCategories) => prevCategories.map((category) => category.categoryId === data.categoryId? {...category,items:category.items+1}:category));
            toast.success("Item Added");
            setData({
                name:"",
                categoryId:"",
                price:"",
                description:""
            })
            setImage(false);
        }
    }catch(err){
            console.log(err);
            toast.error("Something went wrong");
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className ="item-form-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}} >
        <div className="m-2 mt-2 ">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    <img src={image?URL.createObjectURL(image):assets.upload} alt=" " width={48} />
                                </label>
                                <input type="file" id="image" name="image" className="form-control" hidden onChange={(e) => setImage(e.target.files[0])}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Assets Name</label>
                                <input type="name" name="name" id="name" className="form-control" placeholder="Transfer Assets Name" onChange={onChangeHandler} value={data.name}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Asset Type</label>
                                <select
                                    name="categoryId"
                                    id="category"
                                    className="form-control"
                                    onChange={onChangeHandler}
                                    value={data.categoryId}
                                    required
                                >
                                    <option value="">Select a type</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.categoryId}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Transfer To Description</label>
                                <textarea rows="5" name="description" id="description" className="form-control" placeholder="write content here...." onChange={onChangeHandler} value={data.description}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Base Number</label>
                                <input type="number" name="price" id="price" className="form-control" placeholder="Base Number" onChange={onChangeHandler} value={data.price}></input>
                            </div>

                            <button type="submit" disabled={loading} className="btn btn-warning w-100">{loading? "Loading...":"Transfer"}</button>
                        </form>
                    </div>
                </div>
            </div>

        </div></div>
    );
};

export default TransferForm;