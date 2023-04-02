import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProductsPage from './pages/productspage';
import CreateProductPage from './pages/createProductPage';
import ProductPage from './pages/productPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductsPage />}/>
          <Route path="/create-product" element={<CreateProductPage />}/>
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </div>
  );  
}

export default App;
