import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const Exports = ({ users }) => {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <img src="../logo.png" width="600px" className='my-5 m-auto'/>
      
      <div className='m-auto text-center'>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="table-auto max-w-7xl mx-auto bg-greenCustom p-3 text-white font-bold rounded-lg"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Descargar"/>
      </div>
       
       <table id="table-to-xls" className="table-auto max-w-7xl mx-auto pb-10 mt-8 hidden">
        <thead>
          <tr>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Nombre</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Apellido</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Correo</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Playera</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Tipo</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>NumColaborador</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Depto</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>OtroDepto</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Ubicación</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Dirección</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Ciudad</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Estado</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Edad</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Kms</th>
            <th className='font-bold text-xl bg-blueCustom p-2 text-white'>Genero</th>
          </tr>
        </thead>
        <tbody>
          {users !== undefined && users.map(s => (
              <tr className='border-2 text-center' key={s._id}>
                <td className='border-2 p-2'>{s.nombre}</td>
                <td className='border-2 p-2'>{s.apellido}</td>
                <td className='border-2 p-2'>{s.correo}</td>
                <td className='border-2 p-2'>{s.playera}</td>
                <td className='border-2 p-2'>{s.tipo}</td>
                <td className='border-2 p-2'>{s.numColaborador}</td>
                <td className='border-2 p-2'>{s.depto}</td>
                <td className='border-2 p-2'>{s.otroDepto}</td>
                <td className='border-2 p-2'>{s.ubicacion}</td>
                <td className='border-2 p-2'>{s.direccion}</td>
                <td className='border-2 p-2'>{s.ciudad}</td>
                <td className='border-2 p-2'>{s.estado}</td>
                <td className='border-2 p-2'>{s.edad === '1' ? '18-39' : s.edad === '2' ? '40-49' : '50 y más'}</td>
                <td className='border-2 p-2'>{s.kms}</td>
                <td className='border-2 p-2'>{s.genero}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
};

export default Exports;