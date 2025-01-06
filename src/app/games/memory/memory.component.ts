import { Component, OnInit } from '@angular/core';
import { CardData } from './card-data.model';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css'],
  standalone: false,
})
export class MemoryComponent implements OnInit {
  cardImages = [
    'c9FQyqIECds',
    'VuQ61rPtDS4',
    'Oc3fP0FXJbU',
    '-SCfP2RB7Zc',
    'GfuxfFJt7cw',
    '_c8fmYTN4yA',
    'zokn65LQxp4',
    '9cMfke5bgnY',
    'ZYtHybjelmw',
    'JysjgyNmL04',
  ];
  cards: CardData[] = [];
  flippedCards: CardData[] = [];
  matchedCount = 0;
  playedCount = 0;
  won = false;

  constructor() {}

  shuffleArray(anArray: any[]): any[] {
    return anArray
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  }

  ngOnInit(): void {
    this.setupCards();
  }

  setupCards(): void {
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default',
      };
      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });
    });
    this.cards = this.shuffleArray(this.cards);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];
    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);
      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
        this.playedCount++;
      }
    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();
    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState =
        cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;
      this.flippedCards = [];
      if (nextState === 'matched') {
        this.matchedCount++;
        if (this.matchedCount === this.cardImages.length) {
          this.won = true;
        }
      }
    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.won = false;
    this.playedCount = 0;
    this.setupCards();
  }
}
