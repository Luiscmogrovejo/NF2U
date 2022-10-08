import { Field, SmartContract, State, PublicKey, UInt32 } from 'snarkyjs';
export declare class ERC721 extends SmartContract {
    ownerContract: State<PublicKey>;
    owner: State<PublicKey>;
    expiryDate: State<Field>;
    idToken: State<UInt32>;
    private _name;
    private _baseURI;
    private _symbol;
    private _totalSupply;
    private _balances;
    private _owners;
    deploy(args: any): void;
    mint(to: PublicKey, price: number, expiryDate: Field): {
        owner: PublicKey;
        tokenId: UInt32;
    } | undefined;
    updateBalance(operation: any, amount: UInt32): void;
    pause(expired: boolean, owner: PublicKey): string | boolean;
    claim(): void;
    ownerOf(_idToken: Number): any[];
    name(): string;
    symbol(): string;
    totalSupply(): UInt32;
    baseURI(): string;
}
