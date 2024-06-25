import Logo from '../assets/logo.png'
import './Header.css'

export default function Header() {
  return (
    <main>
      <header id='header-principal'>
        <img id='logo' src={Logo} alt="Logo da empresa" />
      </header>
    </main>
  )
}
