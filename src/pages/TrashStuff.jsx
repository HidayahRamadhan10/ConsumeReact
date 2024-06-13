import React from "react";
import Case from "../components/Case";
import axios from "axios";
import Table from "../components/Table";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

export default function TrashStuff() {
    const [stuffTrash, setStuffTrash] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:8000/stuff/trash',{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setStuffTrash(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status == 401){
                navigate('/login?message=' + encodeURIComponent('anda belum login'));
            }
        })
    },[]);

    const headers = [
        "#",
        "Name",
        "Category",
    ]

    const endpointModal = {
        "restore": "http://localhost:8000/stuff/restore/{id}",
        "delete_permanent": "http://localhost:8000/stuff/permanent/{id}"
    }

    const inputData = {}

    const title = 'Stuff'

    const columnIdentitasDelete = 'name'

    const buttons = [
        "restore",
        "permanentDeletes"
    ]

    const tdColumn = {
        "name": null,
        "category": null,
    }
    return (
        <Case>
            <Table headers={headers} data={stuffTrash} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}