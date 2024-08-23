import Card from "./Card";

export default class Deck{
    deck: Card[];

    constructor(){
        this.deck = [];

        const suits = ["Club", "Diamond", "Heart", "Spade"];
        const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

        for(const suit of suits){
            for(const value of values){
                this.deck.push(new Card(suit, value));
            }
        }
    }
}