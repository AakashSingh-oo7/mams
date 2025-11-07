import axios from "axios";

export const addCategory = async (category, file) => {
    const formData = new FormData();
    formData.append("category", JSON.stringify(category));
    formData.append("file", file);


    return await axios.post(
        "http://localhost:8080/api/v1.0/admin/categories",
        formData,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}
    );
};

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`http://localhost:8080/api/v1.0/admin/categories/${categoryId}` ,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}});
};

export const fetchCategories = async () => {
    return await axios.get("http://localhost:8080/api/v1.0/categories",{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}});
};
