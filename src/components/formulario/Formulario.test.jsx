import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Formulario from './Formulario';
import { GlobalContext } from '../../context/GlobalProvider';
import { addDoc } from 'firebase/firestore';
jest.mock('../../services/firebase', () => ({ db: {} }));
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(), addDoc: jest.fn(), serverTimestamp: () => 'server-time'
}));
jest.mock('react-hot-toast', () => ({success: jest.fn(), error: jest.fn()}));
test.each([true, false])('vacía el carrito solamente si se guarda el pedido: %s', async (success) => {
  const clearCart = jest.fn();
  addDoc.mockReset();
  if (success) addDoc.mockResolvedValue({id: 'order-1'});
  else addDoc.mockRejectedValue(new Error('offline'));
  render(<GlobalContext.Provider value={{clearCart}}><Formulario itemsCompra={[{cantidad: 1}]} totalCompra={100}/></GlobalContext.Provider>);
  for (const label of ['Nombre', 'Apellido', 'Dirección', 'Teléfono']) {
    fireEvent.change(screen.getByLabelText(label), {target: {value: 'Prueba'}});
  }
  for (const label of ['Email', 'Repetir email']) {
    fireEvent.change(screen.getByLabelText(label), {target: {value: 'test@example.com'}});
  }
  fireEvent.submit(screen.getByRole('button', {name: /Terminar compra/}).closest('form'));
  await waitFor(() => expect(addDoc).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(screen.getByRole('button', {name: /Terminar compra/})).toBeEnabled());
  expect(clearCart).toHaveBeenCalledTimes(success ? 1 : 0);
});
