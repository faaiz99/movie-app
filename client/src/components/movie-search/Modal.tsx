import {  Modal as Component, TextInput, Label } from "flowbite-react";
import { useState, useRef } from "react";
import { Movie } from "../../services/api";
import { Card } from "./Card";
import { useMovie } from "../../hooks/useMovie";
type ModalProps = {
  show: boolean;
  onClose: () => void;
};

export const Modal = ({ show, onClose }: ModalProps) => {
  const searchMovieTermRef = useRef<HTMLInputElement>(null);
  const [movieTitle, setMovieTitle] = useState<string>("");
  const { data:movies, isError, error, isPending } = useMovie(movieTitle);
  if (isError) return <div>{error?.message}</div>;


  return (
    <>
      <Component
        show={show}
        dismissible={false}
        onClose={onClose}
        className="rounded-lg backdrop-blur-lg"
        initialFocus={searchMovieTermRef}
      >
        <Component.Header className="border-2 border-gray-300 dark:border-gray-700">
          Search Movies
        </Component.Header>
        <Component.Body className="border-b-2 border-l-2 border-r-2 border-gray-300 dark:border-gray-700">
          <div className=" space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="search" value="" />
              </div>
              <TextInput
                onChange={(e) => {
                  setMovieTitle(e.target.value);
                }}
                ref={searchMovieTermRef}
                id="search"
                type="text"
                placeholder=""
                required
              />
            </div>
            <div className="flex flex-col flex-wrap gap-5">
              {movies &&
                movies.map((movie: Movie) => {
                  return (
                    <Card key={movie.id} {...movie} loading={isPending} />
                  );
                })}
            </div>
          </div>
        </Component.Body>
      </Component>
    </>
  );
};
