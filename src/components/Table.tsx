import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { OverlayPanel } from "primereact/overlaypanel";

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
   const toggle = useRef<any>();

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
      console.log(e)
      setSelectItem(e.value);
      
   }

   function onCustomRowSelection(e:any){   
      toggle.current.toggle(e)
   }
   function onRowSelect(e:any){
      console.log(e)
   }  

   return (
      <main className="h-full w-full px-4 py-4 ">
         <DataTable
            value={values}
            paginator
            rows={1000}
            dataKey="id"
            lazy
            loading={loading}
            onPage={onPageChange}
            paginatorClassName="hover:bg-blue-200"
            totalRecords={totalRecords}
            tableStyle={{ minWidth: "50rem" }}
            className="table-auto border-collapse border border-gray-300"
            selection={selectItem}
            selectionMode="checkbox"
            onSelectionChange={onSelectionChange}
            // onRowSelect={onRowSelect}
            
         >
            <Column
               selectionMode="multiple"
               headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
               header={
                  <>
                  <i onClick={onCustomRowSelection}
                     className="pi pi-angle-down cursor-pointer "
                     style={{ fontSize: "1rem", color: "black" }}
                  ></i>
                  <OverlayPanel ref={toggle}>
                     <input type="number" placeholder="Select rows.." className="outline-none border rounded-lg pl-2 text-sm p-1 block"/>
                     <div className="text-center py-2">
                        <button className="w-full  bg-red-800 text-white font-medium rounded-md py-0.5 ">Submit</button>
                     </div>
                  </OverlayPanel>
                  </>
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
