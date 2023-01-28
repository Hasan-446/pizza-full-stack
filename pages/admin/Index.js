import Image from "next/image";
import React from "react";
import axios from "axios";
import styles from "../../styles/Admin.module.css";
import img from "../../public/img/pizza.png";

const Index = ({ orders, products }) => {
  const status = ["preparing", "on the way", "delivered"];

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {products.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  {" "}
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}..</td>
                <td>{product.title} </td>
                <td>{product.prices[0]}</td>
                <td>
                  {" "}
                  <button className={styles.button}>Edit</button>
                  <button className={styles.button}>Delete</button>{" "}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orders.map((order) => (
            <tbody>
              <td>{order._id.slice(0, 5)}</td>
              <td>{order.customer}</td>
              <td>{order.total}</td>
              <td>
                {order.method === 0 ? <span>cash</span> : <span>paid</span>}{" "}
              </td>
              <td>{status[order.status]}</td>
              <td>
                <button>Next stage</button>
              </td>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
