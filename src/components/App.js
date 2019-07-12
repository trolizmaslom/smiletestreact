import React from 'react';
import Footer from "./Footer";
import Top from "./Top";
import Skulist from "./Sku/Skulist";

function App() {
  return (
      <div className="global-wrapper">
          <div className="main">
              <Top></Top>
              <div className="basket">
                  <Skulist/>
              </div>
          </div>
          <Footer></Footer>
      </div>
  );
}

export default App;
