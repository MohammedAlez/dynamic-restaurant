export type Menu = {
    id: number;
    slug: string;
    title: string;
    desc?: string;
    img?: string;
    color: string;
}[];

export type Product = {
    id: number;
    title: string;
    desc?: string;
    img?: string;
    price: string;
    options?: { title: string; additionalPrice: string }[];
};

export type Products = Product[];

export type Order={
    id: string,
    createdAt:string,
    userEmail:string,
    desc?:string,
    price:string,
    status:string,
    products: cartItem[]
}

export type cartItem={
    id: string,
    title:string,
    img?: string,
    price: number,
    optionTitle?: string,
    quantity:number
}

export type Actions={
    addToCart:(item:cartItem)=>void;
    removeFromCart:(item:cartItem)=>void;
}