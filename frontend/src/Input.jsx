

export const  Input = ({onSearch}) => {
    
    const handleValue = (event) => {
     const searchTerm = event.target.value;
      // Llama a la función de búsqueda proporcionada desde el padre
      onSearch(searchTerm);
    };
  
    return (
      <div className="input-container">
        <input
          type="Search"
          className="input-search"
          placeholder="Buscar animes por título..."
          onChange={handleValue}
        />
      </div>
    )
};


