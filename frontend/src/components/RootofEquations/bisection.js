import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { create, all } from 'mathjs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
// import { DownloadOutlined } from '@ant-design/icons';
const config = {}
const math = create(all, config)

const Bisection = () => {

    let scope = { x: 0 }
    const [finaldata, setd] = useState()
    const [data, setData] = useState({
        xL: null,
        xR: null,
        Fx: 0,
        sum: 0,
    })
    const [check, setCheck] = useState({
        show: false,
        api: false
    })
    const [xlapi,setxlapi] = useState()
    const [xrapi,setxrapi] = useState()
    const [equapi,setequapi] = useState()

    const [result, setResult] = useState(0)
    const [resultfx, setResultfx] = useState(0)
    const columns = [
        {
            title: 'Iteration',
            dataIndex: 'Iteration',
            key: 'Iteration',
        },
        {
            title: 'Xl',
            dataIndex: 'Xl',
            key: 'Xl',
        },
        {
            title: 'Xr',
            dataIndex: 'Xr',
            key: 'Xr',
        },
        {
            title: 'Xm',
            dataIndex: 'Xm',
            key: 'Xm',
        },
        {
            title: 'Fx',
            dataIndex: 'Fx',
            key: 'Fx',
        },
    ];
    const dataSource = [];
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieWVsbGV5eSJ9.SX1Y8e1XGU-dH8xBZOczYXEM2I3lF3xfXK45vvtKY5s"
    try { 
        axios.get(`http://localhost:4000/api/problem/`, { params: { token: token, } }).then(res => {
        let data = res.data;
        data.forEach(element => {
            if ((element.id === 1)) { 
                setequapi(element.fx);
                setxlapi(element.xl);
                setxrapi(element.xr);
            }
        })
    })
    } catch (error) {
        console.log(error);
    }
   
    const bisectapi = (xl,xr,fx) =>{
        const parseFunc = math.parse(fx)
        const bisectioncompile = parseFunc.compile()
        let l=Number(xl),r=Number(xr);
        let y = 0.000001
        let i = 1;
        do {
            let xm = (l + r) / 2;

            scope.x = l
            let fxl = bisectioncompile.evaluate(scope)
            scope.x = r
            let fxr = bisectioncompile.evaluate(scope)
            scope.x = Number(xm)
            let fxm = bisectioncompile.evaluate(scope)
            let check = Number(fxr) * Number(fxm)

            if ((fxm === 0.0) || (fxl > fxr)) {
                setCheck({
                    show: false
                })
                alert("กรุณากรอกข้อมูลใหม่")
                break;
            } else if (check < 0) {
                y = (xm - l) / xm;
                l = xm;
            } else {
                y = (r - xm) / xm;
                r = xm;
            }
            dataSource.push({
                Iteration: i,
                Xl: l.toFixed(6),
                Xr: r.toFixed(6),
                Xm: xm.toFixed(6),
                Fx: fxm.toFixed(6)
            })
            i++;
            console.log(dataSource);
            setResultfx(fx);
            setResult(xm.toFixed(6))
            setCheck({
                show: true,
                api:true
            })
        }
        while (y >= 0.000001)
        setd(dataSource)
    }
    function callapi(){     
        bisectapi(xlapi,xrapi,equapi);    
      }
    const handleSubmit = (event) => {
        event.preventDefault()
        const inputXl = document.getElementById('InputXl').value
        const inputXr = document.getElementById('InputXr').value
        const resultFx = document.getElementById('fxinput').value
        console.log(inputXl, inputXr, resultFx);
        setData({
            xL: inputXl,
            xR: inputXr,
            Fx: resultFx,
            sum: 0
        })

        const parseFunc = math.parse(data.Fx)
        const bisectioncompile = parseFunc.compile()

        let l = Number(data.xL)
        let r = Number(data.xR)
        let y = 0.000001
        let i = 1;
        do {
            let xm = (l + r) / 2;

            scope.x = l
            let fxl = bisectioncompile.evaluate(scope)
            scope.x = r
            let fxr = bisectioncompile.evaluate(scope)
            scope.x = xm
            let fxm = bisectioncompile.evaluate(scope)
            let check = Number(fxr) * Number(fxm)

            if ((fxm === 0.0) || (fxl > fxr)) {
                setCheck({
                    show: false
                })
                alert("กรุณากรอกข้อมูลใหม่")
                break;
            } else if (check < 0) {
                y = (xm - l) / xm;
                l = xm;
            } else {
                y = (r - xm) / xm;
                r = xm;
            }
            dataSource.push({
                Iteration: i,
                Xl: l.toFixed(6),
                Xr: r.toFixed(6),
                Xm: xm.toFixed(6),
                Fx: fxm.toFixed(6)
            })
            i++;
            console.log(dataSource);
            setResult(xm.toFixed(6))
            setCheck({
                show: true
            })
        }
        while (y >= 0.000001)
        setd(dataSource)

    }

    useEffect(() => {
        if (check.show) {
            const graph = document.getElementById('mygraph')
            graph.innerHTML = ''
      
        }

        document.getElementById('fxinput').setOptions({
            virtualKeyboardMode: "manual",
            virtualKeyboards: "numeric symbols"
        })
    })
    return (

        <div>
            <h2 className="mb-3 text-center">Bisection</h2>
            <div className="container" >
                <div className="row mb-3">
                    <form onSubmit={handleSubmit}>
                        <div className="col-auto mb-3">
                            <label className="mb-3"> f(x)</label>
                            <math-field id="fxinput" className="form-control"></math-field>
                        </div>
                        <div className="col-auto  mb-3">
                            <label className="mb-3"> xL</label>
                            <input className="form-control" id="InputXl" placeholder="xL" required />
                        </div>
                        <div className="col-auto  mb-3">
                            <label className="mb-3"> xR</label>
                            <input className="form-control" id="InputXr" placeholder="xR" required />
                        </div>
                        <Button type="primary" onClick={handleSubmit} className="ml-2 mb-2">ยืนยัน</Button>
                        <Button type="primary" onClick={callapi} className="ml-2 mb-2" >API</Button>
                    
                        
                        <h4 className="mb-3">ผลลัพธ์ : {result}</h4>
                    </form>
                    <div className='col-auto mb-3'>
                        <div id="mygraph" className='m-auto mb-3' style={{ width: "1000px", height: "600px" }}></div>
                    </div>

                    <LineChart
                        width={1000}
                        height={300}
                        data={finaldata}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 10,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Iteration" padding={{ left: 25, right: 20 }} />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Xm" stroke="#8884d8" activeDot={{ r: 10 }} />
                        <Line type="monotone" dataKey="Fx" stroke="#c75656" activeDot={{ r: 10 }} />
                    </LineChart>
                </div>
                <Table dataSource={finaldata} columns={columns} />
            </div>

        </div >
    )
}
export default Bisection