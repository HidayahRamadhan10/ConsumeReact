import React, { useEffect, useState } from 'react'
import Case from '../components/Case'
import Table from '../components/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Stuff() {
    const [stuffs, setStuffs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getStuffs()
    }, []);

    function getStuffs() {
        axios.get('http://localhost:8000/stuff/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }

    const headers = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec"
    ]

    const endpointModal = {
        "data_detail": "http://localhost:8000/stuff/{id}",
        "delete": "http://localhost:8000/stuff/{id}",
        "update": "http://localhost:8000/stuff/{id}",
        "store": "http://localhost:8000/stuff",
    }

    const columnIdentitasDelete = 'name';

    const title = "stuff";
    
    const inputData = {
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null,
        },
        "category" : {
            "tag": "select",
            "type": "select",
            "option": ["HTL", "KLN", "Teknisi/Sarpras"]
        },
    }

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
    ]

    const tdColumn = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_stock*": "total_defec",

    }
  return (
    <Case>
        <Table 
        headers={headers}
        data={stuffs} 
        endpoint={endpointModal} 
        inputData={inputData} 
        titleModal={title} 
        identitasColumn={columnIdentitasDelete}
        columnForTd={tdColumn}
        opsiButton={buttons}>
        </Table>
    </Case> 
  );
}
