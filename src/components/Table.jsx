import React, { useState } from 'react';
import axios from 'axios';
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";

export default function Table({ headers, data, endpoint, identitasColumn, inputData, titleModal, opsiButton, columnForTd }) {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [endpointToSend, setEndpointToSend] = useState([]);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const navigate = useNavigate();

    function handleModalDelete(id) {
        const endpointDelete = endpoint['delete'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlDelete = endpointDelete.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail": replaceUrlDelete,
            "delete" : replaceUrlDetail,
        }
        setEndpointToSend(endpointReplaced);
        setIsModalDeleteOpen(true);
    }
    function handleModalEdit(id) {
        const endpointUpdate = endpoint['update'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlUpdate = endpointUpdate.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail": replaceUrlDetail,
            "update": replaceUrlUpdate
        }
        console.log(endpointReplaced);

        //setDataDetail(id); 
        setEndpointToSend(endpointReplaced);
        setIsModalEditOpen(true);
    }
    function handleModalAdd() {
        const endpointToSend = {
            "store" : endpoint['store'],
        }
        setEndpointToSend(endpointToSend);
        setIsModalAddOpen(true);
    }
    function handleRestore(id) {
        const endpointRestore = endpoint['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(res => {
                window.location.reload();
        })
            .catch(err => {
                console.log(err);
                if (err.response.data == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));                }
        })
    }
    function handlePermanentDelete(id) {
        const endpointPermanentDelete = endpoint['delete_permanent'].replace("{id}", id);
        // console.log(endpointPermanentDelete);
        axios.delete(endpointPermanentDelete, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(res => {
                window.location.reload();
        })
            .catch(err => {
                console.log(err) 
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'))
                }
        })
    }
    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
            <div className="flex justify-end">
                {
                    opsiButton.includes("create") ? (
                        <button type="button" onClick={handleModalAdd} class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-center text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5">Create</button>
                    ) : ''
                }
                {
                    opsiButton.includes("trash") && location.pathname.includes('/stuff') && (
                        <Link to={'/stuff/trash'} class="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5">Trash</Link>
                    ) 
                }
                {
                    opsiButton.includes("trash") && location.pathname.includes('/lending') && (
                            <Link to={'/lending/trash'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5">Trash</Link>
                    )
                }
                
                </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
                <thead class="text-xs text-white uppercase bg-gray-600 dark:bg-gray-700 dark:text-gray-400 underline">
                    <tr>    
                        {headers.map((header, index) => (
                            <th scope="col" class="px-6 py-3" key={index}>{ header}</th>
                        ))}
                        <th scope="col" class="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(data).map(([index, item]) => (
                           <> 
                        <tr
                            class="bg-gray border-b dark:bg-gray-900 dark:border-blue-700 hover:bg-blue-900 dark:hover:bg-red-900 transition delay-200 duration-200 ease-in-out">
                                    <td class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">{parseInt(index) + 1}.</td>
                                    {
                                        Object.entries(columnForTd).map(([key, value]) => (
                                            <td className="px-6 font-medium text-white whitespace-nowrap dark:text-white">
                                                {!value ? item[key] : item[key.replace(/[!&;:]/g, '')] ? item[key.replace(/[!&;:]/g, '')][value] : '0'}
                                            </td>
                                        ))
                                    }
                                    {/* <td class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">{ item.name }</td>
                                    <td class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">{ item.category }</td>
                                    <td class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">{ item.stuff_stock ? item.stuff_stock.total_available : '0' }</td>
                                    <td class="px-6 py-3 font-medium text-white whitespace-nowrap dark:text-white">{ item.stuff_stock ? item.stuff_stock.total_defec : '0' }</td> */}
                                    
                                <td class="px-6 py-4 text-right">
                                        {
                                            opsiButton.includes("edit") ? (
                                                <button type="button" onClick={() => handleModalEdit(item.id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                            ) : ''
                                        }
                                        {
                                            opsiButton.includes("delete") ? (
                                                <button type="button" onClick={() => handleModalDelete(item.id)} class="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">Delete</button>
                                            ) : ''
                                        }
                                        {
                                            opsiButton.includes("restore") ? (
                                                <button type="button" onClick={() => handleRestore(item.id)} class="font-medium text-green-600 dark:text-green-500 hover:underline ml-3">Restore</button>
                                            ) : ''
                                        }
                                        {
                                            opsiButton.includes("permanentDeletes") ? (
                                                <button type="button" onClick={() => handlePermanentDelete(item.id)} class="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">Permanent Delete</button>
                                            ) : ''
                                        }
                               </td>
                           </tr>
                        </>
                      ))
                  }
                </tbody>
            </table>
            <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} endpoint={endpointToSend} identitasColumn={identitasColumn}></ModalDelete>
            <ModalEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} endpoint={endpointToSend} inputData={inputData} titleModal={titleModal}></ModalEdit>
            <ModalAdd isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} endpoint={ endpointToSend} inputData={ inputData } titleModal={ titleModal }></ModalAdd>
        </div>
    )
}