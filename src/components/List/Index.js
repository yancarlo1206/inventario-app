import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ReactBSAlert from "react-bootstrap-sweetalert";
import { Alert, Button, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import Moment from 'moment';

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={(e) => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        entries.
      </label>
    </div>
  ),
});

const { SearchBar } = Search;

function Index({ data, columns , detail, deleteData, downloadFile}) {

  const[columnTable, setColumnTable] = useState([]);
  const[viewTable, setViewTable] = useState(false);

  const[state, setState] = useState({});
  const[idDelete, setIdDelete] = useState();

  const NoDataIndication = () => (
    <Alert color="secondary" className="mt-2 mb-1 text-center">
      No results found.
    </Alert>
  );

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        {detail ? (
          <Link 
            className='btn btn-hensall btn-sm'
            color="hensall"
            to={"/admin/"+detail+"/detail/"+row.id}
          >
            Detail
          </Link>  
        ) 
        :("")}
        {downloadFile ? (
          <Button 
            className='btn btn-hensall btn-sm'
            onClick={e => handleDownload(e, row.id, row.url)}
          >
            Download
          </Button>
        ):("")}
        {deleteData ? (
          <Button
              className='btn btn-hensall-cancel btn-sm'
              onClick={e => handleDelete(e, row.id)}
          >
            Delete
          </Button>
        ):("")}
      </>
    );
  };

  const date = (cell, row, rowIndex, formatExtraData) => {
    return (
        <>
          { Moment(cell).format('MM/DD/YYYY') }
        </>
    );
  };

  const dateHour = (cell, row, rowIndex, formatExtraData) => {
    return (
        <>
          { Moment(cell).format('MM/DD/YYYY h:mm a') }
        </>
    );
  };

  const priceCAD = (cell, row, rowIndex, formatExtraData) => {
    return (
        <>
        CAD {cell}
        </>
        
    );
  };

  const object = {
    dataField: "action",
    text: "ACTION",
    formatter: linkFollow,
    sort: false
  }

  const hideAlert = () => {
    setState({
      alert: null
    });
  };

  const confirmAlert = (id) => {
    setState({
      alert: (
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onCancel={() => hideAlert()}
          onConfirm={() => {setIdDelete(id); hideAlert();}}
          showCancel
          confirmBtnBsStyle="hensall"
          confirmBtnText="Yes, delete it!"
          cancelBtnBsStyle="hensall-cancel"
          cancelBtnText="Cancel"
          btnSize=""
        >
          You won't be able to revert this!
        </ReactBSAlert>
      )
    });
  };

  useEffect(() => {
    loadData();
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

  const loadData = () => {
    columns.map(item => {
      if(item.formatter && item.formatter === 'dateHour'){
        item.formatter = dateHour;
      }
      if(item.formatter && item.formatter === 'date'){
        item.formatter = date;
      }
      if(item.formatter && item.formatter === 'priceCAD'){
        item.formatter = priceCAD;
      }
    });
    columns.push(object);
    setColumnTable(columns);
    setViewTable(true);
  }

  const handleDownload = (e, id, file_path) => {
    e.preventDefault();
    downloadFile(id, file_path);
  }
  
  return (
    <>
      {state.alert}
      {viewTable && data.length > 0 ? ( 
        <>
        <ToolkitProvider
          data={data}
          keyField="id"
          columns={columnTable}
          search
          >
          {(props) => (
            <div className="py-4 table-responsive">
              <div
                id="datatable-basic_filter"
                className="dataTables_filter px-4 pb-1"
              >
                <label>
                  Search:
                  <SearchBar
                    className="form-control-sm"
                    placeholder=""
                    {...props.searchProps}
                  />
                </label>
              </div>
              <BootstrapTable
                {...props.baseProps}
                bootstrap4={true}
                pagination={pagination}
                bordered={false}
                noDataIndication={NoDataIndication}
              />
            </div>
          )}
        </ToolkitProvider>
        </> 
      ) : (
        <CardBody>
          <Alert color="secondary" className="m-2">
            There is no information to display in this section.
          </Alert>
        </CardBody>
      )}
    </>
  );
}

export default Index;