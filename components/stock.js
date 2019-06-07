import Link from 'next/link'

const Stock = props => {
    let imageError = (ev) => ev.target.src = "static/assets/images/404_img.jpg"
    return (    
        <React.Fragment>
            <div className="md:flex bg-white rounded-lg p-6">
                <div className="md:flex-shrink-0">
                    <img onError={imageError} className="rounded-sm max-w-sm" src={"https://storage.googleapis.com/iex/api/logos/" + props.data.symbol + ".png"} />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                    <h2 className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">{props.data.symbol} | {props.data.companyName}</h2>
                    <ul className="mt-2 text-black-600">
                        <li>Current Price: <span className={props.color}>${parseFloat(props.data.latestPrice).toFixed(2).toLocaleString()}</span></li>
                        <li>Change: <span className={props.color}>${parseFloat(props.data.change).toFixed(2)}</span></li>
                        <li>Change Percent: <span className={props.color}>{(props.data.changePercent * 100).toFixed(2)}%</span></li>
                        <li>PE Ratio: <span>{props.data.peRatio}</span></li>
                        <li>Volume: <span>{parseFloat(props.data.latestVolume).toLocaleString()}</span></li>
                        <li>Average Volume: <span>{parseFloat(props.data.avgTotalVolume).toLocaleString()}</span></li>
                        <li>Market Cap: <span>{parseFloat(props.data.marketCap).toLocaleString()}</span></li>
                    </ul>
                </div>
            </div>
            <style jsx global>{`
                .red {
                color: red;
                }
                .green {
                color: green;
                }
            `}</style>
        </React.Fragment>
    )
}

export default Stock