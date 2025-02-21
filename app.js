import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' }
];

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonData);
      const res = await axios.post('https://your-api-url/bfhl', { data: data.data });
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const filteredResponse = () => {
    if (!response) return null;
    let filteredData = {};
    selectedOptions.forEach(option => {
        if (response[option.value] !== undefined) {
            filteredData[option.value] = response[option.value];
        }
    });
    return filteredData;
};


  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder='Enter JSON here'
          rows={5}
          cols={50}
        />
        <br/>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <Select
            isMulti
            value={selectedOptions}
            onChange={setSelectedOptions}
            options={options}
          />
          <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;
