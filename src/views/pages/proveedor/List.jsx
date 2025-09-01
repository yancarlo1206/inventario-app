import React, { useContext, useEffect, useState } from "react";
import ProveedorContext from "../../../context/ProveedorContext";
import Header from "components/Headers/Header.js";
import ListGeneric from "../../../components/List/Index.js"
import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FormGroup, Label, Input, Button } from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";

function List({ tab }) {

  const { 
    db:data, setDetail,  setToDetail, setToUpdate, setViewModal, setModule, deleteData
  } = useContext(ProveedorContext);

  const [filter, setFilter] = useState("");

  const[state, setState] = useState({});
  const[idDelete, setIdDelete] = useState();

  const filteredData = data.filter(item =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  const columns = [
    { name: "ID", selector: row => row.id, sortable: true },
    { name: "Nombre", selector: row => row.nombre, sortable: true },
    { name: "Direccion", selector: row => row.direccion, sortable: true },
    { name: "Telefono", selector: row => row.telefono, sortable: true },
    { name: "Correo", selector: row => row.correo, sortable: true },
    { name: "Acciones", cell: row => (
      <> 
      <Link className='btn btn-primary btn-sm'
            color="primary"
            to={"/admin/proveedor/detail/"+row.id}
        >
        Detallar
        </Link>
      <Button
            className='btn btn-danger btn-sm'
            onClick={e => handleDelete(e, row.id)}
        >
            Eliminar
      </Button>
      </>
    )}
  ];

  const confirmAlert = (id) => {
    setState({
      alert: (
        <ReactBSAlert
          warning
          style={{ display: "block" }}
          title="¿Estás seguro?"
          onCancel={() => hideAlert()}
          onConfirm={() => {setIdDelete(id); hideAlert();}}
          showCancel
          confirmBtnBsStyle="primary"
          confirmBtnText="Si, Eliminarlo!"
          cancelBtnBsStyle="danger"
          cancelBtnText="Cancelar"
          btnSize=""
        >
          No podrás revertir esto!
        </ReactBSAlert>
      )
    });
  };

  const hideAlert = () => {
    setState({
      alert: null
    });
  };
                
  useEffect(() => {
    setDetail({});
    setToUpdate(0);
  },[]);

  useEffect(() => {
    if(idDelete){
      deleteData(idDelete);
    }
  },[idDelete]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    confirmAlert(id);
  }

  return (
    <>
    {state.alert}
    <Header />
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="">
              <div className="align-items-center row">
                <div className="col-11">
                  <h3 className="mb-0">Proveedores</h3>
                  <p className="text-sm mb-0">
                    Listado de proveedores registrados en el sistema
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="buscar">Buscar</Label>
                <Input
                  id="buscar"
                        type="text"
                        placeholder="Buscar..."
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                      />
                    </FormGroup>
                    <DataTable
                      columns={columns}
                      data={filteredData}
                      pagination
                      highlightOnHover
                    />
                    <div className="m-3">
                      <Link 
                        className='btn btn-primary'
                        color="primary"
                        to={"add"}
                      >
                        Agregar Proveedor
                      </Link>
                    </div>
            </CardBody>
          </Card>
        </div>
      </Row>
    </Container>
    </>
  );
}

export default List;