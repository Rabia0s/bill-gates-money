import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 100000000000, // Bill Gates'in başlangıç bakiyesi
  products: [
    { id: 1, name: "Gençlik Pınarı", price: 100000000, quantity: 10, image: 'https://www.folyosepeti.com/duvar-posteri-selale-81432271-selale-duvar-posterleri-selale-13131-14-B.jpg' },




    { id: 2, name: "Kola", price: 5, quantity: 5, image: 'https://www.pizzagetto.com/wp-content/uploads/2023/02/kola-sisw.png' },



    { id: 3, name: "Plaj Terliği", price: 25, quantity: 20, image: 'https://img-lcwaikiki.mncdn.com/mnresize/1020/1360/pim/productimages/20231/6497264/v2/l_20231-s3h383z8-v5j_a.jpg' },



    { id: 4, name: "Satmayan Arkadaş", price:2000000, quantity: 20, image: 'https://store.donanimhaber.com/cc/ac/5b/ccac5b942c8e6dd5d72729a8fbd5657c.jpg' },



    { id: 5, name: "Görünmezlik İksiri", price: 7000000, quantity: 20, image: 'https://img2.pngdownload.id/20180320/psq/av0p6h6o2.webp' },




    { id: 11, name: "En Sevdiğin Dizinin Kötü Biten Sonunu Değiştirme", price: 5000000000, quantity: 20, image: 'https://img3.aksam.com.tr/imgsdisk/2021/01/11/t25_adini-feriha-koydum-saat--293.jpg' },





    { id: 6, name: "Külotlu Çorap", price: 1000, quantity: 20, image: 'https://ktnimg2.mncdn.com/products/2024/08/07/2965848/6aa6a099-f9c3-4367-8bea-c94908d802c4_size870x1142.jpg' },




    { id: 7, name: "Marsa Bilet", price: 6800000, quantity: 20, image: 'https://blog.biletbayi.com/wp-content/uploads/2018/10/otobus-bileti-1-scaled.jpg' },




    { id: 8, name: "Toka", price: 100, quantity: 20, image: 'https://ktnimg2.mncdn.com/products/2024/08/21/2977455/4bdf69e9-c858-4ffb-b2e1-b0052934713b.jpg' },




    { id: 9, name: "Converse", price: 9000, quantity: 20, image: 'https://akn-occ.a-cdn.akinoncloud.com/products/2022/07/19/533334/346f3c66-80f2-4b99-93cd-a0bb5b48aece.jpg' },




    { id: 10, name: "Damon Salvatore İle Bir Akşam Yemeği", price: 100000000000, quantity: 20, image: 'https://preview.redd.it/mnb981wpk8331.jpg?width=640&crop=smart&auto=webp&s=4446d13e8104fb87586ccea3ffc31943aeefae95' },




    


    { id: 12, name: "Dalyanda Yazlık", price: 10000000, quantity: 20, image: 'https://panel.mavillam.com/images/7/aura-villas-mavillam-kiralik-tatil%20(10)n0HRzJeEKh1Y.jpeg' }
  ],
  purchased: [] // Satın alınan ürünler
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    buyProduct: (state, action) => {
      const product = action.payload;
      if (state.balance >= product.price) {
        state.balance -= product.price;
        const existingProduct = state.purchased.find(p => p.id === product.id);
        if (existingProduct) {
          existingProduct.quantity += 1; // Ürün miktarını artır
        } else {
          state.purchased.push({ ...product, quantity: 1 }); // Yeni ürün ekle
        }
      }
    },
    sellProduct: (state, action) => {
      const { product, price } = action.payload;

      // Ürünün miktarını azalt
      const existingProduct = state.purchased.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity -= 1;

        // Eğer miktar 0'a düşerse, o ürünü sepetten çıkar
        if (existingProduct.quantity === 0) {
          state.purchased = state.purchased.filter(p => p.id !== product.id);
        }

        // Bakiye arttırılıyor
        state.balance += price;  // Fiyatı bakiye ekliyoruz
      }
    },
  },
});

export const { buyProduct, sellProduct } = shopSlice.actions;
export default shopSlice.reducer;
