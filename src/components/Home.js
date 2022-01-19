import { Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { ColorButton } from "./StyledButton"
import Web3 from "web3";
import { contractAddress } from "../utils/config";
import abi from "../utils/abi.json";

const API_URL = process.env.REACT_APP_API;

export default function Home() {
  const [reserved, setReserved] = useState("");
  const [endOfPending, setEndOfPending] = useState("");
  const [pendingToken, setPendingToken] = useState("");
  const [amount, setAmount] = useState("");
  const [rewardDept, setRewardDept] = useState("");
  const [kedUp, setKedUp] = useState("");
  const [nextHarvestUntil, setNextHarvestUntil] = useState("");
  const [amountDeposit, setAmountDeposit] = React.useState("");
  const [minDeposit, setMinDeposit] = React.useState("");
  const [epoch, setEpoch] = React.useState("");
  const [amountWithdraw, setAmountWithdraw] = React.useState("");
  const [newOwner, setNewOwner] = React.useState("");
  const [pendingPeriodinDays, setPendingPeriodinDays] = React.useState("");
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, contractAddress);

  const getMinDeposit = (event) => {
    setMinDeposit(event.target.value);
  }
  const getEpoch = (event) => {
    setEpoch(event.target.value);
  }
  const getAmountWithdraw = (event) => {
    setAmountWithdraw(event.target.value);
  }
  const getNewOwner = (event) => {
    setNewOwner(event.target.value);
  }
  const getPendingPeriodinDays = (event) => {
    setNewOwner(event.target.value);
  }

  const getAmount = (event) => {
    setAmountDeposit(event.target.value);
  }

  const onQuery = async (idx) => {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    console.log(chainId)
    if (chainId !== "0x61") {
      alert("Please connect bsc testnet!!!");
      return;
    }
    const _account = await web3.eth.getAccounts();
    switch (idx) {
      case 0:
        const val0 = await contract.methods.pendingToken(_account[0]).call();

        console.log(val0, "temple")
        setPendingToken(val0);
        break;
      case 1:
        const val1 = await contract.methods.withdrawPending(_account[0]).call();

        console.log(val1, "temple")
        setReserved(val1[0]);
        setEndOfPending(val1[1]);
        break;
      case 2:
        const val2 = await contract.methods.userInfo(_account[0]).call();

        console.log(val2, "temple")
        setAmount(val2[0]);
        setRewardDept(val2[1]);
        setKedUp(val2[2]);
        setNextHarvestUntil(val2[3]);
        break;
      case 3:
        console.log("temple string: ", amountDeposit)
        console.log("temple int: ", Number(amountDeposit))
        const val3 = await contract.methods.deposit(Number(amountDeposit)).send({
          from: _account[0],
          value: amountDeposit,
        })
          .then(async (res) => {
            if (res.status === true) {
              alert("Success to deposit!");
            }
          });
        break;
      case 4:
        await contract.methods.getReward().send({
          from: _account[0],
        })
          .then(async (res) => {
            if (res.status === true) {
              alert("Success to getReward!");
            }
          });
        break;
      case 5:
        await contract.methods.renounceOwnership().send({
          from: _account[0],
        })
          .then(async (res) => {
            if (res.status === true) {
              alert("Success to getReward!");
            }
          });
        break;
      case 6:
        console.log("temple-min-deposit:", minDeposit)
        await contract.methods.setMinDeposit(Number(minDeposit)).send({
          from: _account[0],
          value: minDeposit,
        })
          .then(async (res) => {
            if (res.status === true) {
              alert("Success to SetMinDeposit!");
            }
          });
        break;
      case 7:
        console.log("temple-min-deposit:", epoch)
        await contract.methods.startStaking(Number(epoch)).send({
          from: _account[0],
        })
          .then(async (res) => {
            if (res.status === true) {
              alert("Success to StartStaking!");
            }
          });
        break;
      case 8:
        await contract.methods.startWithdrawingProcess(Number(amountWithdraw)).send({
          from: _account[0],
        })
          .then(async (res) => {
            if (res.status === true) {
              alert("Success to WithdrawProcessing!");
            }
          });
        break;
      case 9:
        await contract.methods.transferOwnership(newOwner).send({
          from: _account[0],
        })
          .then(async (res) => {
            if (res.status === true) {
              alert("Success to Transfer Ownership!");
            }
          });
        break;
      case 10:
        await contract.methods.updateStaking().send({
          from: _account[0],
        })
          .then(async (res) => {
            if (res.status === true) {
              alert("Success to updateStaking!");
            }
          });
        break;
      case 11:
        await contract.methods.updateWithdrawPendingPeriod(Number(pendingPeriodinDays)).send({
          from: _account[0],
        })
          .then(async (res) => {
            if (res.status === true) {
              alert("Success to updateWithdrawPendingPeriod!");
            }
          });
        break;
      case 12:
        await contract.methods.withdrawReserved().send({
          from: _account[0],
        })
          .then(async (res) => {
            if (res.status === true) {
              alert("Success to withdrawReserved!");
            }
          });
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div className="p-10">
        <a href="HOME.html#sec-b0d7" data-page-id="2979819091" className="u-image u-image-default u-logo u-image-1" data-image-width="233" data-image-height="101" title="Home">
        </a>
        <div>
          <Typography variant="h4" component="h2">
            pendigToken
            <br></br>
            <ColorButton onClick={() => onQuery(0)}>Query</ColorButton>
            <input type="text" placeholder="Returned Value from pendingTokenAddress" className="bg-opacity-0 m-10 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/3" value={pendingToken}></input>
          </Typography>

        </div>
        <Divider />

        <div>
          <Typography variant="h4" component="h2">
            withdrawpending
            <br></br>
            <ColorButton onClick={() => onQuery(1)}>Query</ColorButton>
            <input type="text" placeholder="Reserved" className="bg-opacity-0 m-10 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/4" value={reserved}></input>
            <input type="text" placeholder="End Of Pending" className="bg-opacity-0 m-10 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/4" value={endOfPending}></input>
          </Typography>

        </div>
        <Divider />
        <div>
          <Typography variant="h4" component="h2">
            UserInfo
            <br></br>
            <ColorButton onClick={() => onQuery(2)}>Query</ColorButton>
            <input type="text" placeholder="Amount" className="bg-opacity-0 m-2 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/6" value={amount}></input>
            <input type="text" placeholder="Reward Debt" className="bg-opacity-0 m-2 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/6" value={rewardDept}></input>
            <input type="text" placeholder="Ked Up" className="bg-opacity-0 m-2 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/6" value={kedUp}></input>
            <input type="text" placeholder="Next Havest Until" className="bg-opacity-0 m-2 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/6" value={nextHarvestUntil}></input>
          </Typography>

        </div>
        <Divider />
        <div>
          <Typography variant="h4" component="h2">
            deposit
            <br></br>
            <input type="text" placeholder="Enter the Amount" className="bg-opacity-0 m-10 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/3" onChange={getAmount} ></input>
            <ColorButton onClick={() => onQuery(3)}>Write</ColorButton>
          </Typography>

        </div>
        <Divider />
        <div>
          <Typography variant="h4" component="h2">
            getReward
            <br></br>
            <ColorButton onClick={() => onQuery(4)}>Write</ColorButton>
          </Typography>

        </div>
        <Divider />
        <div>
          <Typography variant="h4" component="h2">
            renounceOwnerShip
            <br></br>
            <ColorButton onClick={() => onQuery(5)}>Write</ColorButton>
          </Typography>

        </div>
        <Divider />
        <div>
          <Typography variant="h4" component="h2">
            setMinDeposit
            <br></br>
            <input type="text" placeholder="Enter Set Min Deposit" className="bg-opacity-0 m-10 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/3" onChange={getMinDeposit}></input>
            <ColorButton onClick={() => onQuery(6)}>Write</ColorButton>
          </Typography>

        </div>
        <Divider />
        <div>
          <Typography variant="h4" component="h2">
            startStaking
            <br></br>
            <input type="text" placeholder="Enter Epoch TimeStamp here" className="bg-opacity-0 m-10 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/3" onChange={getEpoch}></input>
            <ColorButton onClick={() => onQuery(7)}>Write</ColorButton>
          </Typography>

        </div>
        <Divider />
        <div>
          <Typography variant="h4" component="h2">
            startWithdrawingProcess
            <br></br>
            <input type="text" placeholder="Enter an adress" className="bg-opacity-0 m-10 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/3" onChange={getAmountWithdraw}></input>
            <ColorButton onClick={() => onQuery(8)}>Write</ColorButton>
          </Typography>

        </div>
        <Divider />
        <div>
          <Typography variant="h4" component="h2">
            transferOwnership
            <br></br>
            <input type="text" placeholder="Enter an adress" className="bg-opacity-0 m-10 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/3" onChange={getNewOwner}></input>
            <ColorButton onClick={() => onQuery(9)}>Write</ColorButton>
          </Typography>

        </div>
        <Divider />
        <div>
          <Typography variant="h4" component="h2">
            updateStaking
            <br></br>
            <ColorButton onClick={() => onQuery(10)}>Write</ColorButton>
          </Typography>

        </div>
        <Divider />
        <div>
          <Typography variant="h4" component="h2">
            updateWithdrawPendingPeriod
            <br></br>
            <input type="text" placeholder="Enter an adress" className="bg-opacity-0 m-10 pr-5 pl-5 border-collapse border border-black rounded-xl p-4 text-xl w-1/3" onChange={getPendingPeriodinDays}></input>
            <ColorButton onClick={() => onQuery(11)}>Write</ColorButton>
          </Typography>

        </div>
        <Divider />
        <div>
          <Typography variant="h4" component="h2">
            withdrawReserved
            <br></br>
            <ColorButton onClick={() => onQuery(12)}>Write</ColorButton>
          </Typography>

        </div>
      </div>
    </div>
  );
}
