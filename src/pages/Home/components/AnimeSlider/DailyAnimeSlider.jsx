import DayCircleButton from '../../../../common/DayCircleButton';
import DailyAnimeList from '../../../../common/DailyAnimeList';
import AnimeCard from '../../../../common/AnimeCard';
import Carousel from "react-multi-carousel";
import { responsive } from '../../../../constraints/responsive';
import useDailyStore from '../../../../stores/useDailyStore'; 

const DailyAnimeSlider = () => {
  const { selectedDayData } = useDailyStore();

  return (
    <div className='w-full'>
      <div className='lg:text-2xl max-lg:text-lg font-semibold mb-2'>
        요일별 신작
      </div>
      <DayCircleButton isHomePage={true} />
      <DailyAnimeList />
      <Carousel
        className='relative z-0 mb-2'
        swipeable={true}
        draggable={false}
        responsive={responsive}
        ssr={true}
        infinite={true}   
        arrows={true}
      >
        

        {selectedDayData.map((anime) => (
          <AnimeCard
            key={anime.id}
            imgUrl={anime.img}
            title={anime.name}
            all={anime}
          />
        ))}

      </Carousel>
      
    </div>
  );
}

export default DailyAnimeSlider;
