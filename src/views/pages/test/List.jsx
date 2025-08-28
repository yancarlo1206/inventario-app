import React, { useContext, useEffect, useState } from "react";
import TestContext from "../../../context/TestContext";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ListGeneric from "./../../../components/List/Index.js"
import { Card, CardHeader, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

import CardHeaderSupport from "components/CardHeader/CardHeaderSupport";

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
    <SimpleHeader name="Delivery Zone List" parentName="Delivery Zone" toUrl="deliveries_zones" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeaderSupport 
                titleHeader="Delivery Zones Result List"
                textHeader="This is the list of delivery zones in the system." 
                titleViewSupport={titleViewSupport}
                urlViewSupport={urlViewSupport}
                urlManualPdf={urlManualPdf} />
              <ListGeneric data={data} columns={columns} detail="deliveries_zones" deleteData={deleteData} />
              <div className="m-3">
                <Link 
                  className='btn btn-hensall'
                  color="hensall"
                  to={"/admin/deliveries_zones/add"}
                >
                  Add Delivery Zone
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