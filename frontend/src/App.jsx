import { useState } from 'react';
import AnimeCarousel from './pages/AnimeCarousel'
import './assets/style.css'
import { Input } from './components/Input';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
    <Header/>
    <div className='container-content'>
      <Input onSearch={handleSearch} />
      <AnimeCarousel searchTerm={searchTerm}/>
    </div>
    <Footer/>
    </>
  )
}

export default App
