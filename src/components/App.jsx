import { useState, useEffect } from 'react';
import ToyForm from './ToyForm';
import ToyCard from './ToyCard';

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // GET: Fetch all toys on page load
  useEffect(() => {
    fetch('http://localhost:3000/toys')
      .then((response) => response.json())
      .then((data) => setToys(data))
      .catch((error) => console.error('Error fetching toys:', error));
  }, []);

  // POST: Add a new toy
  const addToy = (newToy) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0
      }),
    })
      .then((response) => response.json())
      .then((savedToy) => {
        setToys([...toys, savedToy]);
      })
      .catch((error) => console.error('Error adding toy:', error));
  };

  // PATCH: Update likes for a toy
  const updateLikes = (id, currentLikes) => {
    const newLikes = currentLikes + 1;
    
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: newLikes,
      }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        const updatedToys = toys.map((toy) =>
          toy.id === updatedToy.id ? updatedToy : toy
        );
        setToys(updatedToys);
      })
      .catch((error) => console.error('Error updating likes:', error));
  };

  // DELETE: Remove a toy (donate)
  const deleteToy = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const remainingToys = toys.filter((toy) => toy.id !== id);
          setToys(remainingToys);
        }
      })
      .catch((error) => console.error('Error deleting toy:', error));
  };

  return (
    <div className="app">
      <header>
        <h1>Toy Lab</h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="add-toy-btn"
        >
          {showForm ? "Hide Form" : "Add a Toy"}
        </button>
      </header>

      {showForm && <ToyForm onAddToy={addToy} />}

      <div className="toy-collection">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onUpdateLikes={updateLikes}
            onDeleteToy={deleteToy}
          />
        ))}
      </div>
    </div>
  );
}

export default App;