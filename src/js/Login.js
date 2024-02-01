import '../css/Login.css';

function Login({
   selectedTab,
   setSelectedTab,
   userEmail,
   setUserEmail,
   password,
   setPassword,
 }) {
   const handleTabClick = (tabNumber) => {
     setSelectedTab(tabNumber);
   };
 
   const handleLogin = () => {
     // 여기서 로직 구현
   };
 
   const getLoginType = () => {
     switch (selectedTab) {
       case 1:
         return '구매자';
       case 2:
         return '판매자';
       case 3:
         return '디자이너';
       default:
         return '';
     }
   };
 
   return(
     <div className="Login">
         <div className='logo'>
           <h4>LOGO</h4>
         </div>
         <div className="rectangle">
           <div
             className={`tab ${selectedTab === 1 ? 'active' : ''}`}
             onClick={() => handleTabClick(1)}
           >
             구매자
           </div>
           <div
             className={`tab ${selectedTab === 2 ? 'active' : ''}`}
             onClick={() => handleTabClick(2)}
           >
             판매자
           </div>
           <div
             className={`tab ${selectedTab === 3 ? 'active' : ''}`}
             onClick={() => handleTabClick(3)}
           >
             디자이너
           </div>
         </div>
         <div className="loginForm">
           <div className="loginInputs">
             <label>
               이메일 :
               <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
             </label>
             <label>
               비밀번호 :
               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
             </label>
           </div>
           <div className='loginButton'>
               <button onClick={handleLogin}>Login</button>
           </div>
           <div className="buttons">
             <button>회원가입</button>
             <button>아이디 찾기</button>
             <button>비밀번호 찾기</button>
           </div>
           <p>선택된 로그인 유형설명 : {getLoginType()}</p>
         </div>
       </div>
   )
 }

export default Login;