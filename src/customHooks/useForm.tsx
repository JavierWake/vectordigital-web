import React, {useState} from 'react';
//https://medium.com/@geeky_writer_/using-react-hooks-to-create-awesome-forms-6f846a4ce57
const useForm = (callback: any, fields: any) => {
    const [inputs, setInputs] = useState(fields);

    const handleSubmit = (event: any) => {
      if (event) {
        event.preventDefault();
        //callback();
      }
      //console.log('llega aqui');
      callback(inputs);
    }

    const handleInputChange = (nombreInput: string, valorInput: string) => {
      //event.persist();
      //setInputs((inputs: any) => ({...inputs, [event.target.name]: event.target.value}));
      setInputs((inputs: any) => ({...inputs, [nombreInput]: valorInput}));
    }

    return {
      handleSubmit,
      handleInputChange,
      inputs
    };
  }

  export default useForm;