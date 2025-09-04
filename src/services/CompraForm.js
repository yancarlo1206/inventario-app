export const validationsForm = (form) => {
    let errores = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexComments = /^.{1,255}$/;
    let regexText40 = /^.{1,40}$/;

    if (!form.fecha) {
        errores.fecha = "Please the field is required.";
    } else{
        errores.fecha = "";
    }

    if (!form.valor) {
        errores.valor = "Please the field is required.";
    } else{
        errores.valor = "";
    }

    if (!form.proveedor) {
        errores.proveedor = "Please the field is required.";
    } else{
        errores.proveedor = "";
    }
        
    return errores;
};

const CompraForm = {
    validationsForm,
  };
  
  export default CompraForm;