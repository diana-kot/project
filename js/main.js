const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        imgCart: 'https://placehold.it/50x100',
        products: [],
        imgProduct: 'https://placehold.it/200x150'
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                       let find = this.cartItems.find(el => el.id_product === item.id_product);
                       if(find){
                           find.quantity++;
                       } else {
                           const prod = Object.assign({quantity: 1}, item);//создание нового объекта на основе двух, указанных в параметрах
                           this.cartItems.push(prod)
                       }
                    }
                })
        },
        remove(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered =  this.filtered.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents){
                    this.cartItems.push(item);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let item of data){
                    //this.products.push(item);
                    this.filtered.push(item);
                }
            })
    }

});
















































// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

// class ProductsList {
//     constructor(container = '.products') {
//         this.container = container;
//         this.goods = [];//массив товаров
//         this.allProducts = [];//массив объектов
//         this._getProducts()
//             .then(data => { //data - объект js
//                 this.goods = [...data];
//                 this.render()
//             });
//     }
//     // _fetchProducts(cb){
//     //     getRequest(`${API}/catalogData.json`, (data) => {
//     //         this.goods = JSON.parse(data);
//     //         console.log(this.goods);
//     //         cb();
//     //     })
//     // }
//     _getProducts() {
//         return fetch(`${API}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     calcSum() {
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new ProductItem(product);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }

//     }
// }


// class ProductItem {
//     constructor(product, img = 'https://placehold.it/200x150') {
//         this.title = product.product_name;
//         this.price = product.price;
//         this.id = product.id_product;
//         this.img = img;
//     }
//     render() {
//         return `<div class="product-item" data-id="${this.id}">
//                 <img src="${this.img}" alt="Some img">
//                 <div class="desc">
//                     <h3>${this.title}</h3>
//                     <p>${this.price} $</p>
//                     <button class="buy-btn">Купить</button>
//                 </div>
//             </div>`
//     }
// }

// let list = new ProductsList();


// class basket {
//     constructor(container = '.cart-block') {
//         this.container = container;
//         this.goods = [];//массив товаров
       
//         this._clickBasket();
//         this._getBasketItem()
//             .then(data => { //data - объект js
//                 this.goods = [...data.contents];
//                 this.render()
//             });
//     }


//     _getBasketItem() {
//         return fetch(`${API}/getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new BasketItem();
            
//             block.insertAdjacentHTML('beforeend', productObj.render(product));
//         }

//     }

//     _clickBasket() {
//         document.querySelector(".btn-cart").addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//     }
// }

// class BasketItem {
  
//     render(product) {
//         return `<div class="cart-content__item" data-id="${product.id_product}">
//                 <div class="cart-content__product cart-product">
//                 <img src="${product.img}" alt="Some image" class="cart-product__img">
//                 <div class="cart-product__text">
//                 <p class="cart-product__title">${product.product_name}</p>
//                 <p class="product-quantity">Quantity: ${product.quantity}</p>
//             <p class="product-single-price">$${product.price} each</p>
//             </div>
//             </div>
//             <div class="right-block">
//                 <p class="cart-product__price">$${product.quantity * product.price}</p>
//                 <button class="cart-product__delete" data-id="${product.id_product}">&times;</button>
//             </div>
//             </div>`
//     }
// }

// let bask = new basket();