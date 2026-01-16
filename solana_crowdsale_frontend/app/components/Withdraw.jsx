"use client";

import { useEffect, useState } from "react";
import { PublicKey, SystemProgram } from "@solana/web3.js";

import config from "@/app/config.json";

export default function Withdraw({
  crowdsaleProgram,
  user,
  provider,
  anchorProvider,
  getUserBalance,
  getCrowdsaleBalance,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const withdrawHandler = async () => {
    try {
      const transaction = await crowdsaleProgram.methods
        .withdraw()
        .accounts({
          owner: user.toString(),
          crowdsale: config.CROWDSALE_PDA,
          systemProgram: SystemProgram.programId,
        })
        .transaction();

      const { blockhash, lastValidBlockHeight } =
        await anchorProvider.connection.getLatestBlockhash();

      transaction.feePayer = new PublicKey(user);
      transaction.recentBlockhash = blockhash;

      const { signature } = await provider.signAndSendTransaction(transaction);

      await anchorProvider.connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });

      setIsLoading(true);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    if (user && isLoading) {
      getUserBalance(anchorProvider);
      getCrowdsaleBalance(anchorProvider);
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="withdraw">
      <button type="button" className="button" onClick={withdrawHandler}>
        WITHDRAW
      </button>
    </div>
  );
}