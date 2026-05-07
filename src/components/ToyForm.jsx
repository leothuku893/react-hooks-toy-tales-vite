import { useState } from 'react';

function ToyForm({ onAddToy }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !image) {
      alert('Please fill out both fields');
      return;
    }
    
    const newToy = {
      name: name,
      image: image,
    };
    
    onAddToy(newToy);
    
    // Reset form
    setName('');
    setImage('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Add a Toy</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-text"
        />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input-text"
        />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;