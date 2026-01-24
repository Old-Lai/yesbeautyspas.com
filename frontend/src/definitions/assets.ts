export type Image = {
    src: string;
    alt: string;
}

export interface ImageList {
    [key: string]: Image
}