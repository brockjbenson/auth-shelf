import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

function ShelfPage() {
  const items = useSelector(store => store.shelfReducer);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  // console.log(user.id);

  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleSubmit = () => {
    const newObj = {
      description: newDescription,
      image_url: newImage,
    };


    dispatch({ type: "ADD_ITEM", payload: newObj });
  };
  console.log(user);

  const deleteItem = (id, user_id) => {
    if (user_id === user.id) {

      dispatch({ type: "DELETE_ITEM", payload: id });
    } else {
      alert('You cannot delete this item');
    }

  };

  useEffect(() => {
    dispatch({ type: "FETCH_SHELF" });
  }, []);
  return (
    <div className="container">
      <h2>Shelf</h2>
      <h3>Add new item</h3>
      <input placeholder="description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
      <input placeholder="image url" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
      <button onClick={handleSubmit}>submit</button>
      {items.map((item, index) => (
        <div key={index}>
          <p>{item.description}</p>
          <img src={item.image_url} />
          <button onClick={() => deleteItem(item.id, item.user_id)}>Delete</button>
        </div>
      ))}
    </div>

  );
}

export default ShelfPage;
