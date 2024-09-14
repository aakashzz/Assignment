import React, { useState } from 'react'   
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

interface Data {
    title:string,
    place_of_origin: string,
    artist_display:string,
    inscriptions:string,
    date_start:Number,
    date_end:Number,
}


function Table() {
    const [values,setValues] = useState<Data[]>([])
    const [rowsClicks, setRowsClicks] = useState<Boolean>(false)

    const fetchItems = axios.get("https://api.artic.edu/api/v1/artworks?page=1");
    fetchItems.then((data)=>{
        setValues(data.data.data)
    })

  return (
    <main className='h-full w-full px-4 py-4 '>
        <DataTable value={values}   paginator rows={12} selection={true} selectionMode={rowsClicks ? "undefined" : "multiple"}    dataKey="title" groupRowsBy='10'  lazy totalRecords={120}  tableStyle={{minWidth:"50rem"}} className='border bg-gray-600 h-52 rounded-lg'>
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="title" header="Title"></Column>
            <Column field="place_of_origin" header="Place_of_origin"></Column>
            <Column field="artist_display" header="Artist_display"></Column>
            <Column field="inscriptions" header="Inscriptions"></Column>
            <Column field="date_start" header="Date_start"></Column>
            <Column field="date_end" header="Date_end"></Column>
        </DataTable>
    </main>
  )
}

export default Table