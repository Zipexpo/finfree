import { Input } from "./input";

const Autocomplete = ({ suggestions:[],onSelect }) => {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setQuery(value);
      setFilteredSuggestions(
        suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
      );
      setIsOpen(true);
    };
  
    const handleSelectSuggestion = (suggestion) => {
      setQuery(suggestion);
      onSelect(suggestion);
      setFilteredSuggestions([]);
      setIsOpen(false);
    };
  
    return (
      <div className="relative">
        <Input
          value={query}
          onChange={handleInputChange}
          placeholder="Type to search..."
          className="border border-gray-300 rounded-lg"
        />
  
        {isOpen && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {filteredSuggestions.map((suggestion) => (
              <div
                key={suggestion}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Autocomplete;