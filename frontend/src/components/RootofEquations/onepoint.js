import React, { useEffect, useState } from "react";
import Desmos from 'desmos';

import { create, all } from 'mathjs'

const config = {}
const math = create(all, config)

const Onepoint = () => {
    let scope = { x: 0}
    let dataTable = []
    const [data, setData] = useState({
        x: null,
        Fx: 0,
        sum: 0,
    })
    const [table, setTable] = useState(null)
    const [check, setCheck] = useState({
        check: false
    })
    const [result, setResult] = useState(0)

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const resultFx = document.getElementById('fxinput').value
        setData({
            x: data.x,
            Fx: resultFx,
            sum: 0
        })
        calOnepoint()
    }

    const calOnepoint = () => {
        const parseFx = math.parse(data.Fx)
        const bisectioncompile = parseFx.compile()

        let x = Number(data.x)
        var caler = xn => xo => Math.abs((xn-xo) / xn);
        let xn,er;
        do {
            scope.x = x
            let fxm = bisectioncompile.evaluate(scope)
            xn = fxm;
            er = caler(xn)(x);
            x = xn;
            console.log("x: "+x);
            console.log("er: "+er);
            console.log(" ");

            dataTable.push({
                x: x.toFixed(6),
                er: er.toFixed(6),
            })
            setResult(x.toFixed(6))
        }
        while (er >= 0.000001)
        setCheck({
            check: true
        })
        createTable()
    }

    const createTable = () => {
        setTable(
            <div className="container">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Iteration</th>
                            <th scope="col">Y</th>
                            <th scope="col">Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((data, i) => {
                            return (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{data.x}</td>
                                    <td>{data.er}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    useEffect(() => {
        if (check.check) {
            const graph = document.getElementById('mygraph')
            graph.innerHTML = ''
            const calculator = Desmos.GraphingCalculator(graph)
            const x = result.toString()
            calculator.setExpression({ id: 'graph1', latex: 'f(x) = ' + data.Fx })
            
            if(x==="Infinity"){
                calculator.setExpression({ id: 'graph2', latex: 'y = Infinity'})
            }
            else{
                calculator.setExpression({ id: 'graph2', latex: 'y = (' + x +',' + 0 + ')'})
            }
        }

        document.getElementById('fxinput').setOptions({
            virtualKeyboardMode: "manual",
            virtualKeyboards: "numeric symbols"
        })
    })
    return ( 
        <div>
        <h2 className="mb-3 text-center">One-point Position</h2>
        <div className="container">
            <div className="row mb-3">
                <form onSubmit={handleSubmit}>
                    <div className="col-auto mb-3">
                        <label className="mb-3"> f(x)</label>
                        <math-field id="fxinput" className="form-control"></math-field>
                    </div>
                    <div className="col-auto  mb-3">
                        <label className="mb-3"> x</label>
                        <input className="form-control" onChange={handleChange} value={data.x} name='x' placeholder="x" />
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">ยืนยัน</button>
                    <h4 className="mb-3">ผลลัพธ์ : {result}</h4>
                </form>
                <div className='col-auto mb-3'>
                    <div id="mygraph" className='m-auto mb-3' style={{ width: "1000px", height: "600px" }}></div>
                </div>
            </div>
        </div>
        <div className="createTable">
            <br/>
            {table}
        </div>
    </div >
    );
}
export default Onepoint;