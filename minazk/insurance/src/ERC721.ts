import {
  Field,
  SmartContract,
  state,
  State,
  method,
  PublicKey,
  UInt32,
  Mina,
  // Poseidon
} from 'snarkyjs';

/**
 * Basic Example
 * See https://docs.minaprotocol.com/zkapps for more info.
 *
 * The Add contract initializes the state variable 'num' to be a Field(1) value by default when deployed.
 * When the 'update' method is called, the Add contract adds Field(2) to its 'num' contract state.
 *
 * This file is safe to delete and replace with your own contract.
 */
interface Balances {
  address: PublicKey;
  balance: Field;
  ids: UInt32[];
}

export class ERC721 extends SmartContract {
  @state(PublicKey) ownerContract = State<PublicKey>(); // who's deploy contract
  @state(PublicKey) owner = State<PublicKey>(); // who has the nft insurance
  @state(Field) expiryDate = State<Field>();
  @state(UInt32) idToken = State<UInt32>(); // ID insurance policy

  private _name: string = '';
  private _baseURI: string = '';
  private _symbol: string = '';
  private _totalSupply: UInt32 = new UInt32(Field(0));
  private _balances: Array<Balances>;
  private _owners: any = []; // List of insurance owners

  deploy(args: any) {
    super.deploy(args);
    this._name = args.name;
    this._symbol = args.symbol;
    this._totalSupply = args.totalSupply;
    this.idToken.set(new UInt32(new Field(0)));
    this.ownerContract.set(Mina.currentTransaction.get().sender!);
  }

  @method mint(to: PublicKey, price: number, expiryDate: Field) {
    let sender = Mina.currentTransaction.get().sender!;
    sender.assertEquals(this.ownerContract.get());

    const _idToken: UInt32 = this.idToken.get();
    const newIdToken: UInt32 = _idToken.add(1);

    newIdToken.assertLt(this._totalSupply);

    // const _owners: Array<any> = [];
    const index = this._owners.findIndex((item: any) => item.address === to);
    console.log('index ', index);

    // eslint-disable-next-line snarkyjs/no-if-in-circuit
    if (index === -1) {
      this._owners.push({
        address: to,
        expiryDate: this.expiryDate.set(expiryDate),
        idToken: newIdToken,
        balance: Field(1),
        price,
        isClaimed: false,
        isPaused: false,
      });
      this.owner.set(to);
      this._balances.push({
        address: to,
        balance: Field(1),
        ids: [...this._owners.idToken, newIdToken],
      });
      return { owner: to, tokenId: this.idToken.get() };
    }

    this.idToken.set(newIdToken);
  }

  @method updateBalance(operation: any, amount: UInt32) {
    let op = operation(amount);
    console.log('OP ', op);
    this._balances[op];
  }

  // @method transfer(from: PublicKey, to: PublicKey, idToken: UInt32) {

  // }

  @method pause(expired: boolean, owner: PublicKey) {
    let sender = Mina.currentTransaction.get().sender!;
    sender.assertEquals(this.ownerContract.get());

    const index = this._owners.findIndex((item: any) => item.address === owner);
    console.log('index ', index);

    let result =
      // eslint-disable-next-line snarkyjs/no-ternary-in-circuit
      index === -1
        ? 'Owner not exist!'
        : (this._owners[index].isPaused = expired);
    console.log('Paused ', result);
    return result;
  }

  @method claim() {
    let sender = Mina.currentTransaction.get().sender!;
    const index = this._owners.findIndex(
      (item: any) => item.address === sender
    );
    sender.assertEquals(this._owners[index].address);
    this._owners[index].isClaimed = true;
  }

  @method ownerOf(_idToken: Number) {
    const index = this._owners.findIndex(
      (item: any) => item.idToken === _idToken
    );
    console.log('index ', index);
    return [this._owners[index].owner];
  }

  name() {
    return this._name;
  }

  symbol() {
    return this._symbol;
  }

  totalSupply() {
    return this._totalSupply;
  }

  baseURI() {
    return this._baseURI;
  }
}
