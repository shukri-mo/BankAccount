import { createSlice } from "@reduxjs/toolkit";
const  initialState={
    balance:0,
    loan:0,
    loanPurpose:"",
    hasLoan:false,
    deposit:0,
    withdraw:0
        }
const AccountSlice=createSlice({
name:'account',
initialState,
reducers:{
    deposit(state,action){
        const amount=Number(action.payload)
        state.balance+=amount
        state.deposit+=amount

      
    },
    withdraw(state,action){
        const amount=Number(action.payload)
       
        if(amount>state.balance){
            alert("insufficient balance")
            return 
        }
        state.balance-=amount
        state.withdraw+=amount
    },
  loan:(state,action)=>{
    const amount=Number(action.payload.amount)
    state.loan=amount
    state.loanPurpose=action.payload.purpose
    state.balance+=amount
    state.hasLoan=true;
  },
  returnLoan(state) {
    if (state.hasLoan && state.balance >= state.loan) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
      state.hasLoan = false;
    } else if (state.hasLoan) {
      alert("Insufficient balance to return the loan");
    }
  }
  
    
    }

     
})
export const{deposit,withdraw,loan,returnLoan}=AccountSlice.actions;

export default  AccountSlice.reducer
