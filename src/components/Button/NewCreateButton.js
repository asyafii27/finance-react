import React from "react";

function ButtonBuatBaru({ onClick }) {
    return (
        <button className="btn btn-primary fw-semibold" onClick={onClick}>
            <i className="bi bi-plus-lg"></i> Buat Baru
        </button>
    );
}

export default ButtonBuatBaru;