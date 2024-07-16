export default function Star({startX, startY, endX, endY}) {
    const x = Math.floor(Math.random() * (endX - startX)) + startX;
    const y = Math.random() * (endY - startY) + startY;
    const duration = (Math.random() * 4 + 10) + "s";
    const delay = (Math.random()* 4) + "s";
    return (
        <div className='star' style={{left: x, top: y, animationDelay: delay, animationDuration: duration}}>

        </div>
    );
}


