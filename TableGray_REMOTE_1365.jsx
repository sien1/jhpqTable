import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const TableContainer =  styled.div`
    display:flex;
    align-self: stretch;
    background-color: none;
    box-sizing: border-box;
    flex-direction: column;
    /*box-shadow:0px -0px 2px rgb(112, 107, 107),  2px 2px 4px black, inset 1px 1px 3px rgb(115, 115, 115);*/
    box-shadow: inset 1px 2px 2px rgba(43, 40, 40, 0.055);
    /* background: linear-gradient(190deg, rgb(49, 48, 48), rgb(15, 15, 15));*/   
    position:absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    overflow-y:scroll;
`;

const TableSearch = styled.div`
    padding: 15px;
    padding-left: 0px;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    background: rgba(150, 146, 146, 0.137);
`;

const SearchBar = styled.div`
    display: flex;
    flex-direction:column;
    width: 30%;
`;

const SearchBarInput = styled.input`
    background:none;
    border: none;
    background-color: #36363a;
    outline:none;
    border-radius: 2px;
`;

const TableContent = styled.div`
    display: flex;
    padding-top: 10px;
    overflow-y: scroll;
`;

const TableTitle = styled.div`
    border-bottom: solid 1px rgba(255, 255, 255, 0.144);
    padding-bottom:10px;
    color: #b9b9bb;
    font-weight: 100;
`;

const ButtonSolar  = styled.button`
    background-color: #ea715e;
    border: none;
    padding:7px;
    padding-left: 12px;
    padding-right: 12px;
    color: #d1c3be;
    float:right;
    cursor: pointer;
    outline: none;
`;


const Table  = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    text-align: left;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    color: #818183;
    font-size:12px;
    font-weight: 100;
    padding-left:8px;
`;

const TableData = styled.td` 
    margin:0;
    color:#8a8a8a;
    font-family:'Roboto', sans-serif;
    font-size:10.9px;
    padding-top: 12px;
    padding-bottom: 8px;
    padding-left:8px;
    background-color: #8181831c;
`;

const TableRow = styled.tr `
    &:hover{
        background-color: #8a8a8a33;
        cursor: pointer;
    }
`;

const TableGray = ({title, source}) => {

    const headers = Object.keys(source[0]);

    const [sourcy, setSourcy] = useState([]);
    
    useEffect(() => {
        setSourcy(source) 
    }, [source])

    return(
            <>
            <TableContainer>
                <TableSearch>
                    <TableTitle>
                        <label htmlFor="">{title}</label>
                    </TableTitle>
                
                    <SearchBar>
                        <SearchBarInput>
                            
                        </SearchBarInput>
                    </SearchBar>
                    <Table>
                        <thead>
                            <tr>
                                {
                                    headers.map(th=>(
                                        <th>{th}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                        {
                            sourcy.map((element, i)=>(
                                    <tr key={i}>
                                        {
                                            headers.map((head, i) => {
                                                return(<td key={i}>{element[head]}</td>)
                                            })
                                        }
                                    </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </TableSearch>
                <TableContent>
                    <Table>
                        <tbody>
                        {
                            sourcy.map((element, i)=>(
                                    <tr key={i}>
                                        {
                                            headers.map((head, i) => {
                                                return(<td key={i}>{element[head]}</td>)
                                            })
                                        }
                                    </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </TableContent>
            </TableContainer>
          </>  
    )
};

/*const TableGray  = ({titulo, label}) =>{
 return (
    <div>
        //Agragar tabla de ListaProyectos
        <div className="tableContainer">
            <div className="tableSearch">
                <div className="tableTitle">
                    <label htmlFor="">Proyectos</label>
                    <button className="buttonSolar">Agregar Proyectos</button>
                </div>
                <div className="tableControls">
                    <div className="searchBar">
                        <input type="text"/>
                    </div>
                </div>
                <table style={{height:12}}>
                    <thead>
                        {
                            <tr>
                                <th>Nombre</th>
                                <th>NSS</th>
                                <th>R.F.C</th>
                            </tr>
                        }
                    </thead>
                    <tbody style={{ visibility:'hidden'}}>
                        {
                            empleados.map(empleado=> 
                            <>
                            <tr  style={{visibility:'hidden',height:0,borderLeft:empleado.Activo? 'green solid 2px' : 'red solid 2px'}}>
                                <td>{empleado.Nombre} {empleado.ApellidoPaterno} {empleado.ApellidoMaterno != 0 ? empleado.ApellidoMaterno : ''}</td>
                                <td>{empleado.NSS}</td>
                                <td>{empleado.RFC}</td>
                            </tr>
                            </>
                            )
                        }
                    </tbody>
                
                </table>
                
            </div>
            <div className="tableContent">
                <table>
                    
                    <tbody>
                        {}
                        {
                            empleados.map(empleado=> {
                                
                        return( <>
                            <tr key={empleado.Id} className = {empleado.Id !== rowActivo ? 'rowActivo': ''} onClick={()=>displayData(empleado.Id)} style={{borderLeft:empleado.Activo? 'green solid 2px' : 'red solid 2px'}}>
                                <td>{empleado.Nombre} {empleado.ApellidoPaterno} {empleado.ApellidoMaterno != 0 ? empleado.ApellidoMaterno : ''}</td>
                                <td>{empleado.NSS}</td>
                                <td>{empleado.RFC}</td>
                            </tr>
                            { rowActivo === empleado.Id

                            ? <tr key={empleado.Id} className="rowActivo" style={{borderLeft:empleado.Activo? 'green solid 2px' : 'red solid 2px'}}>   
                                    <td colSpan="3">
                                        <div className="perfilEmpleado">
                                            <div className="stateEmpleado">

                                            </div>
                                            <div className="datosEmpleado">
                                                <div className="fotografiaEmpleado">
                                                            
                                                </div>
                                                <div className="documentosEmpleado">
                                                    <label htmlFor=""></label>
                                                    <div class="underlined-title"/>
                                                </div>
                                            </div>
                                            <div className="extraInfo"></div>
                                        </div>
                                    </td>
                                </tr>
                                : null 

                                
                            }
                            </>)
                            
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
        //Agregar nuevos  proyectos

    </div>
 )
}*/

export default TableGray;