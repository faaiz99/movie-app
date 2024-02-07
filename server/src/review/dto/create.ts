export class CreateReviewDTO {
  id?: string;
  title: string;
  rating: number;
  description: string;
  userId: string;

  constructor() {
    this.id = "";
    this.title = "";
    this.rating = 0;
    this.description = "";
    this.userId = "";
  }
}
