/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Row, Col } from 'react-bootstrap'
import React, { useState, useRef, useEffect } from "react";
import { det } from 'mathjs'
import { Select } from 'antd';
const { Option } = Select;
const Cramer = () => {

    const [matrixSize, setMatrixSize] = useState({
        rows: 2,
        columns: 2,
    })

    const allRef = useRef()


    useEffect(() => {
        setMatrixSize({
            ...matrixSize,
            columns: matrixSize.columns,
            rows: matrixSize.rows
        }
        )
        allRef.current.value = matrixSize.rows;
    }, [matrixSize.rows]);


    let matrix = Array(matrixSize.rows)
    let output = Array(matrixSize.rows)

    for (let i = 0; i < matrixSize.rows; i++) {
        matrix[i] = new Array(matrixSize.columns).fill(0)
        output[i] = new Array(matrixSize).fill(0)
    }

    const [result, setresult] = useState(null)

    const handleMatrix = event => {
        event.preventDefault();
        let count = 0;
        for (let i = 0; i < matrixSize.rows; i++) {
            for (let j = 0; j < matrixSize.columns; j++) {

                matrix[i][j] = parseFloat(event.target[count].value)
                count += 1;
            }

            output[i] = parseFloat(event.target[count].value)
            count += 1;
        }
        console.log("matrix", matrix, output)
        CalCramer();
    }

    const CalCramer = () => {
        let ans = Array(matrixSize.rows)
        let a = Array(matrixSize.rows)

        for (let i = 0; i < matrixSize.rows; i++) {
            a[i] = new Array(matrixSize.columns).fill(0)
        }

        for (let k = 0; k < matrixSize.rows; k++) {
            if (det(matrix) === 0) {
                alert("Det Matrix = 0")
                break;
            }

            for (let i = 0; i < matrixSize.rows; i++) {
                for (let j = 0; j < matrixSize.columns; j++) {
                    a[i][j] = matrix[i][j]
                }
            }

            let l = 0;
            while (l < matrixSize.rows) {
                a[l][k] = output[l]
                l++;
            }

            ans[k] = det(a) / det(matrix)
        }
        console.log("ans1", ans)

        setresult(ans)
        console.log("result", result)

    }

    return (
        <div className="container mt-8">

            <h2>Cramer's Rule</h2>

            <Form.Group as={Row} controlId="XL">
                <Form.Label column sm="1">
                    Size Matrix:
                </Form.Label>
                <Col md={1}>
                    <Select defaultValue={2} style={{ width: 120 }} ref={allRef} onChange={e => {
                        setMatrixSize(({
                            
                            rows: e,
                            columns: e,
                        }))

                    }} showSearch
                    >
                        <Option value={2}>2x2</Option>
                        <Option value={3}>3x3</Option>
                        <Option value={4}>4x4</Option>
                        <Option value={5}>5x5</Option>
                    </Select>
                </Col>
            </Form.Group>
            <br></br>
            <div className="mt-8">
                <form onSubmit={handleMatrix}>
                    {matrix.map((row, indexRow = 1) => {
                        return (
                            <div className="d-flex" >
                                {row.map((item, indexColumn = 1) => {
                                    return (
                                        <div className="d-inline-block me-1">
                                            <Form.Control
                                                required
                                                placeholder={"a" + indexRow + indexColumn}
                                                key={indexRow + " " + indexColumn}
                                                name={indexRow + "," + indexColumn}
                                            />
                                        </div>
                                    )
                                })}

                                <Form.Group as={Row} className="mb-2 sm-1 ms-1">
                                    <Col >

                                        <Form.Control
                                            required
                                            placeholder={"b" + indexRow}
                                            key={indexRow}
                                            name={indexRow}
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                        )
                    })}
                    <button className="btn btn-primary">ยืนยัน</button>
                </form>
            </div>

            <div className='col-mt-6'>
                {result !== null && (
                    <div>
                        {result.map((x, index) => (

                            <h3>X{index} : {x}</h3>

                        ))}
                    </div>
                )}
            </div>


        </div>
    )

}

export default Cramer;