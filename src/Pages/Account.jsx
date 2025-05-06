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
      <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row justify-between p-4 text-white">
        <div className="bg-gray-800 rounded-2xl p-4 w-full lg:w-1/2 mb-4 lg:mb-0">
          <div>
            <h4 className="text-xl font-semibold">Welcome {user.fname} 😊</h4>
          </div>

          <form className="space-y-4">
            {/* Deposit Section */}
            <div>
              <label className="block mb-1">Deposit</label>
              <input
                type="text"
                {...register("deposit")}
                className="w-full p-2 rounded text-black outline-none border-2 bg-white"
              />
              {errors.deposit && <p className="text-red-400 text-sm">{errors.deposit.message}</p>}
              <button
                type="button"
                onClick={handleSubmit((data) => handleDeposit(data))}
                disabled={!depositValue}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Deposit
              </button>
            </div>

            {/* Withdraw Section */}
            <div>
              <label className="block mb-1">Withdraw</label>
              <input
                type="text"
                {...register("withdraw")}
                className="w-full p-2 rounded text-black outline-none  bg-white"
              />
              {errors.withdraw && <p className="text-red-400 text-sm">{errors.withdraw.message}</p>}
              <button
                type="button"
                onClick={handleSubmit((data) => handleWithdraw(data))}
                disabled={!withdrawValue}
                className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Withdraw
              </button>
            </div>

            {/* Loan Section */}
            <div>
              <label className="block mb-1">Request Loan</label>
              <input
                type="text"
                {...register("request")}
                className="w-full p-2 rounded text-black outline-none   bg-white"
              />
              {errors.request && <p className="text-red-400 text-sm">{errors.request.message}</p>}

              <input
                type="text"
                placeholder="Purpose"
                {...register("purpose")}
                disabled={!requestValue}
                className="w-full p-2 mt-2 rounded text-black outline-none bg-white disabled:bg-gray-300"
              />
              {errors.purpose && <p className="text-red-400 text-sm">{errors.purpose.message}</p>}

              <button
                type="button"
                onClick={handleSubmit((data) => handleLoan(data))}
                disabled={!requestValue}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Loan
              </button>
            </div>

            {/* Return Loan Section */}
            <div>
              <label className="block mb-1">Return Loan</label>
              <button
                type="button"
                onClick={handlereturnLoan}
                disabled={!hasLoan}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Return Loan
              </button>
            </div>
          </form>
        </div>

        {/* Account Info Section */}
        <div className=" mt-4 lg:mt-0 lg:w-1/3 p-4 space-y-2 w-full rounded-2xl">
          <h3>💰 <span className="font-bold p-2">Balance:</span> {balance}</h3>
          <h3>⬆️ <span className="font-bold p-2">Latest Deposit:</span> {accountDeposit}</h3>
          <h3>📌 <span className="font-bold p-2">Purpose:</span> {purpose}</h3>
          <h3>💸 <span className="font-bold p-2">Loan:</span> {loanAmount}</h3>
          <h3>⬇️ <span className="font-bold p-2">Withdrawn:</span> {currentWithdraw}</h3>
        </div>
      </div>
    </>
  );
}

export default Account;
