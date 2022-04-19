
import * as apiCall from '../constants';
import axios from 'axios';

const getRefinitivToken = async () => {
    const result: {data: {token: string}} = await axios.get(apiCall.NEWS_API+"token", { headers: { 'x-api-key': apiCall.X_API_KEY_NEWS } });

    return result.data.token;
};

export default getRefinitivToken;