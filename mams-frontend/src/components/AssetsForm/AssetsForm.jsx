import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import toast from "react-hot-toast";
import { addCategory } from "../../Service/CategoryService.js";
import { AppContext } from "../../contex/AppConatiner.jsx";

const MAX_FILE_SIZE_MB = 5;

const AssetsForm = () => {
    const { setCategories, categories } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileSizeMB = file.size / 1024 / 1024;
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            toast.error(`File size should be less than ${MAX_FILE_SIZE_MB} MB`);
            return;
        }

        setImage(file);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!image) {
            toast.error("Please select an image file!");
            setLoading(false);
            return;
        }

        try {
            const response = await addCategory(data, image);

            if (response.status === 201) {
                setCategories([...categories, response.data]);
                toast.success("Asset added successfully.");

                setData({
                    name: "",
                    description: "",
                    bgColor: "#2c2c2c",
                });
                setImage(null);
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "An error occurred while adding Asset"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="m-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form onSubmit={onSubmitHandler}>
                            {/* Image Upload */}
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    <img
                                        src={image ? URL.createObjectURL(image) : assets.upload}
                                        alt="upload"
                                        width={48}
                                        style={{ cursor: "pointer" }}
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="form-control"
                                    hidden
                                    accept="image/*"
                                    onChange={onImageChange}
                                />
                            </div>

                            {/* Name */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="Asset Name"
                                    value={data.name}
                                    onChange={onChangeHandler}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    rows={5}
                                    name="description"
                                    id="description"
                                    className="form-control"
                                    placeholder="Write content here..."
                                    value={data.description}
                                    onChange={onChangeHandler}
                                    required
                                />
                            </div>


                            <div className="mb-3">
                                <label htmlFor="bgColor" className="form-label">
                                    Background Color
                                </label>
                                <br />
                                <input
                                    type="color"
                                    id="bgColor"
                                    name="bgColor"
                                    className="form-control"
                                    value={data.bgColor}
                                    onChange={onChangeHandler}
                                />
                            </div>


                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-warning w-100"
                            >
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetsForm;
