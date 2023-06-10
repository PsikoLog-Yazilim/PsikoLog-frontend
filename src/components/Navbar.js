import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Çıkış işlemini gerçekleştirmek için gerekli kodu buraya ekleyin
    // Örneğin, localStorage veya çerezlerden tokeni kaldırabilirsiniz
    // setIsLoggedIn(false) olarak ayarlayın
    localStorage.removeItem('token');
    props.setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Ana Sayfa</Link></li>
        <li><Link to="/psychologists">Psikologlar</Link></li>
        <li><Link to="/chatbot">ChatBot</Link></li>
        {props.isLoggedIn ? (
          <>
            {/* Giriş yapıldıktan sonra gösterilecek öğeler */}
            <li>
              <li><Link to="/appointments">Randevularım</Link></li>
              <li><Link to="/messages">Mesajlarım</Link></li>
              <button onClick={handleLogout}>Çıkış Yap</button>
            </li>
          </>
        ) : (
          <>
            {/* Giriş yapılmadan önce gösterilecek öğeler */}
            <li><Link to="/patientSignUp">Hasta Kayıt</Link></li>
            <li><Link to="/patientSignIn">Hasta Giriş</Link></li>
            <li><Link to="/psychologistSignUp">Psikolog Kayıt</Link></li>
            <li><Link to="/psychologistSignIn">Psikolog Giriş</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
