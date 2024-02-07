export class CreateMovieDTO {
  id: string;
  title: string;
  description: string;
  poster: string;
  trailer: string;
  userId: string;

  constructor() {
    this.id = "";
    this.title = "";
    this.description = "";
    this.poster = "";
    this.trailer = "";
    this.userId = "";
  }
}
