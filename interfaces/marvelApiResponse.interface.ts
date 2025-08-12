export interface MarvelAPIResponse {
    code:   number;
    status: string;
    data:   Data;
}

export interface Data {
    offset:  number;
    limit:   number;
    total:   number;
    count:   number;
    results: Character[];
}

export interface Character {
    id:          number;
    name:        string;
    description: string;
    modified:    string;
    thumbnail:   Thumbnail;
    resourceURI: string;
    comics:      Comics;
    series:      Comics;
}

export interface Comics {
    available:     number;
    collectionURI: string;
    items:         Item[];
}

export interface Item {
    resourceURI: string;
    name:        string;
}

export interface Thumbnail {
    path:      string;
    extension: string;
}
