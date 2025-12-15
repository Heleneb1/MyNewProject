import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCart(userId, cartId) {
  const [cart, setCart] = useState([]);
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [removeMessage, setRemoveMessage] = useState('');
  const [clearMessage, setClearMessage] = useState('');

  const getCartData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}/cart_id/${cartId}`
      );

      const items = res.data;
      const ids = items.map((i) => i.book_id);

      if (ids.length === 0) {
        setCart([]);
        return;
      }

      const details = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/books?id=${ids.join(',')}`
      );

      // enrichissement
      const fullCart = items.map((item) => ({
        ...item,
        book: details.data.find((b) => b.id === item.book_id),
      }));

      setCart(fullCart);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (book) => {
    if (cart.some((c) => c.book_id === book.id)) {
      return setMessage('Ce livre est déjà dans votre panier');
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/${cartId}/user/${userId}`,
        {
          book_id: book.id,
          user_id: userId,
          cart_id: cartId,
        }
      );

      setCart((prev) => [...prev, { ...res.data, book }]);
      setMessage(`Livre ajouté : '${book.title}'`);
      setRemoveMessage('');
      setClearMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (item) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}/cart_id/${cartId}/book/${item.book_id}`
      );

      setCart((prev) => prev.filter((c) => c.book_id !== item.book_id));
      setRemoveMessage(`'${item.book.title}' retiré du panier`);
      setMessage('');
      setClearMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/cart/${cartId}`);

      setCart([]);
      setClearMessage('Votre panier est vide');
      setMessage('');
      setRemoveMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId && cartId) getCartData();
  }, [userId, cartId]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books`)
      .then((res) => setBooks(res.data))
      .catch(console.error);
  }, []);

  return {
    cart,
    books,
    message,
    removeMessage,
    clearMessage,
    addToCart,
    removeFromCart,
    clearCart,
  };
}
