import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Spinner from './Spinner';

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, 'listings');
      const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnapshot = await getDocs(q);
      let listings = [];
      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return listings && (
    <>
      <p className="exploreHeading">Recommended</p>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        onAutoplay={() => console.log('autoplaying')}
        autoplay={{ delay: 3000 }} // Adjust delay (in milliseconds) as needed
        pagination={{ clickable: true }}
        style={{ height: '300px' }}
      >
        {listings.map(({ data, id }) => (
          <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
            <div
              style={{
                background: `url(${data.imgUrls[0]}) center no-repeat`,
                height: '100%',
                backgroundSize: 'cover',
              }}
              className="swiperSlideDiv"
            >
              <p className="swiperSlideText">{data.name}</p>
              <p className="swiperSlidePrice">
                ₹ {data.discountedPrice ?? data.regularPrice} {data.type === 'rent' && ' / Month'}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
