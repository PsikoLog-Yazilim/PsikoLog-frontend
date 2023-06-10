import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "/home/arafta/Documents/projects/OKUL/Yazilim Mühendisliği/frontend2/PsikoLog-frontend/src/App.css";

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

    <nav className="navbar navbar-expand-lg navbar-light containerRenk">
      <div className="container">
        <a className="navbar-brand logo-Psiko" href="/">PsikoLog</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item deneme">
              <a className="nav-link" href="/">Ana Sayfa</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/psychologists">Psikologlar</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/chatbot">ChatBot</a>
            </li>
            {props.isLoggedIn ? (
            <>
            { }
              <li className="nav-item">
                 <a className='nav-link' href="/appointments">Randevular</a> 
              </li> 
              <li classname= "nav-item">
                <a className='nav-link' href="/messages">Mesajlarım</a>
                </li >
              <button className='buton-cikis'  onClick={handleLogout}>Çıkış Yap</button>
              </>
            ) : (
              <>
              <li className='nav-item'>
                <a className='nav-link' href="/patientSignUp">Hasta Kayıt</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href="/patientSignIn" >Hasta Giriş</a>
              </li>
              <li className='nav-item'>
              <a className='nav-link' href="/psychologistSignUp" >Psikolog Kayıt</a>
            </li>
            <li className='nav-item'>
            <a className='nav-link' href="/psychologistSignIn" >Psikolog Giriş</a>
          </li>
          </>


            )}
          </ul>
        </div>
      </div>
    </nav>  
  );
};

export default Navbar;
