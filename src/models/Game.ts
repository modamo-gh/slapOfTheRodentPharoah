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

		let currentPlayerIndex = Math.floor(
			Math.random() * this.players.length
		);

		while (
			!this.players.some(
				(player) => player.hand.length === this.cardsInPlay
			)
		) {
			const currentPlayer = this.players[currentPlayerIndex];

			if (this.discardPile.length) {
				switch (this.discardPile[this.discardPile.length - 1].value) {
					case "J":
						for (let i = 0; i < 1; i++) {
							const playerCard = currentPlayer.placeCard();

							if (playerCard) {
								this.discardPile.push(playerCard);
								console.log(
									`${currentPlayer.name} played a ${playerCard.value} of ${playerCard.suit}`
								);
							}
						}
						break;

					case "Q":
						for (let i = 0; i < 2; i++) {
							const playerCard = currentPlayer.placeCard();

							if (playerCard) {
								this.discardPile.push(playerCard);
								console.log(
									`${currentPlayer.name} played a ${playerCard.value} of ${playerCard.suit}`
								);
							}
						}
						break;

					case "K":
						for (let i = 0; i < 3; i++) {
							const playerCard = currentPlayer.placeCard();

							if (playerCard) {
								this.discardPile.push(playerCard);
								console.log(
									`${currentPlayer.name} played a ${playerCard.value} of ${playerCard.suit}`
								);
							}
						}
						break;

					case "A":
						for (let i = 0; i < 4; i++) {
							const playerCard = currentPlayer.placeCard();

							if (playerCard) {
								this.discardPile.push(playerCard);
								console.log(
									`${currentPlayer.name} played a ${playerCard.value} of ${playerCard.suit}`
								);
							}
						}
						break;

					default:
						const playerCard = currentPlayer.placeCard();

						if (playerCard) {
							this.discardPile.push(playerCard);
							console.log(
								`${currentPlayer.name} played a ${playerCard.value} of ${playerCard.suit}`
							);
						}
						break;
				}
			}
			else{
				const playerCard = currentPlayer.placeCard();

						if (playerCard) {
							this.discardPile.push(playerCard);
							console.log(
								`${currentPlayer.name} played a ${playerCard.value} of ${playerCard.suit}`
							);
						}
			}

			currentPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
		}
	};
}
