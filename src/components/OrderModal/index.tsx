import { useEffect } from "react";
import close from "../../assets/images/close-icon.svg";
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCUrrency";

import { Actions, ModalBody, OrderDetails, Overlay } from "./style";
interface OrderModalProp {
  visible: boolean;
  order: null | Order;
  onClose: () => void;
}

export function OrderModal({ visible, order, onClose}: OrderModalProp) {
  useEffect(()  => {
    function handleKeyDown(event: KeyboardEvent){
      if(event.key  ===   'Escape'){
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () =>  {
      document.removeEventListener('keydown', handleKeyDown)
    }
  },[onClose])
  if (!visible || !order) {
    return null;
  }

  /*   let total = 0

  order.items.forEach(( {product, quantity}) =>  {
    total += product.price * quantity
  }) */

  const total = order.items.reduce((acc, { product, quantity }) => {
   return acc + product.price * quantity;
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={onClose}>
            <img src={close} alt="close" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === "WAITING" && "🕑"}
              {order.status === "IN_PRODUCTION" && "🧑‍🍳"}
              {order.status === "DONE" && "✅"}
            </span>
            {order.status === "WAITING" && "Fila de espera"}
            {order.status === "IN_PRODUCTION" && "Em preparação"}
            {order.status === "DONE" && "Pronto!"}
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>
          <div className="order-item">
            {order.items.map(({ _id, product, quantity }) => (
              <div key={_id} className="item">
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width={56}
                  height={28.51}
                />
                <span className="quantity">{quantity}x</span>

                <div className="product-datails">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
              <button type="button" className="primary">
                <span>🧑‍🍳</span>
                <strong>Iniciar Produção</strong>
              </button>

              <button type="button" className="secondary">
                Cancelar Pedido
              </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
