import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading: React.FC = () => {

    return(
        <div className="w-full h-full flex justify-center">
            <CircularProgress style={{ color: "#FF5000" }} />
        </div>
    );
}

export default Loading;