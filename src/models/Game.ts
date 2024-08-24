import Card from "./Card";
import Player from "./Player";

export default class Game {
	discardPile: Card[];
	deck: Card[];
	players: Player[];
	cardsInPlay: number;

	constructor() {
		this.deck = this.createDeck();
		this.discardPile = [];
		this.players = [];
		this.cardsInPlay = this.deck.length;
	}

	addPlayer = (player: Player) => {
		this.players.push(player);
	};

	createDeck = (): Card[] => {
		const deck = [];
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
				deck.push(new Card(suit, value));
			}
		}

		return deck;
	};

	dealCards = (numberOfPlayers: number, numberOfCardsPerPlayers: number) => {
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

	shuffleDeck = () => {
		for (let i = this.deck.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
		}
	};

	startGame = () => {
		console.log(this.deck);
		this.shuffleDeck();
		console.log(this.deck);

		const numberOfPlayers = this.players.length;

		const numberOfCardsPerPlayers = Math.floor(
			this.deck.length / numberOfPlayers
		);

		this.cardsInPlay = numberOfPlayers * numberOfCardsPerPlayers;
		const hands = this.dealCards(numberOfPlayers, numberOfCardsPerPlayers);

		console.log(this.players);

		for (let i = 0; i < hands.length; i++) {
			this.players[i].hand = hands[i];
		}

		while(!this.players.some(player => player.hand.length === this.cardsInPlay)){
			console.log()
		}

	};
}
