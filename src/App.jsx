import { useState } from 'react';
import Login from './components/Modals/Login/Login';

import './styles/style.scss';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)} className="p-8">
        open
      </button>
      <Login isOpen={open} setIsOpen={() => setOpen()} />
    </>
  );
}

export default App;
