//123 - DESENVOLVIMENTO DE APLICAÇÕES MÓVEIS 2024/2
//123 DESENVOLVIMENTO DE APLICAÇÕES MÓVEIS	 Sérgio Assunção Monteiro	LAB 3	21:00 às 22:00	Rio Comprido
// NOME: GABRIEL RANGEL FIGUEIREDO
// MATRICULA: 2021100303

import React, { useState } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

function App() {
  // Lista de produtos disponíveis
  const [products] = useState([
    { id: 1, name: "Arroz", preco: 34.49, image: "https://prezunic.vtexassets.com/arquivos/ids/179050-1200-auto?v=638368808928830000&width=1200&height=auto&aspect=true" },
    { id: 2, name: "Feijão", preco: 9.99, image: "https://prezunic.vtexassets.com/arquivos/ids/180992-300-300?v=638368813478330000&width=300&height=300&aspect=true" },
    { id: 3, name: "Açúcar", preco: 5.59, image: "https://prezunic.vtexassets.com/arquivos/ids/178968-300-300?v=638368808728830000&width=300&height=300&aspect=true" },
    { id: 4, name: "Óleo de cozinha", preco: 6.99, image: "https://prezunic.vtexassets.com/arquivos/ids/179235-300-300?v=638368809344200000&width=300&height=300&aspect=true" },
    { id: 5, name: "Farinha de trigo", preco: 6.89, image: "https://prezunic.vtexassets.com/arquivos/ids/179049-300-300?v=638368808928670000&width=300&height=300&aspect=true" },
    { id: 6, name: "Leite", preco: 5.99, image: "https://prezunic.vtexassets.com/arquivos/ids/179550-300-300?v=638368809966400000&width=300&height=300&aspect=true" },
    { id: 7, name: "Café", preco: 22.98, image: "https://prezunic.vtexassets.com/arquivos/ids/180664-300-300?v=638368812658230000&width=300&height=300&aspect=true" },
    { id: 8, name: "Macarrão", preco: 8.97, image: "https://prezunic.vtexassets.com/arquivos/ids/180483-300-300?v=638368812246870000&width=300&height=300&aspect=true" },
    { id: 9, name: "Sabão em pó", preco: 18.99, image: "https://prezunic.vtexassets.com/arquivos/ids/177394-300-300?v=638326463544100000&width=300&height=300&aspect=true" },
    { id: 10, name: "Whisky", preco: 219.99, image: "https://prezunic.vtexassets.com/arquivos/ids/182254-300-300?v=638368816155630000&width=300&height=300&aspect=true" },
  ]);

  // Estado para armazenar o carrinho de compras
  const [cart, setCart] = useState([]);
  
  // Estado de busca
  const [busca, setBusca] = useState('');

  // Função para adicionar produtos ao carrinho
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Função para remover produtos do carrinho
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Função para editar a quantidade de produtos no carrinho
  const updateQuantity = (productId, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  // Calcular o preço total do carrinho e formatar com duas casas decimais
  const totalpreco = cart
    .reduce((total, item) => total + item.preco * item.quantity, 0)
    .toFixed(2);

  // Função para buscar produtos na lista
  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
  };

  // Filtra os itens da lista de produtos com base na busca
  const produtosFiltrados = products.filter((item) =>
    item.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="header">
        <i className="fas fa-shopping-cart"></i> Carrinho de Compras
      </h1>

      {/* Campo de Busca */}
      <input
        type="text"
        placeholder="Buscar produto..."
        value={busca}
        onChange={handleBuscaChange}
      />

      {/* Lista de Produtos Disponíveis */}
      <h2>Produtos Disponíveis</h2>
      <div className="product-container">
        {produtosFiltrados.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <span className="product-name">{product.name}</span>
            <span className="product-preco">R$ {product.preco.toFixed(2)}</span>
            <button className="add-button" onClick={() => addToCart(product)}>
              <i className="fas fa-cart-plus"></i> Adicionar
            </button>
          </div>
        ))}
      </div>

      {/* Carrinho de Compras */}
      <h2>
        <i className="fas fa-shopping-cart"></i> Carrinho de Compras
      </h2>
      <div className="cart-container">
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span className="item-name">{item.name}</span>
              <span className="item-preco">R$ {item.preco.toFixed(2)}</span>
              <span className="item-quantity">
                Quantidade:{" "}
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                />
              </span>
              <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                <i className="fas fa-trash"></i> Remover
              </button>
            </div>
          ))
        )}
      </div>

      {/* Preço Total */}
      {cart.length > 0 && (
        <div className="total">
          <h3>Total: R$ {totalpreco}</h3>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
