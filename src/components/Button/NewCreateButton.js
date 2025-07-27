import React from "react";

function NewCreateButton({ onClick }) {
    return (
        <button className="btn btn-primary fw-semibold" onClick={onClick}>
            <i className="bi bi-plus-lg"></i> Buat Baru
        </button>
    );
}

export default NewCreateButton;