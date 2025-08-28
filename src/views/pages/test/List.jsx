import React, { useContext, useEffect, useState } from "react";
import TestContext from "../../../context/TestContext";
import Header from "components/Headers/Header.js";
import ListGeneric from "./../../../components/List/Index.js"
import { Card, CardHeader, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

function List({ tab }) {

  const { 
    db:data, setDetail,  setToDetail, setToUpdate, setViewModal, setModule, deleteData,
    titleViewSupport, urlViewSupport, urlManualPdf 
  } = useContext(TestContext);

  const columns = [
    {
      dataField: "description",
      text: "DESCRIPTION",
      sort: true,
    }
  ];
                
  useEffect(() => {
    setDetail({});
    setToUpdate(0);
  },[]);

  return (
    <>
    <Header />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              
              {/*<ListGeneric data={data} columns={columns} detail="deliveries_zones" deleteData={deleteData} />*/}
              <div className="m-3">
                <Link 
                  className='btn btn-hensall'
                  color="hensall"
                  to={"add"}
                >
                  Add Test
                </Link>
              </div>
            </Card>
          </div>
        </Row>
        </Container>
    </>
  );
}

export default List;