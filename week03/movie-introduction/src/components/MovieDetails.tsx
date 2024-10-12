import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "./store";

interface Movie {
    large_cover_image: string;
    title: string;
    year: number;
    rating: number;
    description_full: string;
}

interface APIResponse {
    status: string;
    status_message: string;
    data: {
        movie: Movie;
    };
}

const MovieDetailBack = styled.div<{ bgColor: string; fontColor: string }>`
    color: inherit;
    display: flex;
    justify-content: center;
    flex-direction: row;
    color: ${(props) => props.fontColor};
    background-color: ${(props) => props.bgColor};
    width: 100vw;
    height: 100vh;
`;

const PosterAndInfo = styled.div`
    padding-top: 60px;
    display: flex;
    flex-direction: row;
`;

const Poster = styled.img`
    width: auto;
    height: 700px;
`;

const Information = styled.div`
    color: inherit;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    margin-left: 20px;
    width: 1000px;
`;

const Title = styled.div`
    color: inherit;
    font-size: 55px;
`;

const YearAndRate = styled.div`
    font-size: 25px;
    margin-bottom: 5px;
`;

const Description = styled.div`
    font-size: 17px;
`;

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const backgroundColor = useSelector(
        (state: RootState) => state.backgroundColor
    );
    const fontColor = useSelector((state: RootState) => state.fontColor);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get<APIResponse>(
                    "https://yts.mx/api/v2/movie_details.json",
                    {
                        params: {
                            movie_id: id,
                        },
                    }
                );

                setMovie(response.data.data.movie);
                setLoading(false);
            } catch (err: any) {
                const axiosError = err as AxiosError<APIResponse>;
                if (axiosError.response) {
                    setError(
                        new Error(axiosError.response.data.status_message)
                    );
                } else {
                    setError(new Error(axiosError.message));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading)
        return <p style={{ color: fontColor }}>{"로딩중... 기다려주세요🙏"}</p>;
    if (error)
        return <p style={{ color: fontColor }}>ERROR: {error.message}</p>;

    return (
        <MovieDetailBack bgColor={backgroundColor} fontColor={fontColor}>
            {movie && (
                <div>
                    <PosterAndInfo>
                        <Poster
                            src={movie.large_cover_image}
                            alt={movie.title}
                        />
                        <Information>
                            <Title>{movie.title}</Title>
                            <YearAndRate>
                                <strong> Year:</strong> {movie.year}
                                <strong>&nbsp;&nbsp;&nbsp;Rating:</strong>{" "}
                                {movie.rating}
                            </YearAndRate>
                            <Description>{movie.description_full}</Description>
                        </Information>
                    </PosterAndInfo>
                </div>
            )}
        </MovieDetailBack>
    );
};

export default MovieDetails;
