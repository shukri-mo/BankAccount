import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../Context/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { withdraw, loan, deposit, returnLoan } from "../RTK/Slice";

function Account() {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.account.balance);
  const accountDeposit = useSelector((state) => state.account.deposit);
  const hasLoan = useSelector((state) => state.account.hasLoan);
  const loanAmount = useSelector((state) => state.account.loan);
  const purpose = useSelector((state) => state.account.loanPurpose);
  const currentWithdraw = useSelector((state) => state.account.withdraw);
  // EVENT HANDLERS
  const handleDeposit = (data) => {
    dispatch(deposit(data.deposit));
    reset({ deposit: "" });
  };

  const handleWithdraw = (data) => {
    dispatch(withdraw(data.withdraw));
    reset({ withdraw: "" });
  };
  const handleLoan = (data) => {
    if (!data.request || !data.purpose.trim()) return;
    dispatch(loan({ amount: data.request, purpose: data.purpose }));
    reset({ request: "", purpose: "" });
  };
  const handlereturnLoan = () => {
    dispatch(returnLoan());
  };

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    watch,
  } = useForm();
  const depositValue = watch("deposit");
  const withdrawValue = watch("withdraw");
  const requestValue = watch("request");

  const { user } = useUser();
  return (
    <>
      {user ? (
        <div>
          <h3>Welcome {user.fname} 😊</h3>
          <h1>Your account operations</h1>

          <form>
            {/* Deposit Section */}
            <label htmlFor="">Deposit</label>
            <input type="text" {...register("deposit")} />
            {errors.deposit && <p>{errors.deposit.message}</p>}

            <button
              onClick={handleSubmit((data) => handleDeposit(data))}
              disabled={!depositValue}
            >
              Deposit
            </button>

            {/* Withdraw Section */}
            <label htmlFor="">Withdraw</label>
            <input type="text" {...register("withdraw")} />
            {errors.withdraw && <p>{errors.withdraw.message}</p>}

            <button
              onClick={handleSubmit((data) => handleWithdraw(data))}
              disabled={!withdrawValue}
            >
              Withdraw
            </button>

            {/* Loan Section */}
            <label htmlFor="">RequestLoan </label>
            <input type="text" {...register("request")} />
            {errors.request && <p>{errors.request.message}</p>}

            <input
              type="text"
              placeholder="purpose"
              {...register("purpose")}
              disabled={!requestValue}
            />
            {errors.purpose && <p>{errors.purpose.message}</p>}

            <button
              onClick={handleSubmit((data) => handleLoan(data))}
              disabled={!requestValue}
            >
              Loan
            </button>

            {/* Return Loan */}
            <label htmlFor="">Return Loan</label>
            <button onClick={handlereturnLoan} disabled={!hasLoan}>
              Return Loan
            </button>
          </form>

          {/* Display Account Info */}
          <h3>Your Account Balance: {balance}</h3>
          <h3>Current deposit: {accountDeposit}</h3>
          <h3>Purpose: {purpose}</h3>
          <h3>Loan: {loanAmount}</h3>
          <h3>Withdrawn: {currentWithdraw}</h3>
        </div>
      ):<div>please click create Account to proceed </div>}

      
    </>
  );
}

export default Account;
