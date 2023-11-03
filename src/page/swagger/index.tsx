import { fetchingSwagger } from "../../api/swagger";
import React, { useEffect } from 'react';
import { SwaggerState } from "../../api/swagger/reducer";
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const SwaggerComponent: React.FC = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state: SwaggerState) => state);

    useEffect(() => {
        dispatch(fetchingSwagger());
    }, [dispatch]);

    return (
        <div>
          <h1>Swagger Data</h1>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {data && (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
    );
};

export default SwaggerComponent;