import { useState } from 'react';
import { Logo } from '../../../assets/Svgs/Logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { leftMenuListStyle, leftMenuStyle, navLeftListStyle} from '../../Nav/NavLeftList/NavLeftListStyle';
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { headerStyle } from '../HeaderStyle';
import { navRightListStyle, searchIconStyle, authLinkStyle, hamburgerIconStyle, searchBarStyle, searchInputBarStyle  } from '../../Nav/NavRightList/NavRightListStyle';
import VerticalSideBar from '../../Nav/VerticalSideBar/VerticalSideBar';
import useSideBarStore from '../../../stores/useSideBarStore';
import useAuthStore from '../../../stores/useAuthStore';
import SearchBar from '../../Nav/SearchBar/SearchBar'

const Header = () => {
    const { userData, setUserData } = useAuthStore();
    const navigate = useNavigate();
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const { isSideBarVisible, setIsSideBarVisible } = useSideBarStore();

    const toggleSideBarVisibility = () => {
        setIsSideBarVisible(!isSideBarVisible);
    }

    const handleHamburgerClick = () => {
        toggleSideBarVisibility();
    }

    const showSearchBar = () => {
        setIsSearchBarVisible(!isSearchBarVisible);
    }

    const categories = [
        { name: "태그검색", src:"/finder"},
        { name: "요일별 신작", src: "/daily" },
        { name: "테마추천", src: "/themes" },
        { name: "멤버십", src: "/membership" },
    ];

    const mappedCategories = categories.map((item, index)=>(
        <li key={index} className={leftMenuListStyle.scrolled}>
            <Link    
                className={leftMenuStyle.scrolled}
                to={item.src} >
                {item.name}
            </Link>
        </li>
    ));

    // 입력한 검색어를 읽고 url을 바꿔주기
    const search = (event) => {
        if (event.key === "Enter") {
        let keyword = event.target.value;
        console.log(keyword);
        navigate(`/search/?q=${keyword}`);
        }
    };

    const handleLogout = () => {
        setUserData(null);
    };

  return (
    <div className={headerStyle.scrolled}>
        <div className={navLeftListStyle.scrolled}>
            <Link to='/'>
                <Logo color={'black'} width='84' height='30' />
            </Link>
            {mappedCategories}
        </div>
        <div className={navRightListStyle.scrolled} >
            <SearchBar isHome={false} />
            {userData ? (
                <Link 
                    to="/"
                    className={authLinkStyle.scrolled}
                    onClick={handleLogout}
                >
                    로그아웃
                </Link>
            ) : (
                <Link 
                    to="/auth"
                    className={authLinkStyle.scrolled}
                >
                    로그인/가입
                </Link>
            )}
            <RxHamburgerMenu 
                className={hamburgerIconStyle.scrolled}  
                onClick={handleHamburgerClick}
            />
            <VerticalSideBar />
        </div>
    </div>
  );
}

export default Header;
