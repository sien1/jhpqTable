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
    padding-left: 0px;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    background: rgba(150, 146, 146, 0.137);
`;

const SearchBar = styled.div`
    display: flex;
    flex-direction:column;
    width: 20%;
    min-width:180px;
    margin-top:10px;
    padding-left:8px;
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
    overflow-y: scroll;
    margin-top:10px;
`;

const TableTitle = styled.div`
    border-bottom: solid 1px rgba(255, 255, 255, 0.144);
    padding-bottom:10px;
    justify-content: center;
    display: flex;
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
    &  > thead > tr > th {
        text-align: left;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 2;
        color: #818183;
        font-size:12px;
        font-weight: 100;
        padding-left:8px;
    }
    &  > tbody > tr > td {
        margin:0;
        color:#8a8a8a;
        font-family:'Roboto', sans-serif;
        font-size:10.9px;
        
        padding-top: 12px;
        padding-bottom: 8px;
        padding-left:8px;
        padding-right:8px;
        background: #8181831c;
        
    }
    & > tbody > tr {
        transition: background .2s;
    }
    & > tbody > tr:hover:not(.mary) {
        background: #8a8a8a33;
        cursor: pointer;
    }
    & > tbody > .mary > td {
        padding:0;
    }
`;





// .rowActivo {
//     border-bottom: solid 6px rgba(43, 41, 41, 0.637);
// }

// .tableRowActivo {
    
// }





// table tbody tr:hover {
//     background-color: #8a8a8a33;
//     cursor: pointer;
// }

// table td ::first-letter {
    
// }

// table .perfilEmpleado {
//    min-height:150px;
//    display:flex;
//    padding: 15px;
//    padding-left:0px;
//    box-sizing: border-box;
// }


// table .datosEmpleado {
//     flex:1;
//     display:flex;
//     flex-direction: row;
//     align-self: stretch;
//     box-sizing: border-box;
//     border: solid 1px rgb(68, 66, 66);
    
// }

// table .fotografiaEmpleado {
//     height: 160px;
//     width: 140px;
//     background-color:white;
// }

// table .documentosEmpleado {
//     flex: 1;
// }

// table .extraInfo {
//     border: solid 1px rgb(53, 54, 53);
//     flex:.85;
// }

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
    padding-right:8px;
    background-color: #8181831c;
`;

const TableRow = styled.tr `
    &:hover{
        background-color: #8a8a8a33;
        cursor: pointer;
    }
`;

const TableSearchControls = styled.div`
    display: flex;
    padding-top: 8px;
    box-sizing: border-box;
    flex-direction:column;
`;

const HeaderContainer = styled.div`
    border: solid 1px #999999;
    padding: 5px;
    box-sizing: border-box;
    font-size: 12px;
`;


const TableGray = ({title, source, displayHeaders, children}) => {
    
    const [sourcy, setSourcy] = useState([]);
    const [searchy, setSearchy] = useState('');
    const headers = displayHeaders && source ? Object.keys(displayHeaders) : source && source[0] ? Object.keys(source[0]) : null;
    const [toggled, setToggled] = useState(null);

    useEffect(() => {
        if(!source) {

            return 'NO HAY DATOS';
        }
    }, [])



    useEffect(() => { 
            
        sourceInit(source, displayHeaders, headers);
    
    }, [source])



    const sourceInit = (source, displayHeaders, headers) => {
        console.log(source);
        if(displayHeaders){
            refactor(source, displayHeaders, headers).then(res=>{return setSourcy(res)});
        }
        else {
            setSourcy(source);
        }
    }

    const onSearch = (source, search) => {
        setSearchy(search);
        const res = source.filter(obj => Object.keys(obj).some(key => { if(obj[key]){ return obj[key].toString().toLowerCase().includes(search.toLowerCase()) } } ) );
        
        return sourceInit(res, displayHeaders, headers);
    }

    const refactor = async (source, displayHeaders, headers) => {
        const newArr = [];

        source.map((row) => {
            const newObj = {};
            headers.map(head => {
                
                if( typeof displayHeaders[head] === 'string' ) {
                    newObj[head] = row[displayHeaders[head]];
                }
                else if( Array.isArray(displayHeaders[head]) ) {
                    let meow = '';
                    displayHeaders[head].map(cont => {
                        if(row[cont] != 0)
                            meow += row[cont] + ' '
                    })
                    newObj[head] = meow;
                }
            })
            newArr.push(newObj);
        });

        return newArr;
    }


    const showChildren = (i) => {
        const tog = i != toggled ? i : null;
        setToggled(tog);
    }


    const isDate = (element) => {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if(isNaN(element) && !isNaN(Date.parse(element))){
            let dateEl = new Date(element);
            return dateEl.toLocaleString('it-IT');
        }
        else return element;
    }


    return(
            <>
            
            <TableContainer>
                <TableSearch>
                    <TableSearchControls>
                        <TableTitle>
                            <HeaderContainer>
                                <label htmlFor="">{title}</label>
                            </HeaderContainer>
                        </TableTitle>
                    
                        <SearchBar>
                            <SearchBarInput onChange={(e)=>onSearch(source, e.target.value)}>
                                
                            </SearchBarInput>
                        </SearchBar>
                    </TableSearchControls>
                    {source[0] ?
                    <TableContent style={{height:'22px'}}>
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
                            <tbody style={{ visibility:'hidden',height:0 }}>
                            {
                                sourcy.map((element, i)=>(
                                    <tr key={i} style={{height:0}}>
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
                    : null}
                    
                </TableSearch>
                
                <TableContent>
                    {source[0] ?
                    <Table>
                        <thead style={{visibility: 'hidden', height:0,  display:'table-footer-group'}}>
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
                                <>
                                    <tr key={i} onClick={()=>showChildren(i)}>
                                        {
                                            headers.map((head, i) => {
                                                return(<td key={i}>{element[head]}</td>)
                                            })
                                        }
                                    </tr> 
                                    {
                                        toggled === i && children
                                        ? <tr className="mary">
                                            <td colSpan={headers.length}>
                                                {React.cloneElement(children, {tableElements:element})}
                                            </td>
                                          </tr>
                                        :null
                                    }
                                    
                                </>
                               
                            ))
                        }
                        </tbody>
                    </Table>
                    :null}
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
                                <td>{empleado.RFC}</Td>
                            </tr>
                            { rowActivo === empleado.Id

                            ? <tr key={empleado.Id} className="rowActivo" style={{borderLeft:empleado.Activo? 'green solid 2px' : 'red solid 2px'}}>   
                                    <Td colSpan="3">
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
                                    </Td>
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