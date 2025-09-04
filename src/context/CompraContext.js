import { helpHttp } from "helpers/helpHttp";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { TYPES } from "actions/genericAction";
import { genericReducer, genericInitialState } from "../reducers/genericReducer";
import NotificationContext from "context/NotificationContext";
import LoadingContext from "context/LoadingContext";
import { useNavigate } from "react-router";

const CompraContext = createContext();

const CompraProvider = ({children}) => {

    const [toDetail, setToDetail] = useState();
    const [toUpdate, setToUpdate] = useState();
    const [detail, setDetail] = useState({});
    const [module, setModule] = useState();
    const [proveedores, setProveedores] = useState([]);
    const [articulos, setArticulos] = useState([]);

    const [articulosCompra, setArticulosCompra] = useState([]);
    const [articulosCompraEnviar, setArticulosCompraEnviar] = useState([]);

    const [verModalArticulo, setVerModalArticulo] = useState();

    const navigate = useNavigate();
    const { REACT_APP_API_URL } = process.env;

    const { setMessage, setStatus, setType } = useContext(NotificationContext);
    const { setLoading } = useContext(LoadingContext);

    const [state, dispatch] = useReducer(genericReducer, genericInitialState);
    const { db } = state;

    let api = helpHttp();
    let url = REACT_APP_API_URL+"compra";

    useEffect(() => {
        fetchData();
        fetchDataProveedores();
        fetchDataArticulos();
    },[]);

    useEffect(() => {
        if(toUpdate && toUpdate != 0){
            fetchDataDetail();
        }
    },[toUpdate]);

    const fetchData = () => {
        setLoading(true);
         api.get(url).then((res) => {
            if(!res.err){
                dispatch({ type: TYPES.READ_ALL_DATA, payload: res.data });
            }else{
                dispatch({ type: TYPES.NO_DATA });
            }
            setLoading(false);
        });
    };

    const fetchDataDetail = () => {
        setLoading(true);
        url = url+"/"+toUpdate;
        api.get(url).then((res) => {
            res.data.categoria = res.data.categoria.id;
            setDetail(res.data);
            setLoading(false);
        });
    };

    const fetchDataProveedores = () => {
        let urlFetch = REACT_APP_API_URL+"proveedor";
        api.get(urlFetch).then((res) => {
            var data = res.data.map(function (obj) {
                obj.text = obj.text || obj.nombre;
                return obj;
            });
            setProveedores(data);
        });
    };

    const fetchDataArticulos = () => {
        let urlFetch = REACT_APP_API_URL+"articulo";
        api.get(urlFetch).then((res) => {
            var data = res.data.map(function (obj) {
                obj.text = obj.text || obj.nombre;
                return obj;
            });
            setArticulos(data);
        });
    };

    const saveData = (data) => {
        setLoading(true);
        let endpoint = url;
        let categoria = {id: data.categoria}
        let newData = data;
        newData.categoria = categoria;
        delete newData.id;
        let options = {
            body: newData,
            headers: {"content-type":"application/json"}
        }
        api.post(endpoint, options).then((res) => {
            if(!res.err){
                dispatch({ type: TYPES.CREATE_DATA, payload: res.data });
                navigate('/admin/compra/');
                setType("success");
                setMessage("The registry was updated correctly");
                setStatus(1);
            }else{

            }
            setLoading(false);
        })
    }

    const updateData = (data) => {
        setLoading(true);
        let endpoint = url+"/"+data.id;
        let categoria = {id: data.categoria}
        let newData = data;
        newData.categoria = categoria;
        delete newData.id;
        let options = {
            body: newData,
            headers: {"content-type":"application/json"}
        }
        api.put(endpoint, options).then((res) => {
            if(!res.err){
                setDetail(res.data);
                dispatch({ type: TYPES.UPDATE_DATA, payload: res.data });
                navigate('/admin/compra');
                setType("success");
                setMessage("The registry was updated correctly");
                setStatus(1);
            }else{

            }
            setLoading(false);
        })
    }

    const deleteData = (id) => {
        setLoading(true);
        let endpoint = url+"/"+id;
        let options = {
            body: "",
            headers: {"content-type":"application/json"}
        }
        api.del(endpoint, options).then((res) => {
            if(!res.err){
                dispatch({ type: TYPES.DELETE_DATA, payload: id });
                setType("success");
                setMessage("The registry was deleted correctly");
                setStatus(1);
            }else{
                setType("danger");
                setMessage(res.message.message);
                setStatus(1);
            }
            setLoading(false);
        });
    }

    const addArticuloCompra = (data) => {
        setLoading(true);
        let exist = false;
        articulosCompra.map((el) => {
            if(el.articulo === data.articulo){
                exist = true;
                return;
            }
        });
        if(exist){
            setType("danger");
            setMessage("El Articulo ya existe");
            setStatus(1);
            setLoading(false);
            return;
        }else{
            setArticulosCompra((articulosCompra) => {
                return [...articulosCompra, {"articulo":data.articulo, "articulo_text":data.nombre, "precio": data.precio,"cantidad":data.cantidad}]
            })
            setArticulosCompraEnviar((articulosCompraEnviar) => {
                return [...articulosCompraEnviar, {"articulo":data.articulo, "precio": data.precio,"cantidad":data.cantidad}]
            })
        }
        setLoading(false);
    }

    const deleteArticuloCompra = (invoice_detail) => {
        setLoading(true);
        let newData = articulosCompra.filter((el) => el.articulo !== invoice_detail);
        let newDataSend = articulosCompraEnviar.filter((el) => el.articulo !== invoice_detail);
        setArticulosCompra(newData);
        setArticulosCompraEnviar(newDataSend);
        setLoading(false);
    }

    const data = { 
        db, detail, setToDetail, setToUpdate, updateData, saveData, deleteData, module, 
        setModule, setDetail, proveedores, articulosCompra, setArticulosCompra, articulos, 
        verModalArticulo, setVerModalArticulo, addArticuloCompra, deleteArticuloCompra 
    };

    return <CompraContext.Provider value={data}>{children}</CompraContext.Provider>;
}

export { CompraProvider };
export default CompraContext;