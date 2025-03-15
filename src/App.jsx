import React from 'react'
import Hero from './components/Hero'
import Chatbot from './Components/Chatbot' 

const App = () => {
  const routes = [
    { path: "/", element: <Hero /> },
    { path: "/chat", element: <Chatbot /> }
  ];  

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes> 
      </Router>
    </div>
  );
};

export default App;
