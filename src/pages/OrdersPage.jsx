/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { getUserOrders } from "../api/orderApi";
import { decodeToken, getToken } from "../utils/tokenUtils";

const OrdersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ordersList, setOrdersList] = useState([]);

  const token = getToken();
  const user = decodeToken(token);

  console.log(ordersList);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getUserOrders(user.id);
        setOrdersList(ordersData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user.id]);

  return (
    <div className="py-6">
      {isLoading && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}

      <div className="cart-wrap">
        <div className="container text-white">
          <div className="row">
            <div className="col-md-12">
              <h2 className="fw-bold my-4">{user.name}'s Orders:</h2>
              {ordersList.length === 0 ? (
                <div className="my-3 d-flex align-items-center justify-content-center">
                  <img
                    src="assets/images/empty-orders.svg"
                    className="empty"
                    alt="No orders"
                  />
                </div>
              ) : (
                <div className="table-wishlist">
                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    border="0"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th width="25%">Order ID</th>
                        <th width="10%">Total Price</th>
                        <th width="10%">isPaid</th>
                        <th width="15%">isDelivered</th>
                        <th width="10%">Payment Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersList.map((order) => (
                        <tr key={order.id}>
                          <td width="25%">
                            <div className="d-flex align-items-center">
                              <div className="name-product">#{order.id}</div>
                            </div>
                          </td>
                          <td width="10%" className="price">
                            EGP{order.totalOrderPrice}
                          </td>
                          <td width="10%">
                            <span
                              className={`text-white p-2 rounded badge ${
                                order.isPaid ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {order.isPaid ? "Yes" : "No"}
                            </span>
                          </td>
                          <td width="10%">
                            <span
                              className={`text-white p-2 rounded badge ${
                                order.isDelivered ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {order.isDelivered ? "Yes" : "No"}
                            </span>
                          </td>
                          <td width="10%">{order.paymentMethodType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
