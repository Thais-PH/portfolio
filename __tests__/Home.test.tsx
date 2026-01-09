import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Page d\'accueil', () => {
  it('affiche la barre de navigation avec le logo', () => {
    render(<Home />)
    expect(screen.getByText('THAÏS')).toBeInTheDocument()
    expect(screen.getByText('À propos')).toBeInTheDocument()
  })

  it('affiche la section Hero avec le titre principal', () => {
    render(<Home />)
    // Utilisation d'une regex pour matcher le texte partiel ou avec des spans
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Développeuse Full Stack/i)
    expect(screen.getByText(/Je suis Thaïs/i)).toBeInTheDocument()
  })

  it('affiche la section Compétences (Skills)', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: /Expertise Technique/i })).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('affiche la section Projets', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: /Projets Sélectionnés/i })).toBeInTheDocument()
    // Vérifie qu'il y a au moins un projet affiché
    expect(screen.getAllByText(/Nom du Projet/i).length).toBeGreaterThan(0)
  })

  it('affiche le formulaire de contact', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: /Parlons de votre projet/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Envoyer le message/i })).toBeInTheDocument()
  })
})
