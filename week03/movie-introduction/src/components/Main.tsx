import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

interface Movie {
    id: number;
    title: string;
    year: number;
    medium_cover_image: string;
}

interface APIResponse {
    status: string;
    status_message: string;
    data: {
        movies: Movie[];
    };
}

const AllComponents = styled.div<{ bgColor: string; fontColor: string }>`
    width: 99vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.fontColor};
`;

const Header = styled.div`
    color: inherit;
    margin-top: -2px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100px;
    margin-bottom: 10px;
    font-size: 50px;
`;

const MainBack = styled.div`
    color: inherit;
    height: auto;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 80px;
    display: flex;
    align-items: start;
    flex-direction: column;
`;

const Movies = styled.div`
    display: flex;
    justify-content: row;
`;

const TodayMovietxt = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    margin-top: 20px;
    font-size: 25px;
`;

const TodayMovie = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
    margin-top: 20px;
`;

const MoviePoster = styled.img`
    width: 150px;
    height: auto;
    margin-right: 20px;
    cursor: pointer;
`;

const MovieTitle = styled.div`
    font-size: 15px;
    margin-top: 10px;
    width: 9vw;
    color: inherit;
`;

const TopBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: inherit;
`;

const ToggleChange = styled.div`
    position: relative;
    margin-top: 1rem;
    cursor: pointer;

    > .toggle-container {
        width: 50px;
        height: 24px;
        border-radius: 30px;
        background-color: rgb(233, 233, 234);
    }

    > .toggle--checked {
        background-color: rgb(0, 200, 102);
        transition: 0.5s;
    }

    > .toggle-circle {
        position: absolute;
        top: 1px;
        left: 1px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: rgb(255, 254, 255);
        transition: 0.5s;
    }

    > .toggle--checked {
        left: 27px;
        transition: 0.5s;
    }
`;

const Main: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

    const [latestMovie, setLatestMovie] = useState<Movie[]>([]);
    const [downlodaMovie, setDownloadMovie] = useState<Movie[]>([]);
    const navigate = useNavigate();

    const [isOn, setIsOn] = useState(false);

    const toggleHandler = () => {
        if (backgroundColor === "white") {
            dispatch({ type: "black" });
        } else {
            dispatch({ type: "white" });
        }
    };

    const dispatch = useDispatch();
    const backgroundColor = useSelector(
        (state: RootState) => state.backgroundColor
    );
    const fontColor = useSelector((state: RootState) => state.fontColor);

    useEffect(() => {
        const fetchMyFavorite = async () => {
            try {
                const movieTitles = ["Moana", "Cruella", "Bohemian Rhapsody"];
                const moviePromises = movieTitles.map(async (title) => {
                    const response = await axios.get<APIResponse>(
                        "https://yts.mx/api/v2/list_movies.json",
                        { params: { query_term: title } }
                    );

                    const latestMovie = response.data.data.movies.reduce(
                        (latest: Movie, current: Movie) =>
                            new Date(latest.year) > new Date(current.year)
                                ? latest
                                : current
                    );

                    return latestMovie;
                });

                const movieResults = await Promise.all(moviePromises);

                const moviesWithPosters: Movie[] = movieResults.map(
                    (movie) => ({
                        id: movie.id,
                        title: movie.title,
                        year: movie.year,
                        medium_cover_image: movie.medium_cover_image, // API 응답에 맞춘 필드
                    })
                );

                setFavoriteMovies(moviesWithPosters);
            } catch (err) {
                setError(err as Error);
            }
        };
        const fetchLatestMovies = async () => {
            try {
                const response = await axios.get<APIResponse>(
                    "https://yts.mx/api/v2/list_movies.json",
                    {
                        params: {
                            limit: 6,
                            sort_by: "date_added",
                        },
                    }
                );

                const movieList = response.data.data.movies;

                setLatestMovie(movieList);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        const fetchDownloadMovies = async () => {
            try {
                const response = await axios<APIResponse>(
                    "https://yts.mx/api/v2/list_movies.json",
                    {
                        params: {
                            limit: 6,
                            sort_by: "download_count",
                        },
                    }
                );

                const movieList = response.data.data.movies;

                setDownloadMovie(movieList);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyFavorite();
        fetchDownloadMovies();
        fetchLatestMovies();
    }, []);

    const handleClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    if (loading) {
        return <p style={{ color: fontColor }}>로딩중... 기다려주세요🙏</p>;
    }

    if (error) {
        return <p style={{ color: fontColor }}>ERROR: {error.message}</p>;
    }

    return (
        <div>
            <AllComponents bgColor={backgroundColor} fontColor={fontColor}>
                <TopBar>
                    <ToggleChange onClick={toggleHandler}>
                        <div
                            className={`toggle-container ${
                                backgroundColor === "black"
                                    ? "toggle--checked"
                                    : ""
                            }`}
                        />
                        <div
                            className={`toggle-circle ${
                                backgroundColor === "black"
                                    ? "toggle--checked"
                                    : ""
                            }`}
                        />
                    </ToggleChange>
                    <Header>Gaeun's recommendation</Header>
                </TopBar>
                <MainBack>
                    <TodayMovietxt>Gaeun's Movie</TodayMovietxt>
                    <Movies>
                        {favoriteMovies.map((movie) => (
                            <TodayMovie key={movie.id}>
                                <MoviePoster
                                    onClick={() => handleClick(movie.id)}
                                    src={movie.medium_cover_image}
                                    alt={movie.title}
                                />
                                <MovieTitle>{movie.title}</MovieTitle>
                            </TodayMovie>
                        ))}
                    </Movies>
                    <TodayMovietxt>Latest Movie</TodayMovietxt>
                    <Movies>
                        {latestMovie.map((movie) => (
                            <TodayMovie key={movie.id}>
                                <MoviePoster
                                    onClick={() => handleClick(movie.id)}
                                    src={movie.medium_cover_image}
                                    alt={movie.title}
                                />
                                <MovieTitle>{movie.title}</MovieTitle>
                            </TodayMovie>
                        ))}
                    </Movies>

                    <TodayMovietxt>Popular Movie</TodayMovietxt>
                    <Movies>
                        {downlodaMovie.map((movie) => (
                            <TodayMovie key={movie.id}>
                                <MoviePoster
                                    onClick={() => handleClick(movie.id)}
                                    src={movie.medium_cover_image}
                                    alt={movie.title}
                                />
                                <MovieTitle>{movie.title}</MovieTitle>
                            </TodayMovie>
                        ))}
                    </Movies>
                </MainBack>
            </AllComponents>
        </div>
    );
};

export default Main;
