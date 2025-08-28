export const validationsForm = (form) => {
    let errores = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexComments = /^.{1,255}$/;
    let regexText40 = /^.{1,40}$/;

    if (!form.description) {
        errores.description = "Please the field is required.";
    } else if (!regexText40.test(form.description.trim())) {
        errores.description = "The field accepts up to 40 characters.";
    } else{
        errores.description = "";
    }

    return errores;
};

const TestForm = {
    validationsForm,
  };
  
  export default TestForm;