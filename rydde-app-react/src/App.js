import './App.css';
import FamilySignUpForm from './components/FamilySignUpForm/FamilySignUpForm.js';
import BackgroundThings from './components/BackgroundThings/BackgroundThings.js';

function App() {
  return (
    <>
      <BackgroundThings />
      <FamilySignUpForm />

      <div className="color-palet-div">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default App;
