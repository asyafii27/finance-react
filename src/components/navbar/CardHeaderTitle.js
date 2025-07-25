import React from "react";
import NewCreateButton from '../Button/NewCreateButton'


function CardHeader({ onCreate, cardTitle }) {
    return (
        <div className="card-header">
            <div class="d-flex justify-content-between align-items-center bg-light rounded">
                <h5 className="fw-semibold">{cardTitle}</h5>
                <NewCreateButton onClick={onCreate} />
            </div>
        </div>
    )
}

export default CardHeader;

