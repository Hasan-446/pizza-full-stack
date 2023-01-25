import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className={styles.Modalwrapper}>
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
                />
              </div>
              <div className={styles.Modalitem}>
                <label className={styles.Modallabel}>Phone Number</label>
                <input
                  type="text"
                  pattern="[0-9]"
                  placeholder="+1 234 567 89"
                  className={styles.Modalinput}
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
                />
              </div>
              <button type="submit" className={styles.Modalbutton}>
                Order
              </button>
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
