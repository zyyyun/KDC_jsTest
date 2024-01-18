export default function uniqueArray(list){
    console.log(list);
    return Array.from(new Set(list));
}