import "./News.css"

const News = () => {
    return (
        <div className="news" style={{backgroundImage: "url('https://i.postimg.cc/qq6dMMDz/background-Image.png')"}}>
            <h2>News</h2>
            <div className="rotationsContainer">
                <div className="rotation"></div>
                <div className="rotation"></div>
                <div className="rotation"></div>
            </div>
        </div>
    )
}

export default News