import { useState } from "react";
import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";
import { Board, OrderContainer } from "./style";
import { api } from "../../utils/api";
import { toast } from 'react-toastify'

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}


export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoanding, setIsLoanding] = useState(false)

  function handleOperOrder(order: Order) {
    setSelectedOrder(order);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    setIsLoanding(true)

    const newStatus = selectedOrder?.status === 'WAITING'
      ? "IN_PRODUCTION" : "DONE";

    await api.patch(`/orders/${selectedOrder?._id}`, { status: newStatus });


    toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado`)

    onChangeOrderStatus(selectedOrder!._id, selectedOrder!.status)
    setIsLoanding(false)
    setOpen(false)
  }

  async function handleCancelOrder() {
    setIsLoanding(true)

    await api.delete(`/orders/${selectedOrder?._id}`)

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado`)

    onCancelOrder(selectedOrder!._id)
    setIsLoanding(false)
    setOpen(false)

  }

  return (
    <>
      <Board>
        <OrderModal
          onCancelOrder={handleCancelOrder}
          visible={open}
          order={selectedOrder}
          onClose={handleClose}
          isLoanding={isLoanding}
          onChangeOrderStatus={handleChangeOrderStatus}
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
                <span>{order.products.length} itens</span>
              </button>
            ))}
          </OrderContainer>
        )}
      </Board>
    </>
  );
}
