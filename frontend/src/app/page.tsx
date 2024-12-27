import TransferTable from "@/components/TransferTable";
import Modal from "@/components/Modal";


export default function Home() {
  return (
    <div className=" flex flex-col items-center h-full  bg-gray-100 ">


      <div className="w-9/12 pt-20">
        <TransferTable transfers={transfers} />
      </div>

      <Modal>
        <div className={"bg-white w-96 h-96 rounded"}>
          hhehehehehe
        </div>
      </Modal>


    </div>
  );
}

const transfers = [
  {
    "externalId": "97be2aad-2369-4e4c-88e4-f724d261cae4",
    "amount": 925.80,
    "expectedOn": "2025-01-29",
    "dueDate": null,
    "status": "pending"
  },
  {
    "externalId": "7de2e2ab-ad56-402f-850b-1208136b0f31",
    "amount": 299.58,
    "expectedOn": "2025-01-29",
    "dueDate": null,
    "status": "pending"
  },
  {
    "externalId": "6930d804-6c64-4cb2-a06f-7605fae2c7e9",
    "amount": 35.25,
    "expectedOn": "2025-01-29",
    "dueDate": null,
    "status": "pending"
  },
  {
    "externalId": "3d69040d-9885-49c9-bf6d-5e11c772559e",
    "amount": 248.34,
    "expectedOn": "2025-01-29",
    "dueDate": null,
    "status": "pending"
  },
  {
    "externalId": "dbe99f0f-b527-48b9-9d01-b9668a19d08d",
    "amount": 1859.34,
    "expectedOn": "2025-01-29",
    "dueDate": null,
    "status": "pending"
  },
  {
    "externalId": "c42afb76-7050-466d-8169-ac60e238c7ec",
    "amount": 2222.25,
    "expectedOn": "2025-01-29",
    "dueDate": null,
    "status": "pending"
  },
  {
    "externalId": "178cad68-854e-40bb-8942-1195fbd05347",
    "amount": 2222.25,
    "expectedOn": "2025-01-29",
    "dueDate": "2025-01-29",
    "status": "pending"
  },
  {
    "externalId": "6ed7d345-4c31-4e33-bf4e-330661504aa7",
    "amount": 2222.25,
    "expectedOn": "2025-01-29",
    "dueDate": "2024-12-27",
    "status": "pending"
  },
  {
    "externalId": "ea784f0e-8a9c-406b-bc47-09d421b0eef9",
    "amount": 85963,
    "expectedOn": "2025-01-29",
    "dueDate": null,
    "status": "completed"
  }
]
