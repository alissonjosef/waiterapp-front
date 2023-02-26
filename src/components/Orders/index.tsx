import { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import {  Container } from "./style";

const orders: Order[] = [
  {
    '_id': '39239429asasa91919',
    'table': '124',
    'status': 'WAITING',
    'items': [
      {
      'product':{
        'name': 'Pizza quatro queijo',
        'imagePath': '1668650622462-quatro-queijos.png',
        'price': 20,
      },
      'quantity': 3,
      '_id': '4534sdr929k23k3k2kkkk'
      },
      {
        'product':{
          'name': 'Coca-cola',
          'imagePath': '1668650622462-quatro-queijos.png',
          'price': 10
        },
        'quantity': 7,
      '_id': '4534sdr929k23k3k2kkkk'
      },

    ]
  }
]

export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={orders}
        />
      <OrdersBoard
        icon="🍻"
        title="Fila de espera"
        orders={[]}
        />
      <OrdersBoard
        icon="🍕"
        title="Fila de espera"
        orders={[]}
        />
    </Container>
  );
}
