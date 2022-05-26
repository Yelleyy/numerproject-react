/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from 'react-router-dom';
import React from "react";
import { Menu, Switch } from 'antd';
import 'antd/dist/antd.css';
import { HomeOutlined, AppstoreOutlined, LineChartOutlined, DownCircleTwoTone } from '@ant-design/icons';
function navbar() {

    const [theme, setTheme] = React.useState('dark');
    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };
    return (

        <div className="container mb-3">

            <Menu mode="horizontal" defaultSelectedKeys={['home']} theme={theme}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    Home <Link to="/"></Link>
                </Menu.Item>

                {/*root*/}
                <Menu.SubMenu key="SubMenu" title="Root of Equations" icon={<DownCircleTwoTone />}>
                    <Menu.Item key="one" icon={<LineChartOutlined />}>
                        Bisection Method
                        <Link to="/bisection"></Link>
                    </Menu.Item>
                    <Menu.Item key="two" icon={<LineChartOutlined />}>
                        False Position Method
                        <Link to="/falseposition"></Link>
                    </Menu.Item>
                    <Menu.Item key="three" icon={<LineChartOutlined />}>
                        One Point Iteration Method
                        <Link to="/onepoint"></Link>
                    </Menu.Item>
                    <Menu.Item key="four" icon={<LineChartOutlined />}>
                        Newton Raphson Method
                        <Link to="/newton"></Link>
                    </Menu.Item>
                    <Menu.Item key="five" icon={<LineChartOutlined />}>
                        Secant Method
                        <Link to="/secant"></Link>
                    </Menu.Item>
                </Menu.SubMenu>

                {/*linear*/}
                <Menu.SubMenu key="SubMenu2" title="Linear Algbra" icon={<DownCircleTwoTone />}>
                    <Menu.ItemGroup title="Linear Algbra I">
                        <Menu.Item key="six" icon={<AppstoreOutlined />}>
                            Cramer's Rule
                            <Link to="/cramer"></Link>
                        </Menu.Item>
                        <Menu.Item key="seven" icon={<AppstoreOutlined />}>
                            Gauss-Elimination Method
                            <Link to="/GaussElimination"></Link>
                        </Menu.Item>
                        <Menu.Item key="eight" icon={<AppstoreOutlined />}>
                            Gauss-Jordan Method
                            <Link to="/GaussJordan"></Link>
                        </Menu.Item>
                        <Menu.Item key="nine" icon={<AppstoreOutlined />}>
                            LU Decomposition Method
                            <Link to="/lu"></Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Linear Algbra II">
                        <Menu.Item key="ten" icon={<AppstoreOutlined />}>
                            Jacobi Iteration Method
                            <Link to="/Jacobi"></Link>
                        </Menu.Item>
                        <Menu.Item key="eleven" icon={<AppstoreOutlined />}>
                            Gauss-Seidel Iteration Method
                            <Link to="/GaussSeidel"></Link>
                        </Menu.Item>
                        <Menu.Item key="twelve" icon={<AppstoreOutlined />}>
                            Conjugate Gradient Method
                            <Link to="/conjugate"></Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu.SubMenu>
                <Menu.Item>
                    <Switch
                        checked={theme === 'dark'}
                        onChange={changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default navbar;