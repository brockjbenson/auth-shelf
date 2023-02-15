import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function ShelfPage() {
  const items = useSelector(store => store.shelfReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_SHELF" });
  }, []);
  return (
    <div className="container">
      <h2>Shelf</h2>
      {items.map((item, index) => (
        <div key={index}>
          <p>{item.description}</p>
          <img src={item.image_url} />
        </div>
      ))}
    </div>

  );
}

export default ShelfPage;
