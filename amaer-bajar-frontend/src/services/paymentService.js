import http from "./httpService";
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/api/checkout";

export function payBill(paymentDetails) {
    return http.post(apiEndpoint, paymentDetails);
}