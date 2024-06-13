import React from 'react'

export default function Table() {

    const data = [
        {
          nama: 'Idayy',
          rombel: 'PPLG XI-5',
          rayon: 'Ciawi 3',
        },
        {
          nama: 'dwi',
          rombel: 'PPLG XI-5',
          rayon: 'Tajur 1',
        },
      ];
  return (
    <>
        <table border={1}>
            <thead>
                <tr>
                    {
                        props.title.map((val, i) => (
                            <td>{val}</td>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((value, key) => (
                        <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{value.nama}</td>
                            <td>{value.rombel}</td>
                            <td>{value.rayon}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </>
  )
}
