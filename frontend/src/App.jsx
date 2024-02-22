import { useState } from 'react';
import AnimeCarousel from './AnimeCarousel'
import './assets/style.css'
import { Input } from './Input';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
     <Input onSearch={handleSearch} />
     <AnimeCarousel searchTerm={searchTerm}/>
    </>
  )
}

export default App
