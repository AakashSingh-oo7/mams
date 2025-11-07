import React from 'react';

const SearchBox = ({onSearch}) => {
    const [searchText, setSearchText] = React.useState('');

    const handelInputChange = (event) => {
        const text = event.target.value;
        setSearchText(text);
        onSearch(text);
    }

    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control " placeholder="Search..." value={searchText} onChange={handelInputChange}/>
            <span className="input-group-text bg-warning">
                <i className="bi bi-search"></i>
            </span>
        </div>
    );
};

export default SearchBox;