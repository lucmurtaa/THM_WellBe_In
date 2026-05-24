import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './auth.css'

export default function Auth() {
  const { user, loading: authLoading, signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    nome: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (authLoading) {
    return (
      <main className="dashboard-shell">
        <div className="loading-state">Carregando...</div>
      </main>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (!form.nome.trim() || !form.username.trim()) {
        setError('Preencha todos os campos obrigatórios.')
        return
      }
      if (form.password.length < 6) {
        setError('A senha deve ter no mínimo 6 caracteres.')
        return
      }
      if (form.password !== form.confirmPassword) {
        setError('As senhas não conferem.')
        return
      }
    }

    if (!form.email.trim() || !form.password) {
      setError('Preencha email e senha.')
      return
    }

    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn(form.email, form.password)
        navigate('/dashboard', { replace: true })
      } else {
        await signUp({
          email: form.email,
          password: form.password,
          nome: form.nome.trim(),
          username: form.username.trim(),
        })
        navigate('/dashboard', { replace: true })
      }
    } catch (err) {
      if (err.message?.includes('Invalid login credentials')) {
        setError('Email ou senha incorretos.')
      } else if (err.message?.includes('already registered')) {
        setError('Este email já está cadastrado.')
      } else if (err.message?.includes('already exists')) {
        setError('Este username já está em uso.')
      } else {
        setError(err.message || 'Erro inesperado. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  function switchMode() {
    setMode(prev => prev === 'login' ? 'register' : 'login')
    setError('')
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => mode !== 'login' && switchMode()}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => mode !== 'register' && switchMode()}
          >
            Criar conta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
          {mode === 'register' && (
            <>
              <div className="field">
                <label htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={form.nome}
                  onChange={e => updateField('nome', e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="nomeusuario"
                  value={form.username}
                  onChange={e => updateField('username', e.target.value)}
                />
              </div>
            </>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={e => updateField('email', e.target.value)}
              autoComplete={mode === 'login' ? 'email' : 'off'}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder={mode === 'register' ? 'Mínimo 6 caracteres' : 'Sua senha'}
              value={form.password}
              onChange={e => updateField('password', e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {mode === 'register' && (
            <div className="field">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Repita a senha"
                value={form.confirmPassword}
                onChange={e => updateField('confirmPassword', e.target.value)}
                autoComplete="new-password"
              />
            </div>
          )}

          {error && (
            <div className="auth-error">
              <span className="auth-error__icon">!</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn btn--primary auth-submit"
            disabled={loading}
          >
            {loading
              ? 'Aguarde...'
              : mode === 'login'
                ? 'Entrar'
                : 'Criar conta'}
          </button>
        </form>

        <div className="auth-divider">
          <span>{mode === 'login' ? 'Não tem conta?' : 'Já tem conta?'}</span>
        </div>

        <button type="button" className="auth-switch" onClick={switchMode}>
          {mode === 'login' ? 'Criar conta' : 'Fazer login'}
        </button>
      </div>
    </main>
  )
}
