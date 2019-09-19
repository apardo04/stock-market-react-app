const SectorData = props => {
    return(
        <>
            <div className="title">
                <div className="sector-data">
                    {Object.entries(props.data["Rank A: Real-Time Performance"]).map(([key,value]) => 
                        <><span>{key}</span><span className={(value[0] == '-') ? "red" : "white"}> {value} </span>| </>
                    
                    )}
                </div>
            </div>
            <style jsx>{`
                .white {
                    color: white;
                }
                .title {
                    width: 100%;
                    right: 0;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 10;
                    bottom: 5px;
                    display: flex;
                    flex-direction: column;
                    padding-top: 15px;
                }
                .title .sector-data {
                    white-space: nowrap;
                    opacity: 0.85;
                    line-height: 4vh;
                    -webkit-animation: marquee 20s linear infinite;
                    animation: marquee 20s linear infinite;
                    font-size: 25px;
                }
                @keyframes marquee {
                    0%   { transform: translate(100%, 0); }
                    100% { transform: translate(-200vw, 0); }
                }
                @media only screen and (max-width: 978px) {
                    .title .sector-data {
                        -webkit-animation: marquee 20s linear infinite;
                        animation: marquee 20s linear infinite;
                    }
                    @keyframes marquee {
                        0%   { transform: translate(100%, 0); }
                        100% { transform: translate(-1000vw, 0); }
                    }
                }
            `}</style>
        </>
        
    )
}


export default SectorData