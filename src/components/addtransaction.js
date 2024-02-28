import React from "react";
import { Input, Table, Select, Radio } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Button } from 'antd';
import { parse } from "papaparse";
import { unparse } from "papaparse";
import { toast } from "react-toastify";
import "../App.css";

const Addentry=({atrans,fetchTransactions,addtransaction})=>{

const [search,setSearch]= useState("");
const [filter12,setFilter12]=useState("");
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
      ];
      
      let filter= atrans.filter((element)=>element.name.toLowerCase().includes(search.toLowerCase()) && element.type.toLowerCase().includes(filter12.toLowerCase())
      );

      function importfromcsv(event){
        event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const atrans of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", atrans);
            const newTransaction = {
              ...atrans,
              amount: parseInt(atrans.amount),
            };
            await addtransaction (newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }

      }

      function exportcsv(){
        var csv = unparse({
            "fields": ["name", "tag","date","type","amount"],
             data: atrans,
        });
        var data = new Blob([csv], {type: "text/csv;charset=utf-8;"});
                var csvURL = window.URL.createObjectURL(data);
                const   Link = document.createElement('a');
                    Link.href = csvURL;
                    Link.download = "atrans.csv";
                    Link.setAttribute('download', 'filename.csv');
                    Link.click();
      }

    return(
        <div>
           <Input  type="text" className="custom-input" id="name2" style={{color:"black"}}  placeholder="Search By Name" onChange={(e)=>{setSearch(e.target.value)}} />
           <Select id="nani"
      defaultValue="All"
      style={{ width: 120 }}
      onChange={(value)=>setFilter12(value)}
      options={[
        { value: '', label: 'All' },
        { value: 'Income', label: 'Income' },
        { value: 'Expense', label: 'Expense' },
        
      ]}
    /> 
    <div id="rim">
        
        <h3>Transaction</h3>
        
        <Button type="primary" id="lol2" onClick={exportcsv}>Export to CSV</Button>

        <label for="file-csv" className="btn btn-blue" id="zum">
              Import from CSV
            </label>
            <input
              onChange={importfromcsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
    
        
    </div>
  
      <Table dataSource={filter} columns={columns} />;
      
        </div>
    )
}

export default Addentry;