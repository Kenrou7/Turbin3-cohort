import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js"
import wallet from './dev-wallet.json'

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const connection = new Connection("https://api.devnet.solana.com");

async function test(retries: number) {
    console.log(keypair.publicKey.toBase58())
    return
    try {
        console.log("Retry", retries)
        const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        console.log(`Success! Check out you TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`);
        test(retries+1);
    }
    return
}
test(1);