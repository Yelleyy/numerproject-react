import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { create, all } from 'mathjs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const config = {}
const math = create(all, config)

const Newton = () => {
    let scope = { x: 0}
    const [finaldata, setd] = useState()
    const [data, setData] = useState({
        x: null,
        Fx: 0,
        sum: 0,
    })
    const [check, setCheck] = useState({
        check: false
    })
    const [result, setResult] = useState(0)

    const columns = [
        {
            title: 'Iteration',
            dataIndex: 'Iteration',
            key: 'Iteration',
        },
        {
            title: 'X',
            dataIndex: 'X',
            key: 'X',
        },
        {
            title: 'Error',
            dataIndex: 'Error',
            key: 'Error',
        },
        {
            title: 'Fx',
            dataIndex: 'Fx',
            key: 'Fx',
        },
    ];
    const dataSource = [];

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
        calNewton()
    }

    const calNewton = () => {
        let count = 1;
        const parseFx = math.parse(data.Fx)
        const Newtoncompile = parseFx.compile()

        let x = Number(data.x)
        var caler = x1 => x2 => Math.abs((x2 - x1) / x2);
        let er,x1=1,xi;
        let i = 1;
        do {

            scope.x = x
            let fxm = Newtoncompile.evaluate(scope)
            scope.x = x1
            let fx1 = Newtoncompile.evaluate(scope)
            xi = x - (fxm * (x - x1)) / (fxm -  fx1);
            er = caler(x)(xi);
            x = xi;
            console.log("x: "+x);
            console.log("er: "+er);
            console.log(" ");

            dataSource.push({
                Iteration: i,
                X: x.toFixed(6),
                Fx: fxm.toFixed(6),
                Error: er.toFixed(6)
            })
            i++;
            setResult(x.toFixed(6))
            count++;
        }
        while (er >= 0.000001 && count <= 1000)
        setCheck({
            check: true
        })
        setd(dataSource)
    }

    useEffect(() => {
        if (check.check) {
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
        <h2 className="mb-3 text-center">Newton Method</h2>
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
            <LineChart
                            width={1000}
                            height={500}
                            data={finaldata}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 10,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Iteration"  padding={{ left: 25, right: 20 }}/>
                            <YAxis domain={['auto', 'auto']}/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="X" stroke="#8884d8" activeDot={{ r: 10 }} />
                            <Line type="monotone" dataKey="Fx" stroke="#c75656" activeDot={{ r: 10 }} />
                        </LineChart>
        </div>
        <Table dataSource={finaldata} columns={columns} />
    </div >
    );
}
export default Newton;