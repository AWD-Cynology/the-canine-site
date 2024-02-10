import { Image } from "./dog.model";

export class Vote {
    id: number = 0;
    image_id: string = '';
    sub_id: string = '';
    created_at: string = '';
    value: number = 0;
    country_code: string = '';
    image: Image = new Image;
}