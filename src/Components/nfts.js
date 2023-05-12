import React from 'react'
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

 const alchemy = new Alchemy(settings);

export default function Nfts() {
    const [nftContractAddress, setNftContractAddress] = useState();
    const [nftContractName, setNftContractName] = useState();
    const [nftContractSymbole, setNftContractSymbole] = useState();
    const [nftContractDeployer, setNftContractDeployer] = useState();
    const [nftContractOwners, setNftContractOwners] = useState();

    async function getNftData() {
        if(!nftContractAddress)
            return;
        //owners
       const resOwners = (await alchemy.nft.getOwnersForContract(nftContractAddress)).owners;
       console.log(resOwners.length);
       setNftContractOwners(resOwners.length);
       getNftMetaData();
    }

    async function getNftMetaData() {
        //let arrTx = [];
        let resMetadata = await alchemy.nft.getContractMetadata(nftContractAddress);
        setNftContractName(resMetadata.name);
        setNftContractSymbole(resMetadata.symbol);
        setNftContractDeployer(resMetadata.contractDeployer);
    }

    return (
        <div>
        <h1>NFTs</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5px",
          }}
        >
          
            <div style={{ width: "300px"}}>
              <table>
                <tr>
                  <td>
                    <input type='text'  
                    placeholder='Fill in nft`s smart contract address' 
                    style={{width: "100%", padding: "12px 20px", margin: "8px 0", boxSizing: "border-box"}}
                    value={nftContractAddress} 
                    onChange={(e) => setNftContractAddress(e.target.value)}>
                    </input>
                    <button 
                    style={{cursor: "pointer", width: "100%", backgroundColor: "", padding: "12px 20px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "16px"}}
                    onClick={(e) => getNftData()}>Search</button>
                </td>
                </tr>
                
              </table>
            </div>
          </div>
      
        <div class="flex-child-element green">
              <table style={{ paddingTop: "100px" }}>
                <tr>
                  <th style={{ textAlign: "center" }}>
                    Nft Data
                  </th>
                </tr>
                <tr>
                  <td>Total owners:</td>
                  <td>{nftContractOwners}</td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>{nftContractName}</td>
                </tr>
                <tr>
                  <td>Symbole:</td>
                  <td>{nftContractSymbole}</td>
                </tr>
                <tr>
                  <td>Deployer:</td>
                  <td>{nftContractDeployer}</td>
                </tr>
              </table>
            </div>
        </div>
    )
}