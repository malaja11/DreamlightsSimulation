import Star from "./Star";

export default function Stars({count}) {
    return [...Array(count)].map((e, i) => <Star key={i} startX={10} startY={10} endX={document.documentElement.clientWidth-10} endY={document.documentElement.clientHeight-10} /> )
}