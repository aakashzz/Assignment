import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

interface Data {
   title: string;
   place_of_origin: string;
   artist_display: string;
   inscriptions: string;
   date_start: Number;
   date_end: Number;
}

function Table() {
   const [values, setValues] = useState<Data[]>([]);
   const [page, setPage] = useState<any>(1);
   const [loading, setLoading] = useState<boolean>(false);
   const [selectItem, setSelectItem] = useState<Data[]>([]);
   const [totalRecords, setTotalRecords] = useState(0);

   useEffect(() => {
      fetchingValues(page);
   }, [page]);

   async function fetchingValues(page: Number) {
      setLoading(true);
      try {
         const fetchItems = await axios.get(
            `https://api.artic.edu/api/v1/artworks?page=${page}`
         );
         setValues(fetchItems.data.data);
         setTotalRecords(fetchItems.data.pagination.total);
      } catch (error) {
         console.error("Error of fetching data ", error);
      } finally {
         setLoading(false);
      }
   }

   function onPageChange(e: any) {
      setPage(e.page + 1);
   }

   function onSelectionChange(e: any) {
      setSelectItem(e.value);
   }

   return (
      <main className="h-full w-full px-4 py-4 ">
         <DataTable
            value={values}
            paginator
            rows={12}
            dataKey="id"
            lazy
            loading={loading}
            onPage={onPageChange}
            totalRecords={totalRecords}
            tableStyle={{ minWidth: "50rem" }}
            className="table-auto border-collapse border border-gray-300"
            selection={selectItem!}
            selectionMode="checkbox"
            onSelectionChange={onSelectionChange}
         >
            <Column
               selectionMode="multiple"
               headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
               header={
                  <i
                     className="pi pi-angle-down "
                     style={{ fontSize: "1rem", color: "black" }}
                  ></i>
               }
               headerStyle={{ width: "3rem" }}
            ></Column>
            <Column field="title" header="Title"></Column>
            <Column field="place_of_origin" header="Place_of_origin"></Column>
            <Column field="artist_display" header="Artist_display"></Column>
            <Column field="inscriptions" header="Inscriptions"></Column>
            <Column field="date_start" header="Date_start"></Column>
            <Column field="date_end" header="Date_end"></Column>
         </DataTable>
      </main>
   );
}

export default Table;
