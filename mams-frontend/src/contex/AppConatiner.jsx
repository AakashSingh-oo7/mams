import {createContext, useEffect, useState} from "react";
import {fetchCategories} from "../Service/CategoryService.js";
import {fetchItems} from "../Service/ItemService.js";


export const AppContext= createContext(null);

export const AppContextProvider =(props) => {

    const [categories,setCategories]=useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [auth,setAuth] = useState({
        token:null,
        role:null
    });


    const setAuthData = (token,role) =>{
        setAuth({token,role});
    }

    useEffect(() => {
        async function loadData() {
            try {
                const token = localStorage.getItem("token");
                const role = localStorage.getItem("role");

                if(token && role){
                    setAuthData(token, role);

                    const response = await fetchCategories(token);
                    const itemResponse = await fetchItems(token);
                    setCategories(response.data);


                    setItemsData(itemResponse.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error.response?.status, error.message);
            }
        }
        loadData();
    }, []);




    const contextValue ={
        categories,
        setCategories,
        auth,
        setAuthData,
        itemsData,
        setItemsData
    }
    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}