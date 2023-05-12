import React from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import "../index.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function Blocks() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockTime, setBlockTime] = useState();
  const [blockHash, setBlockHash] = useState();
  const [blockTransactions, setBlockTransactions] = useState();
  const [blockNonce, setBlockNonce] = useState();
  const [blockTransactionsList, setBlockTransactionsList] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
    getBlockTime();
    getBlockHash();
    getBlockNonce();
    getBlockTransactios();
    //getBlockTransactiosList();
  });

  const handleClick = (e) => {};

  async function getBlockTime() {
    const blkDateTime = new Date(
      (await alchemy.core.getBlock(blockNumber)).timestamp * 1000
    );
    setBlockTime(blkDateTime.toGMTString());
  }

  async function getBlockHash() {
    setBlockHash((await alchemy.core.getBlock(blockNumber)).hash);
  }

  async function getBlockTransactios() {
    let arrTx = [];
    arrTx = (await alchemy.core.getBlock(blockNumber)).transactions;
    //console.log(arrTx);
    setBlockTransactions(arrTx.length);
  }

  async function getBlockNonce() {
    setBlockNonce((await alchemy.core.getBlock(blockNumber)).nonce);
  }

  async function getBlockTransactiosList(blk) {
    let arrTx = [];
    let arrTxList = [];
    console.log("blk: " + blk);
    arrTx = (await alchemy.core.getBlock(blockNumber)).transactions;
    console.log(arrTx[0]);
    setLoading(true);
    let arrItems = 0;
    if (arrTx.length > 10) arrItems = 10;
    else arrItems = arrTx.length;

    for (let i = 0; i < arrItems; i++) {
      const tx = await alchemy.transact.getTransaction(arrTx[i]);
      //console.log(tx);
      arrTxList.push(tx);
    }
    setLoading(true);
    arrTxList.sort();
    arrTxList.reverse();
    setBlockTransactionsList(arrTxList);
    setLoading(false);
  }

  const tableStyle = {
    border: "1px solid black",
  };

  return (
    <div>
      <h1>Block</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "5px",
        }}
      >
        <div class="flex-parent-element">
          <div class="flex-child-element magenta">
            <table>
              <tr>
                <th colSpan={4} style={{ textAlign: "center" }}>
                  Block data
                </th>
              </tr>
              <tr>
                <td>Current block #</td>
                <td>{blockNumber}</td>
              </tr>
              <tr>
                <td>Block time</td>
                <td>{blockTime}</td>
              </tr>
              <tr>
                <td>Block Hash</td>
                <td>{blockHash}</td>
              </tr>
              <tr>
                <td>Transactions</td>
                <td>
                  <a
                    type="button"
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    title="show block transactios"
                    onClick={(e) => getBlockTransactiosList(blockNumber)}
                  >
                   <b>{blockTransactions}</b> click for details
                  </a>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td>Nonce</td>
                <td>{blockNonce}</td>
              </tr>
            </table>
          </div>
          <div class="flex-child-element green">
            <table style={{ paddingTop: "100px" }}>
              <tr>
                <th colspan={2} style={{ textAlign: "center" }}>
                  Account
                </th>
              </tr>
              <tr>
                <td>Balance</td>
                <td>{blockNumber}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        <div class="flex-parent-element">
          <div class="flex-child-element magenta">
            {loading ? (
              <table
                style={{
                  paddingTop: "100px",
                  tableLayout: "fixed",
                  width: "800px",
                  borderCollapse: "collapse",
                }}
              >
                <tr>
                  <td colSpan={7}>Loading transaction please wait ...</td>
                </tr>
              </table>
            ) : (
              <table
                style={{
                  paddingTop: "100px",
                  tableLayout: "fixed",
                  width: "850px",
                  borderCollapse: "collapse",
                }}
              >
                <tr>
                  <th colSpan={8} style={{ textAlign: "center" }}>
                    Block {blockNumber} total transactions:{" "}
                    <span style={{ color: "blue" }}>{blockTransactions} </span>{" "}
                    displaying last <span style={{ color: "blue" }}>10</span>{" "}
                    transactions
                  </th>
                </tr>
                <tr>
                  <td>#</td>
                  <td>From</td>
                  <td>To</td>
                  <td>Index</td> <td>Gas Used</td>
                  <td>Hash</td>
                  <td>Block Number</td>
                  <td>Nonce</td>
                  <td>Type</td>
                </tr>
                {blockTransactionsList.length > 0 ? (
                  blockTransactionsList.map((tx, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td title={tx.from}>{tx.from.slice(0, 6)}...</td>
                      <td title={tx.to}>{tx.to.slice(0, 6)}...</td>
                      <td>{tx.transactionIndex}</td>
                      <td>{parseInt(tx.gasUsed).toString()}</td>
                      <td title={tx.hash}>{tx.hash.slice(0, 6)}...</td>
                      <td>{tx.blockNumber}</td>
                      <td>{tx.nonce}</td>
                      <td>{tx.type}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td></td>
                  </tr>
                )}
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
