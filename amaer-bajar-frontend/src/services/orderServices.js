import http from "./httpService";
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/api/checkout";

export function getOrderByCustomerId(customerId) {
    return http.get(apiEndpoint + '/' + customerId);
}

export function getOrders() {
    return http.get(apiEndpoint);
}

export function changeOrderStatus(orderId, newStatus) {
    return http.put(apiEndpoint + '/' + orderId, { orderStatus: newStatus })
}