import { render, screen, fireEvent } from '@testing-library/react';
import ItemCount from './components/itemCount/ItemCount';
test('respeta el stock y avisa solamente al cambiar la cantidad', () => {
  const onAdd = jest.fn();
  render(<ItemCount initial={1} stock={2} onAdd={onAdd} />);
  expect(onAdd).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', {name: '+'}));
  expect(onAdd).toHaveBeenLastCalledWith(2);
  expect(screen.getByRole('button', {name: '+'})).toBeDisabled();
  fireEvent.click(screen.getByRole('button', {name: '-'}));
  expect(onAdd).toHaveBeenLastCalledWith(1);
  expect(screen.getByRole('button', {name: '-'})).toBeDisabled();
});
