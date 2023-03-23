import { useState } from "react";
import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";
import { Board, OrderContainer } from "./style";

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

  function handleOperOrder(order: Order) {
    setOpen(true);
    setSelectedOrder(order);
  }

  function handleClose() {
    setOpen(false);
    setSelectedOrder(null);
  }

  return (
    <>
      <Board>
        <OrderModal
        visible={open}
        order={selectedOrder}
        onClose={handleClose}
        />
        <header>
          <span>{icon}</span>
          <strong>{title}</strong>
          <span>({orders.length})</span>
        </header>

        {orders.length > 0 && (
          <OrderContainer>
            {orders.map((order) => (
              <button
                onClick={() => handleOperOrder(order)}
                type="button"
                key={order._id}
              >
                <strong>Mesa {order.table}</strong>
                <span>{order.items.length} itens</span>
              </button>
            ))}
          </OrderContainer>
        )}
      </Board>
    </>
  );
}
