
// import React from 'react';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../Firebase';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const navigate = useNavigate
//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();

//     try {
//       await signInWithPopup(auth, provider);
//       navigate('/home')
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <button onClick={handleGoogleLogin} className="bg-white rounded-[10px] p-3">
//         Login with Google
//       </button>
//     </div>
//   );
// };

// export default Login;


import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // No need to store email in localStorage
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Handle logged in state if needed
        navigate('/home');
      } else {
        // Handle logged out state if needed
      }
    });

    return () => unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <button onClick={handleGoogleLogin} className="bg-white rounded-[10px] p-3">
        Login with Google
      </button>
    </div>
  );
};

export default Login;
