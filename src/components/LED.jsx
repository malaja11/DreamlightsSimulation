export default function LED({id, x, y, d}) {
    return <div className='led' id={id} style={{ left: x, top: y, width: d, height: d }}></div>
}