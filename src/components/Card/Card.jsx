import React from 'react'

export default function Card(props){

    const {nama, rombel, rayon} = props;
  return (
    <div
    style={{
        width: 500,
        height: '100px',
        border: '1px solid white',
        borderRadius:5,
        marginBottom: 10
    }}
    >
        {/*ini mengunakan props children*/}
        {/*props.children*/}

        <tr>
            <td>Nama</td>
            <td>:</td>
            <td>{props.nama}</td>
        </tr>
        <tr>
            <td>Rombel</td>
            <td>:</td>
            <td>{props.rombel}</td>
        </tr>
        <tr>
            <td>Rayon</td>
            <td>:</td>
            <td>{props.rayon}</td>
        </tr>
    </div>
  )
}
