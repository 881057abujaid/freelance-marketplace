import api from "./api";

export const getMyOrders = () => api.get("/orders/my");

export const checkoutOrder = (id) =>
    api.post(`/orders/${id}/checkout`);

export const markPaid = (id) =>
    api.put(`/orders/${id}/pay`);

export const completeOrder = (id) =>
    api.put(`/orders/${id}/complete`);
