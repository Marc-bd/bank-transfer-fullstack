'use client'
import TransferTable from "@/components/TransferTable";
import Modal from "@/components/Modal";
import FormNewTransfer from "@/components/FormNewTransfer";
import {useState} from "react";
import {ITransfer} from "@/interfaces/ITransfer";
import FormEditTransfer from "@/components/FormEditTransfer";


export default function Home() {

  const [tableData, setTableData] = useState<ITransfer[]>([]);
  const [editTransferData, setEditTransferData] = useState<ITransfer | undefined>(undefined);

  const [openNewForm, setOpenNewForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);


  function handleEdit(transfer: ITransfer) {
    setEditTransferData(transfer);
    setOpenEditForm(!openEditForm);
  }



  return (
    <div className=" flex flex-col items-center h-full  bg-gray-100 ">


      <div className="w-9/12 pt-20">
        <TransferTable
            transfers={tableData}
            onCreate={() => setOpenNewForm(!openNewForm)}
            onEdit={(transfer) => handleEdit(transfer)}
        />
      </div>

      {
        openNewForm && <FormNewTransfer onClose={() => setOpenNewForm(false)}  />
      }

      {
        openEditForm && editTransferData && <FormEditTransfer onClose={() => setOpenEditForm(false)} transfer={editTransferData} />
      }


    </div>
  );
}

