export class DogModel{
    breeds: Breed[] = [];
}

export class Breed{
    name: string = "";
}

export class Image{
    id: string = "";
    url: string = "";
}
export class FavoriteDog{
    image: Image = new Image;
    name: string = "";
}