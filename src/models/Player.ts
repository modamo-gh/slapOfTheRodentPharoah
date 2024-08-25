import Card from "./Card";

export default class Player {
	name: string;
	hand: Card[];

	constructor(name: string) {
		this.name = name;
		this.hand = [];
	}

	claimDiscardPile = (discardPile: Card[]) => {
		this.hand = discardPile.reverse().concat(this.hand);
	}

	placeCard = (): Card | undefined => {
		return this.hand.pop();
	};
}
