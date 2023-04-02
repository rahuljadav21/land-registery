import React from 'react'
import AddLandInspector from '../Inspector/AddLandInspector';
import AllInspectors from '../Inspector/AllInspectors';
import LandRecords from '../LandStats/LandRecords';
import LandStats from '../LandStats/LandStats';
import AddLands from '../UsersComponents/AddLands';
import MyLands from '../UsersComponents/MyLands';
import ReceivedRequests from '../UsersComponents/ReceivedRequests';
import SentRequests from '../UsersComponents/SentRequests';
import AllUsers from '../Inspector/AllUsers'
import VerifyUsers from '../Inspector/VerifyUsers';
import VerifyLands from '../Inspector/VerifyLands';
import TransferOwnership from '../Inspector/TransferOwnership'
import TransferContract from '../../Pages/ContractOwner/TrasfserContract'
import Unauthorized from '../Unauthorized';

function ComponentSelector(props) {
  const cmp = props.component;
  const contract = props.contract;
  switch(cmp) {
    case 'addInspector':
      // code block
      return(
        <AddLandInspector contract={contract}/>
      )
      
    case 'landStats':
      return(
        <LandStats contract={contract} />
      )
    case 'transferContract':
      return(
        <TransferContract contract={contract} />
      )
    case 'landRecords':
      return(
        <LandRecords contract={contract} />
      )
      
    case 'allInspector':
      return(
        <AllInspectors contract={contract} />
      )
    case 'addLand':
      return(
        <AddLands contract={contract}/>
      )
    case 'myLands':
      return(
        <MyLands contract={contract} />
      )
    case 'sentRequests':
      return(
        <SentRequests contract={contract}/>
      )
    case 'receivedRequest':
      return(
        <ReceivedRequests contract={contract}/>
      )
    case 'allUsers':
      return(
        <AllUsers/>
      )
    case 'verifyUsers':
      return(
        <VerifyUsers contract={contract} />
      )
      
    case 'verifyLands':
      return(
        <VerifyLands contract={contract}/>
      )
    case 'trasferOwnership':
      return(
        <TransferOwnership contract={contract}/>
      )
    case 'unauthorized':
      return(
        <Unauthorized/>
      )
     
    default:
      return(
        <LandStats/>
      )
  }

}

export default ComponentSelector