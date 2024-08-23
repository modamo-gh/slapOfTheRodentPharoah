import Card from "./Card";

export default class Deck {
	deck: Card[];

	constructor() {
		this.deck = [];

		const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
		const values = [
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"J",
			"Q",
			"K",
			"A"
		];

		for (const suit of suits) {
			for (const value of values) {
				this.deck.push(new Card(suit, value));
			}
		}
	}

	deal = (numberOfPlayers: number): Card[][] => {
		const numberOfCardsPerPlayers = Math.floor(
			this.deck.length / numberOfPlayers
		);

		const hands: Card[][] = Array.from(
			{ length: numberOfPlayers },
			() => []
		);

		while (hands[numberOfPlayers - 1].length < numberOfCardsPerPlayers) {
			for (let i = 0; i < numberOfPlayers; i++) {
				const card = this.deck.pop();

				if (card) {
					hands[i].push(card);
				}
			}
		}

		return hands;
	};

	shuffle = () => {
		for (let i = this.deck.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
		}
	};
}
