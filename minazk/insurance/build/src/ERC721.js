var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, SmartContract, state, State, method, PublicKey, UInt32, Mina,
// Poseidon
 } from 'snarkyjs';
export class ERC721 extends SmartContract {
    constructor() {
        super(...arguments);
        this.ownerContract = State(); // who's deploy contract
        this.owner = State(); // who has the nft insurance
        this.expiryDate = State();
        this.idToken = State(); // ID insurance policy
        this._name = '';
        this._baseURI = '';
        this._symbol = '';
        this._totalSupply = new UInt32(Field(0));
        this._owners = []; // List of insurance owners
    }
    deploy(args) {
        super.deploy(args);
        this._name = args.name;
        this._symbol = args.symbol;
        this._totalSupply = args.totalSupply;
        this.idToken.set(new UInt32(new Field(0)));
        this.ownerContract.set(Mina.currentTransaction.get().sender);
    }
    mint(to, price, expiryDate) {
        let sender = Mina.currentTransaction.get().sender;
        sender.assertEquals(this.ownerContract.get());
        const _idToken = this.idToken.get();
        const newIdToken = _idToken.add(1);
        newIdToken.assertLt(this._totalSupply);
        // const _owners: Array<any> = [];
        const index = this._owners.findIndex((item) => item.address === to);
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
    updateBalance(operation, amount) {
        let op = operation(amount);
        console.log('OP ', op);
        this._balances[op];
    }
    // @method transfer(from: PublicKey, to: PublicKey, idToken: UInt32) {
    // }
    pause(expired, owner) {
        let sender = Mina.currentTransaction.get().sender;
        sender.assertEquals(this.ownerContract.get());
        const index = this._owners.findIndex((item) => item.address === owner);
        console.log('index ', index);
        let result = 
        // eslint-disable-next-line snarkyjs/no-ternary-in-circuit
        index === -1
            ? 'Owner not exist!'
            : (this._owners[index].isPaused = expired);
        console.log('Paused ', result);
        return result;
    }
    claim() {
        let sender = Mina.currentTransaction.get().sender;
        const index = this._owners.findIndex((item) => item.address === sender);
        sender.assertEquals(this._owners[index].address);
        this._owners[index].isClaimed = true;
    }
    ownerOf(_idToken) {
        const index = this._owners.findIndex((item) => item.idToken === _idToken);
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
__decorate([
    state(PublicKey),
    __metadata("design:type", Object)
], ERC721.prototype, "ownerContract", void 0);
__decorate([
    state(PublicKey),
    __metadata("design:type", Object)
], ERC721.prototype, "owner", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], ERC721.prototype, "expiryDate", void 0);
__decorate([
    state(UInt32),
    __metadata("design:type", Object)
], ERC721.prototype, "idToken", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey, Number, Field]),
    __metadata("design:returntype", void 0)
], ERC721.prototype, "mint", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UInt32]),
    __metadata("design:returntype", void 0)
], ERC721.prototype, "updateBalance", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, PublicKey]),
    __metadata("design:returntype", void 0)
], ERC721.prototype, "pause", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ERC721.prototype, "claim", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ERC721.prototype, "ownerOf", null);
