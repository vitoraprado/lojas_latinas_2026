"use client"
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { request } from '../../../../lib/api'
import { getUser, logout } from '../../../services/auth';

const emptyCategory = { id: null, name: '', description: '' }
const emptyProduct = { id: null, category_id: 0, name: '', price: 0, stock: 0 }

export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(emptyCategory)
  const [product, setProduct] = useState(emptyProduct)
  const [message, setMessage] = useState('')

  const load = async () => {
    try {
      // Extrai a propriedade .data dos novos objetos de resposta da API
      const resCategories = await request('/categories')
      const resProducts = await request('/products')
      
      setCategories(resCategories?.data || [])
      setProducts(resProducts?.data || [])
      setMessage('Dados carregados com sucesso.')
    } catch (error) {
      setMessage(error.message || 'Falha ao carregar dados.')
    }
  }

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.push('./login');
      return;
    }

    if (user.user_type !== 1) {
      router.push('/');
    }

    load();
  }, []);

  const saveCategory = async () => {
    try {
      if (category.id) {
        await request(`/categories/${category.id}`, { method: 'PUT', body: JSON.stringify(category) })
      } else {
        await request('/categories', { method: 'POST', body: JSON.stringify(category) })
      }
      setCategory(emptyCategory)
      await load()
      setMessage('Categoria salva com sucesso.')
    } catch (error) {
      setMessage(error.message || 'Falha ao salvar categoria.')
    }
  }

  const saveProduct = async () => {
    try {
      if (product.id) {
        await request(`/products/${product.id}`, { method: 'PUT', body: JSON.stringify(product) })
      } else {
        await request('/products', { method: 'POST', body: JSON.stringify(product) })
      }
      setProduct(emptyProduct)
      await load()
      setMessage('Produto salvo com sucesso.')
    } catch (error) {
      setMessage(error.message || 'Falha ao salvar produto.')
    }
  }

  const removeCategory = async (id) => {
    await request(`/categories/${id}`, { method: 'DELETE' })
    await load()
    setMessage('Categoria removida com sucesso.')
  }

  const removeProduct = async (id) => {
    await request(`/products/${id}`, { method: 'DELETE' })
    await load()
    setMessage('Produto removido com sucesso.')
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <main className="container">
        
        {/* Cabeçalho da Página */}
        <div className="d-flex align-items-center mb-2">
          <i className="bi bi-person-vcard text-primary me-2" style={{ fontSize: '2rem' }}></i>

          <h1 className="fw-bold text-dark mb-0">
            Área do Funcionário
          </h1>

          <button
            className="btn btn-primary ms-auto fw-bold"
            onClick={() => {
              logout();
              router.push('./login');
            }}
          >
            Sair
          </button>
        </div>

        {/* Alerta de Mensagem do Sistema */}
        {message ? (
          <div className="alert alert-primary border-0 shadow-sm rounded-3 mb-4 d-flex align-items-center" role="alert">
            <i className="bi bi-info-circle-fill me-2 fs-5"></i>
            <div>{message}</div>
          </div>
        ) : null}

        {/* Grade Principal (Categorias e Produtos lado a lado) */}
        <div className="row g-4">
          
          {/* SEÇÃO: CATEGORIAS */}
          <section className="col-12 col-xl-5">
            <div className="card shadow-sm border-0 rounded-3 bg-white h-100">
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h3 className="fw-bold text-dark mb-0 d-flex align-items-center">
                  <i className="bi bi-tags text-primary me-2"></i> Categorias
                </h3>
              </div>
              
              <div className="card-body p-4">
                {/* Formulário de Cadastro/Edição */}
                <div className="row g-2 mb-4">
                  <div className="col-12">
                    <input 
                      type="text"
                      className="form-control" 
                      placeholder="Nome da categoria" 
                      value={category.name} 
                      onChange={e => setCategory({ ...category, name: e.target.value })} 
                    />
                  </div>
                  <div className="col-12">
                    <input 
                      type="text"
                      className="form-control" 
                      placeholder="Descrição curta" 
                      value={category.description} 
                      onChange={e => setCategory({ ...category, description: e.target.value })} 
                    />
                  </div>
                  <div className="col-12 d-flex gap-2 mt-3">
                    <button onClick={saveCategory} className="btn btn-primary fw-bold w-100 d-inline-flex align-items-center justify-content-center">
                      <i className={`bi ${category.id ? 'bi-check-circle' : 'bi-plus-circle'} me-2`}></i>
                      {category.id ? 'Atualizar' : 'Adicionar'}
                    </button>
                    {category.id ? (
                      <button onClick={() => setCategory(emptyCategory)} className="btn btn-outline-secondary">
                        Cancelar
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* Tabela de Exibição */}
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light text-muted small">
                      <tr>
                        <th scope="col" className="border-0">ID</th>
                        <th scope="col" className="border-0">Nome</th>
                        <th scope="col" className="border-0">Descrição</th>
                        <th scope="col" className="border-0 text-end">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(item => (
                        <tr key={item.id}>
                          <td className="text-secondary fw-bold">#{item.id}</td>
                          <td className="fw-bold text-dark">{item.name}</td>
                          <td className="text-muted small">{item.description || '—'}</td>
                          <td className="text-end text-nowrap">
                            <button onClick={() => setCategory({ id: item.id, name: item.name, description: item.description ?? '' })} className="btn btn-light btn-sm text-primary me-1 rounded-2" title="Editar">
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button onClick={() => removeCategory(item.id)} className="btn btn-light btn-sm text-danger rounded-2" title="Excluir">
                              <i className="bi bi-trash3"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO: PRODUTOS */}
          <section className="col-12 col-xl-7">
            <div className="card shadow-sm border-0 rounded-3 bg-white h-100">
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h3 className="fw-bold text-dark mb-0 d-flex align-items-center">
                  <i className="bi bi-box-seam text-primary me-2"></i> Produtos
                </h3>
              </div>

              <div className="card-body p-4">
                {/* Formulário de Cadastro/Edição */}
                <div className="row g-2 mb-4">
                  <div className="col-12 col-md-6">
                    <select className="form-select" value={product.category_id} onChange={e => setProduct({ ...product, category_id: Number(e.target.value) })}>
                      <option value={0}>Selecione a categoria</option>
                      {categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <input 
                      type="text"
                      className="form-control" 
                      placeholder="Nome do produto" 
                      value={product.name} 
                      onChange={e => setProduct({ ...product, name: e.target.value })} 
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted">R$</span>
                      <input 
                        type="number" 
                        step="0.01" 
                        className="form-control"
                        placeholder="Preço" 
                        value={product.price} 
                        onChange={e => setProduct({ ...product, price: Number(e.target.value) })} 
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <input 
                      type="number" 
                      className="form-control"
                      placeholder="Estoque" 
                      value={product.stock} 
                      onChange={e => setProduct({ ...product, stock: Number(e.target.value) })} 
                    />
                  </div>
                  <div className="col-12 d-flex gap-2 mt-3">
                    <button onClick={saveProduct} className="btn btn-primary fw-bold w-100 d-inline-flex align-items-center justify-content-center">
                      <i className={`bi ${product.id ? 'bi-check-circle' : 'bi-plus-circle'} me-2`}></i>
                      {product.id ? 'Atualizar' : 'Adicionar'}
                    </button>
                    {product.id ? (
                      <button onClick={() => setProduct(emptyProduct)} className="btn btn-outline-secondary">
                        Cancelar
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* Tabela de Exibição */}
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light text-muted small">
                      <tr>
                        <th scope="col" className="border-0">ID</th>
                        <th scope="col" className="border-0">Produto</th>
                        <th scope="col" className="border-0">Categoria</th>
                        <th scope="col" className="border-0">Preço</th>
                        <th scope="col" className="border-0 text-center">Estoque</th>
                        <th scope="col" className="border-0 text-end">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(item => (
                        <tr key={item.id}>
                          <td className="text-secondary fw-bold">#{item.id}</td>
                          <td className="fw-bold text-dark">{item.name}</td>
                          <td>
                            <span className="badge bg-light text-secondary rounded-pill px-3 py-2">
                              {item.category_name || `ID: ${item.category_id}`}
                            </span>
                          </td>
                          <td className="fw-bold text-dark">R$ {Number(item.price).toFixed(2)}</td>
                          <td className="text-center">
                            <span className={`fw-bold ${item.stock < 5 ? 'text-danger' : 'text-success'}`}>
                              {item.stock} un
                            </span>
                          </td>
                          <td className="text-end text-nowrap">
                            <button onClick={() => setProduct({ id: item.id, category_id: Number(item.category_id), name: item.name, price: Number(item.price), stock: Number(item.stock) })} className="btn btn-light btn-sm text-primary me-1 rounded-2" title="Editar">
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button onClick={() => removeProduct(item.id)} className="btn btn-light btn-sm text-danger rounded-2" title="Excluir">
                              <i className="bi bi-trash3"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}