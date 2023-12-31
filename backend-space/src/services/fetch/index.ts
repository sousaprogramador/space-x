import axios from 'axios';
import { config } from '../../config';

const instance = axios.create({
    baseURL: config.spaceapi,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;