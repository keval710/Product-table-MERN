export interface formDataInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any,
    id: string,
    productName: string,
    price: string,
    description: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any
}


// export interface FormInterface {

//     [key: string]: any,
//     id: {
//         value: string,
//     },
//     productName: {
//         value: string,
//         error: boolean
//     },
//     price: {
//         value: string,
//         error: boolean
//     },
//     description: {
//         value: string,
//         error: boolean
//     }
// }