import { useLanguage } from '../common/LanguageContext';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../common/StatusBar';
import TouchBar from '../common/TouchBar';

const Home = () => {
  return (
    <div className="home-screen">
      <StatusBar />
      
      <div className="home-main-content">
        {/* Home content will go here */}
        <h1 style={{ fontFamily: 'var(--font-title)', textAlign: 'center', marginTop: '40px' }}>
          Welcome Back
        </h1>
      </div>

      <TouchBar />
    </div>
  )
};

export default Home;
