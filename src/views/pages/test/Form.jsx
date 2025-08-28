import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
  
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { Link, useParams } from "react-router-dom";
import TestContext from "context/TestContext";
import TestFormValidate from "../../../services/testForm";
import { useForm } from "hooks/useForm";

const initialForm = {
    description: "",
};

const Formulario = ( ) => {

    const { 
        detail:data, updateData, saveData, setModule, module, setToDetail,setDetail, 
        setToUpdate, titleViewSupport, urlViewSupport, urlManualPdf
    } = useContext(TestContext);

    const {
        validateInit,
        validate,
        form,
        errors,
        setValidateInit,
        setValidate,
        setForm,
        setErrors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm(initialForm, TestFormValidate.validationsForm);

    const { id } = useParams();

    useEffect(() => {
        if(id){
            setToDetail(id);
            setToUpdate(id);
            setModule("update");
        }else{
            setModule("add");
        }
    },[]);

    useEffect(() => {
        setForm(data);
        setErrors(initialForm);
    },[data]);
    
    const handleUpdate = (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if(valid){
            updateData(form);
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if(valid){
            saveData(form);
        }
    }

    return (
      <>
        <SimpleHeader name={"Delivery Zone "+module?.toUpperCase()} parentName="Delivery Zone" toUrl="deliveries_zones" />
        <Container className="mt--6" fluid>
            <Row>
                <div className="col">
                <Card>
                    <CardBody>
                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                            Information
                            </h6>
                            <div className="pl-lg-4">
                            <Row>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-description"
                                        >
                                        Description <span className="text-hensall">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-description"
                                        placeholder=""
                                        type="text"
                                        name="description"
                                        required="required"
                                        invalid={errors.description !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.description}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.description}
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="col justify-content-end">
                                {module == "update" ? (
                                    <Button
                                        color="hensall"
                                        href=""
                                        onClick={handleUpdate}
                                        >
                                        Update
                                    </Button>
                                ) : (
                                    <Button
                                        color="hensall"
                                        href=""
                                        onClick={handleSave}
                                        >
                                        Save 
                                    </Button>
                                )}
                                <Link
                                    className="btn btn-hensall-cancel"
                                    color="default"
                                    to={"/admin/deliveries_zones"}
                                    >
                                    Cancel
                                </Link>
                            </Row>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                </div>
            </Row>
        </Container>
      </>
    );
  };
  
  export default Formulario;