import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello this my app</h1>
      <form action="/api" method="POST" encType="multipart/form-data">
        <label htmlFor='imageUploader'>Upload the image</label>
        <input id='imageUploader' type='file' name='image' required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
