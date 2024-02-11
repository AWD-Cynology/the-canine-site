export class FavoriteDog {
    id: number = 0;
    user_id: string = '';
    image_id: string = '';
    sub_id: string = '';
    created_at: string = '';
    image: Image = new Image;
    name: string = '';
}

export class Dog {
    breeds: Breed[] = [];
    id: string = '';
    url: string = '';
    width: number = 0;
    height: number = 0;
}

export class Breed {
    weight: Weight = new Weight;
    height: Height = new Height;
    id: number = 0;
    name: string = '';
    bred_for: string = '';
    breed_group: string = '';
    life_span: string = '';
    temperament: string = '';
    origin: string = '';
    reference_image_id: string = '';
    image: Image = new Image;
    upvotes: number = 0;
    downvotes: number = 0;
}

export class Image {
    id: string = '';
    width: number = 0;
    height: number = 0;
    url: string = '';
}

export class Weight {
    imperial: string = '';
    metric: string = '';
}

export class Height {
    imperial: string = '';
    metric: string = '';
}