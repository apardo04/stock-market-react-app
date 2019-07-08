const Stock = props => {
    let marketCap = Math.abs(Number(parseFloat(props.data.marketCap)));
    const marketCapConverter = () => {
        return marketCap >= 1.0e+12
            ? (marketCap / 1.0e+12).toFixed(2) + "T"
            : marketCap >= 1.0e+9
            ? (marketCap / 1.0e+9).toFixed(2) + "B"
            : marketCap >= 1.0e+6
            ? (marketCap / 1.0e+6).toFixed(2) + "M"
            : marketCap >= 1.0e+3
            ? (marketCap / 1.0e+3).toFixed(2) + "K"
            : marketCap;
    }

    return (    
        <React.Fragment>
                <div className="stock-info">
                    <span className="stock-header green">{props.data.symbol} | {props.data.companyName}</span>
                    <ul>
                        <li>Current Price: <span className={props.data.color}>${parseFloat(props.data.latestPrice).toFixed(2).toLocaleString()}</span></li>
                        <li>Change: <span className={props.data.color}>${parseFloat(props.data.change).toFixed(2)}</span></li>
                        <li>Change Percent: <span className={props.data.color}>{(props.data.changePercent * 100).toFixed(2)}%</span></li>
                        { props.data.peRatio != null &&
                            <li>PE Ratio: <span>{props.data.peRatio}</span></li>
                        } 
                        { props.data.dividendYield != "" &&
                            <li>Dividend Yield: <span>{(props.data.dividendYield * 100).toFixed(2)}%</span></li>
                        }
                        { marketCap != 0 &&
                            <li>Market Cap: <span>{marketCapConverter()}</span></li>
                        }
                        <li>Volume: <span>{parseFloat(props.data.latestVolume).toLocaleString()}</span></li>
                        <li>Average Volume: <span>{parseFloat(props.data.avgTotalVolume).toLocaleString()}</span></li>
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