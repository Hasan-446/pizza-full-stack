import styles from "../styles/Cart.module.css";
import axios from "axios";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    setTotal(cart.total);
    e.preventDefault();
    createOrder({ customer, phone, address, total, method: 0 });
  };

  return (
    <div>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className={styles.Modalwrapper}>
              <form>
                <h2 className={styles.Modaltitle}>
                  You will pay $12 after delivery.
                </h2>
                <div className={styles.Modalitem}>
                  <label className={styles.Modallabel}>Name Surname</label>
                  <input
                    placeholder="John Doe"
                    type="text"
                    className={styles.Modalinput}
                    onChange={(e) => setCustomer(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.Modalitem}>
                  <label className={styles.Modallabel}>Phone Number</label>
                  <input
                    type="text"
                    pattern="^(?:(?:\+|00)88|01)?\d{11}\r?$"
                    placeholder="017 77777 777"
                    title="write your phone number in correct format"
                    className={styles.Modalinput}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className={styles.Modalitem}>
                  <label className={styles.Modallabel}>Address</label>
                  <textarea
                    rows={5}
                    placeholder="Elton St. 505 NY"
                    type="text"
                    className={styles.Modaltextarea}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={styles.Modalbutton}
                  onClick={handleSubmit}
                >
                  Order
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      )}

      <div className={styles.container}>
        <div className={styles.left}>
          <table className={styles.table}>
            <tr className={styles.trTitle}>
              <th className={styles.th}>Product</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Extras</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Quantity</th>
              <th className={styles.th}>Total</th>
            </tr>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td className={styles.td}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={styles.name}>{product.title} </span>
                </td>
                <td className={styles.td}>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td className={styles.td}>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.total}>
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>$0.00
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>${cart.total}
            </div>
            {open ? (
              <div className={styles.paymentMethods}>
                <button className={styles.cashButton} onClick={handleShow}>
                  CASH ON DELIVERY
                </button>
                <button className={styles.payButton}>ONLINE PAYMENT</button>
              </div>
            ) : (
              <button onClick={() => setOpen(true)} className={styles.button}>
                CHECKOUT NOW!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
