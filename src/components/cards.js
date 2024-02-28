import React from 'react'
import "./cards.css";
import { Button, Card } from 'antd';

const  Cards=({showexpensemodel,showincomemodel, income,expensis,currentbalance})=>{

  return (
    <div id='vachan'>
  <Card
    title="Current Balance"
    className='which'
    
  >
    <p>${currentbalance}</p>
    <Button  className='jay'>Current Balance</Button>
  </Card>

  <Card
    title="Total Income"
    className='which'
    
    
    
  >
    <p>${income}</p>
    <Button  className='jay' onClick={showincomemodel}>Add Income</Button>
  </Card>

  <Card
    title="Total Expenses"
    className='which'
    
  > 
  <p>${expensis}</p>
<Button className='jay'onClick={showexpensemodel}>Add Expenses</Button>
    
  </Card>
 
    </div>
  )
}

export default Cards;