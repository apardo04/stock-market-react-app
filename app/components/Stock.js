const Stock = props => {
    let imageError = (ev) => ev.target.src = "static/assets/images/404_img.jpg"
    return (    
        <React.Fragment>
                {/*<div className="stock-image hidden">
                    <img onError={imageError} className="p-2" src={"https://storage.googleapis.com/iex/api/logos/" + props.data.symbol + ".png"} />
                </div>*/}
                <div className="stock-info">
                    <span className="stock-header green">{props.data.symbol} | {props.data.companyName}</span>
                    <ul>
                        <li>Current Price: <span className={props.color}>${parseFloat(props.data.latestPrice).toFixed(2).toLocaleString()}</span></li>
                        <li>Change: <span className={props.color}>${parseFloat(props.data.change).toFixed(2)}</span></li>
                        <li>Change Percent: <span className={props.color}>{(props.data.changePercent * 100).toFixed(2)}%</span></li>
                        <li>PE Ratio: <span>{props.data.peRatio}</span></li>
                        <li>Volume: <span>{parseFloat(props.data.latestVolume).toLocaleString()}</span></li>
                        <li>Average Volume: <span>{parseFloat(props.data.avgTotalVolume).toLocaleString()}</span></li>
                        <li>Market Cap: <span>{parseFloat(props.data.marketCap).toLocaleString()}</span></li>
                    </ul>
                </div>
                <style jsx>{`
                    .stock-info {
                        margin-bottom: 0.25rem;
                    }
                    .stock-header {
                        display: block;
                        line-height: 1.25;
                        margin-top: 0.25rem;
                        margin-bottom: 0.25rem;
                        font-size: 1.125rem;
                        font-weight: 600;
                    }
                    ul {
                        font-size: 1rem;
                        list-style: none;
                        line-height: 1.5;
                        margin: 0;
                        padding: 0;
                    }
                `}</style>
        </React.Fragment>
    )
}

export default Stock