var products = [
    {id: 1, name: 'Desktop', description: 'Komputer meja adalah komputer pribadi yang ditujukan untuk penggunaan secara umum di satu lokasi yang berlawanan dengan komputer jinjing atau komputer portabel.', category: 'Elektronik'},
    {id: 2, name: 'Laptop', description: 'Laptop adalah komputer bergerak (bisa dipindahkan dengan mudah) yang berukuran relatif kecil dan ringan, beratnya berkisar dari 1-6 kg, tergantung ukuran, bahan, dari spesifikasi laptop tersebut, laptop dapat digunakan dalam lingkungan yang berbeda dari komputer.', category: 'Elektronik'},
    {id: 3, name: 'Tablet', description: 'PC Tablet atau yang biasa diringkas dengan sebutan tablet adalah suatu portable komputer lengkap yang seluruhnya berupa layar sentuh datar.', category: 'Elektronik'}
  ];
  
  function findProduct (productId) {
    return products[findProductKey(productId)];
  };
  
  function findProductKey (productId) {
    for (var key = 0; key < products.length; key++) {
      if (products[key].id == productId) {
        return key;
      }
    }
  };
  
  var List = Vue.extend({
    template: '#product-list',
    data: function () {
      return {products: products, searchKey: ''};
    },
    computed: {
      filteredProducts() {
        return this.products.filter( (product) => {
            return product.name.indexOf(this.searchKey) > -1
          //return !product.name.indexOf(this.searchKey)
        })
      }
    }
  });
  
  var Product = Vue.extend({
    template: '#product',
    data: function () {
      return {product: findProduct(this.$route.params.product_id)};
    }
  });
  
  var ProductEdit = Vue.extend({
    template: '#product-edit',
    data: function () {
      return {product: findProduct(this.$route.params.product_id)};
    },
    methods: {
      updateProduct: function () {
        //Obsolete, product is available directly from data...
        let product = this.product; //var product = this.$get('product');
        products[findProductKey(product.id)] = {
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category
        };
        router.push('/');
      }
    }
  });
  
  var ProductDelete = Vue.extend({
    template: '#product-delete',
    data: function () {
      return {product: findProduct(this.$route.params.product_id)};
    },
    methods: {
      deleteProduct: function () {
        products.splice(findProductKey(this.$route.params.product_id), 1);
        router.push('/');
      }
    }
  });
  
  var AddProduct = Vue.extend({
    template: '#add-product',
    data: function () {
      return {product: {name: '', description: '', category: ''}, 
      sku: 'asdf'
      }
    },
    methods: {
      createProduct: function() {
        //Obsolete, product is available directly from data...
        let product = this.product; //var product = this.$get('product');
        products.push({
          id: Math.random().toString().split('.')[1],
          name: product.name,
          description: product.description,
          category: product.category
        });
        router.push('/');
      }
    },

    mounted () {
        JsBarcode("#barcode", "123456", {
          lineColor: '#5c4084',
          height: 30,
          displayValue: true
        });
    }
  });
  
  var router = new VueRouter({
      routes: [
          {path: '/', component: List},
          {path: '/product/:product_id', component: Product, name: 'product'},
          {path: '/add-product', component: AddProduct},
          {path: '/product/:product_id/edit', component: ProductEdit, name: 'product-edit'},
          {path: '/product/:product_id/delete', component: ProductDelete, name: 'product-delete'}
      ]
  });
  
  
  var App = {}
  
  new Vue({
    router
  }).$mount('#app')
  