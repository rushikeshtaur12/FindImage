import { useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Ap from './CSS/Ap.css'
function ImgDemo() {
    const [data, setData] = useState([]);
    // const [search, setSearch] = useState('');
    const [model, setModel] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('')

    const handelSearch = () => {
        if (searchTerm.length < 4) {
            fetch(`https://pixabay.com/api/?key=32203192-efce0f01a2d536067e1bb0d0c&q=${searchTerm}&image_type=photo&pretty=true`)
                .then(res => res.json())
                .then(data =>
                    data.total > 0 ? setData(data.hits) : alert("Result Not Found"))
        } else {
            alert('Please Enter 3 words only');
        }
    }

    const getImg = (webformatURL) => {
        const urls = data.map((item) => item.webformatURL);
        setImageUrls(urls);
        setCurrentIndex(urls.indexOf(webformatURL)); 
        setModel(true);
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <section className='sec'>
            <div className='text'>
                <input className='input' placeholder='search images' onChange={(e) => handleChange(e)}></input>
                <button onClick={handelSearch} >Search</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                <div className={model ? "model open" : 'model'}>
                    <Carousel showThumbs={false} showStatus={false} selectedItem={currentIndex}>
                        {imageUrls.map((url, index) => (
                            <div key={index}>
                                <img src={url} alt='dummy' />
                                <AiOutlineClose className="closeicon" onClick={() => setModel(false)} />
                            </div>
                        ))}
                    </Carousel>
                </div>
                {data && data.map((items) => {
                    return (
                        <div key={items.id} onClick={() => getImg(items.webformatURL)}>
                            <img src={items.webformatURL} alt='' height={items.webformatHeight} width={items.webformatWidth}></img>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ImgDemo;
