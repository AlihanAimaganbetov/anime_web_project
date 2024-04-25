// action.d.ts

export declare const ADD_TO_FAVORITES: string;
export declare const REMOVE_FROM_FAVORITES: string;

interface Item {
    // Определите интерфейс для объекта item
    // Например:
    id: number;
    name: string;
    // Добавьте другие поля, если необходимо
}

interface AddToFavoritesAction {
    type: typeof ADD_TO_FAVORITES;
    payload: Item;
}

interface RemoveFromFavoritesAction {
    type: typeof REMOVE_FROM_FAVORITES;
    payload: number; // Предположим, что itemId имеет тип number
}

export type ActionTypes = AddToFavoritesAction | RemoveFromFavoritesAction;

export declare function addToFavorites(item: Item): AddToFavoritesAction;
export declare function removeFromFavorites(itemId: number): RemoveFromFavoritesAction;
