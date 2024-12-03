import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyProduct, sellProduct } from './redux/shopSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { balance, products, purchased } = useSelector(state => state.shop);

  const handleBuy = (product) => {
    if (balance >= product.price) {
      dispatch(buyProduct(product));
    } else {
      alert("Yetersiz bakiye!");
    }
  };

  const handleSell = (product) => {
    const productIndex = purchased.findIndex(p => p.id === product.id);
    if (productIndex >= 0) {
      const updatedProduct = purchased[productIndex]; // Ürün nesnesini güncelleme
      dispatch(sellProduct({ product: updatedProduct, price: product.price })); // İki parametreyi doğru şekilde gönderiyoruz
    }
  };

  // Toplam tutarı hesapla
  const totalAmount = purchased.reduce((total, product) => total + (product.price * product.quantity), 0);

  // Eğer satın alınan ürünler yoksa toplam tutar satırını gizle
  const showTotal = purchased.length > 0 && totalAmount > 0;

  return (
    <div className="App">
      <header className="App-header">
     
        <h1>Bill Gates'in Fakiri Konuşturan Serveti</h1>
        <h2>Bakiyeniz: ${balance.toLocaleString()}</h2>
      </header>

      <section className="product-list">
        <h3>Ürünler</h3>
        <div className="product-cards">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              {/* Ürün görseli */}
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>${product.price.toLocaleString()}</p>
              </div>
              <div className="product-actions">
                <button 
                  onClick={() => handleBuy(product)} 
                  disabled={balance < product.price}
                  className="buy-btn"
                >
                  Buy
                </button>
                <button 
                  onClick={() => handleSell(product)} 
                  disabled={product.quantity === 0}
                  className="sell-btn"
                >
                  Sell
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="purchased-items">
        <h3>Satın Alınan Ürünler</h3>
        {purchased.length === 0 ? (
          <p>Henüz ürün almadınız.</p>
        ) : (
          <div className="purchased-list">
            {purchased.map((product, index) => (
              <div key={index} className="purchased-item">
                <span className="item-name">{product.name}</span>
                <span className="item-price">${product.price.toLocaleString()}</span>
                <span className="item-quantity">{product.quantity}</span>
              </div>
            ))}

            {showTotal && (
              <div className="total">
                <span>Toplam Tutar</span>
                <span>${totalAmount.toLocaleString()}</span>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
