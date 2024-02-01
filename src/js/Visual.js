import '../css/Visual.css';
import React, { useEffect, useState } from 'react';

function Visual() {
   const [showWaterSaved, setShowWaterSaved] = useState(false);
 
   useEffect(() => {
     setTimeout(() => {
       setShowWaterSaved(true);
     }, 3000);
   }, []);
 
   return (
     <div className="pipe">
       <div className="valve"></div>
       <div className="pipe1"></div>
       <div className="pipe2"></div>
       <div className="water"></div>
       <div className="waterRise"></div>
       {showWaterSaved && (
         <div className="waterSavedMessage">
           <h4>아낀 물의 총량: 00L</h4>
         </div>
       )}
     </div>
   );
}

export default Visual;