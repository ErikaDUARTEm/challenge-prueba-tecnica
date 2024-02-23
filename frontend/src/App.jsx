import { useState } from 'react';
import AnimeCarousel from './AnimeCarousel'
import './assets/style.css'
import { Input } from './Input';
import { Header } from './Header';
import { Footer } from './Footer';

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
