import React from "react";

import './../../css/ck/ckEditor.css';

const Viewer = ({content}) => {
    return (
        <div
            className="ck-content desc"
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    )
}

export default Viewer;