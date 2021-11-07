import React from 'react';
import './App.css';
import SuperCheckbox from "./components/checkbox/SuperCheckbox";
import SuperButton from "./components/button/SuperButton";
import SuperInput from "./components/input/SuperInput";
import SuperEditableSpan from "./components/editableSpan/SuperEditableSpan";
import SuperRadio from "./components/radioButton/SuperRadio";
import SuperSelect from "./components/select/SuperSelect";
import Preloader from "./components/preloader/Preloader";


function App() {
  return (
    <div>
        <SuperCheckbox/>
        <SuperButton>Hello</SuperButton>
        <SuperInput />
        <SuperEditableSpan />
        <SuperRadio options={['']} onChangeOption={() => {}} />
        <SuperSelect options={['']} onChangeOption={() => {}} />
        <Preloader />
    </div>
  );
}

export default App;
